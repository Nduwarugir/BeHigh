import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminService } from '../services/admin/admin.service';
import { IAdmin } from '../model/admin';

@Component({
    selector: 'app-update',
    templateUrl: './update.page.html',
    styleUrls: ['./update.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class UpdatePage implements OnInit {

    @ViewChild('fileInput') fileInputRef!: ElementRef;

    form!: FormGroup;
    lvl: boolean = false;
    isButtonDisabled: boolean = false;
    running!: boolean;
    disabled: boolean = true;
    updatePossible!: string;

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
                this.disabled = value !== this.admin.pass;
        });
    }

    ngOnInit() {
        this.read();
    }

    summd5(event: any) {

        this.file = event.target.files[0];
        console.log(this.file);

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
        }

    }

    send() {

        this.lvl = !this.lvl;

        this.adminService.update(this.file).subscribe({
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

    changer() {
        this.form.controls['confirm'].valueChanges.subscribe((value: string) => {
            console.log(value);
        });
    }

    clearFileInput() {
        const fileInput: HTMLInputElement = this.fileInputRef.nativeElement;
        fileInput.value = '';
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
                console.log("version: ", data);
            },
			error: err => {
                let fields: string[] = err.error.text.split('|');
                this.updatePossible = fields[1];
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
