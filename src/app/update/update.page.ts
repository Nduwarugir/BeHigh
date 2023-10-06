import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminService } from '../services/admin/admin.service';
import { IAdmin } from '../model/admin';
import { hashBinary } from '../shared/spark-md5';

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
    lvl: boolean = false;
    running!: boolean;
    disabled: boolean = true;
    isUpdatePossible!: string;

    md5hash!: string;

    file!: File;
    admin!: IAdmin;
    version!: string;

    constructor(private fb: FormBuilder, private adminService: AdminService) {
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

        if (this.running) {
            return;
        } else if (!this.file.name.endsWith('.ino.bin')) {
            alert("Seul les fichiers .ino.bin acceptés..."); this.clearFileInput();
        } else if (!this.file.size) {
            alert('Please select a file');
            this.clearFileInput(); return;
        } else if (this.file.name === this.version) {
            alert("Vous êtes déjà à jour..."); this.clearFileInput();
        } else {
            this.lvl = !this.lvl;

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

        this.lvl = !this.lvl;

        let formData = new FormData();
        formData.append("update", this.file);

        this.adminService.update(formData).subscribe({
            next: response => {
                console.log("Response: ", response);
                alert("Mise à jour en cours...");
                this.disabled = true;
            },
            error: err => {
                console.log("Error: ", err.error);
                alert("Mise à jour en cours...");
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

    get confirm() {
        return this.form.get('confirm');
    }

    get getFile() {
        return this.form.get('file');
    }

}
