import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { AdminService } from '../services/admin/admin.service';
import { IAdmin } from '../model/admin';
import { hashBinary } from '../shared/libs/spark-md5';

@Component({
    selector: 'app-update',
    templateUrl: './update.page.html',
    styleUrls: ['./update.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class UpdatePage implements OnInit {

    @ViewChild('fileInput') fileInputRef!: ElementRef;
    @ViewChild('md5row') md5rowRef!: ElementRef;
    @ViewChild('clientHash') clientHashRef!: ElementRef;
    @ViewChild('fileSize') fileSizeRef!: ElementRef;
    @ViewChild('hash') hashRef!: ElementRef;

    form!: FormGroup;
    running!: boolean;
    valid!: boolean;
    uploaded: boolean = false;
    disabled: boolean = true;
    isUpdatePossible!: string;

    md5hash!: string;

    file!: File;
    admin!: IAdmin;
    version!: string;

    constructor(private fb: FormBuilder, private alertController: AlertController, private adminService: AdminService) {
        this.form = this.fb.group({
            file: ['', Validators.required],
            confirm: ['', [Validators.minLength(6), Validators.required]],
        });

        this.form.controls['confirm'].valueChanges.subscribe(
            (value: string) => {
                this.disabled = value !== this.admin.pass
        });
    }

    ngOnInit() {
        this.read();
    }

    summd5(event: any) {

        this.file = event.target.files[0];
        this.uploaded = false;
        this.valid = false;

        if (this.running) {
            return;
        } else if (!this.file.name.endsWith('.ino.bin')) {
            this.showPopupAlert("Seul les fichiers .ino.bin acceptés...");
            this.clearFileInput();
            this.uploaded = true; this.valid = false;
        } else if (!this.file.size) {
            this.showPopupAlert("File size is null... Please select another file.");
            this.clearFileInput(); 
            this.uploaded = true; this.valid = false; 
        } else if (this.file.name === this.version) {
            this.showPopupAlert("Vous êtes déjà à jour...");
            this.clearFileInput();
            this.uploaded = true; this.valid = false; 
        } else {
            this.uploaded = true;

            let fileReader: FileReader = new FileReader();
            let file: File = this.file;
            let time: number, md5hash!: string;

            const md5row: HTMLInputElement = this.md5rowRef.nativeElement;
            const clientHash: HTMLInputElement = this.clientHashRef.nativeElement;
            const fileSize: HTMLInputElement = this.fileSizeRef.nativeElement;

            console.log('md5row: ', md5row);

            fileReader.onload = function (e: any) {
                if (e.target?.result != null) {

                    if (file.size !== e.target.result.length) {
                        console.error('ERROR:Browser reported success but could not read the file until the end');
                    } else {
                        md5hash = hashBinary(e.target.result, file).toString();
                        console.info('Finished loading!');
                        console.info('Computed hash: ' + md5hash); // compute hash
                        console.info('Total time: ' + (new Date().getTime() - time) + 'ms');

                        md5row.hidden = false;
                        clientHash.innerHTML = md5hash;
                        fileSize.innerHTML = file.size.toString();

                    }
                } else console.error('e.target?.result === null');
            };

            fileReader.onerror = function () {
                console.error('ERROR: FileReader onerror was triggered, maybe the browser aborted due to high memory usage');
            };

            this.running = true;
            this.valid = true;
            console.info('Starting normal test (' + file.name + ')');
            time = new Date().getTime();
            fileReader.readAsBinaryString(file);

            //md5hash = fileReader.md5hash;
            setTimeout(() => {
            	this.adminService.readData('setmd5?md5=' + md5hash + '&size=' + file.size).subscribe({
		            next: response => {
		                console.log("Response: ", response);
		            },
                    error: err => {
                        console.log("Error: ", err.error);
		            }
		        });
        	}, 1000);

        }

    }

    send() {

        let formData = new FormData();
        formData.append("update", this.file);

        this.adminService.update(formData).subscribe({
            next: response => {
                console.log("Response: ", response);
                this.showPopup("Mise à jour en cours...");
                this.disabled = true;
            },
            error: err => {
                console.log("Error: ", err.error);
                this.showPopup("Mise à jour en cours...");
                this.disabled = true;
            }
        });

    }

    clearFileInput() {
        const fileInput: HTMLInputElement = this.fileInputRef.nativeElement;
        fileInput.value = '';
    }

    updatePossible() {
        if (this.isUpdatePossible !== 'OK') {
            this.form.controls['file'].disable();
        }
    }

    read(): void {

        this.adminService.readData('jsonFiles/secret.json').subscribe({
			next: data => {
                this.admin = data;
                console.log("Admin: ", this.admin);
            },
			error: err => {
                console.log("Error: ", err.error);
            }
		});

        this.adminService.readData('jsonFiles/config.json').subscribe({
			next: data => {
                this.version = data.version;
                console.log("version: ", this.version);
            },
			error: err => {
                console.log("Error: ", err.error);
            }
		});

        this.adminService.readData('update/updatepossible').subscribe({
			next: data => {
                let fields: string[] = data.split('|');
                console.log("version: ", fields);
                this.updatePossible();
            },
			error: err => {
                let fields: string[] = err.error.text.split('|');
                this.isUpdatePossible = fields[1];
                this.updatePossible();
                console.log("Error: ", err.error);
            }
		});

    }

    async showPopupAlert(message: string) {
        const alert = await this.alertController.create({
            header: 'Alert!',
            message: message,
            buttons: ['OK'],
            cssClass: 'custom-alert'
        });
        await alert.present();
    }
   
    async showPopup(message: string) {
        const alert = await this.alertController.create({
            header: 'Opération réussie.',
            message: message,
            buttons: ['OK'],
            cssClass: 'custom-alert'
        });
        await alert.present();
    }
   
    get confirm() {
        return this.form.get('confirm');
    }

    get getFile() {
        return this.form.get('file');
    }

}
