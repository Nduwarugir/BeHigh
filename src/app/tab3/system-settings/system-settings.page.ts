import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin/admin.service';
import { IAdmin } from 'src/app/model/admin';

@Component({
    selector: 'app-system-settings',
    templateUrl: './system-settings.page.html',
    styleUrls: ['./system-settings.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class SystemSettingsPage implements OnInit {

    form!: FormGroup;

    admin!: IAdmin;

    constructor(private formBuilder: FormBuilder, private adminService: AdminService) {
        this.form = this.formBuilder.group({
            user: ['', [Validators.required]],
            pass: ['', [Validators.minLength(6), Validators.required]],
        });
    }

    ngOnInit() {
        this.read();
    }

    submit() {
        console.log('Method not implemented.');
    }

    restartESP() {

        this.adminService.readData('admin/restart').subscribe({
			next: response => {
                console.log("response: ", response);
                alert("Redémarrage en cours...");
            },
			error: err => {
                console.log("Error: ", err.error);
            }
		});
    }

    read() {

        this.adminService.readData('jsonFiles/secret.json').subscribe({
			next: data => {
                this.admin = data;
                this.load();
                console.log("Scénario: ", this.admin);
            },
			error: err => {
                console.log("Error: ", err.error);
            }
		});
    }

    load() {
        if (this.admin) {
            this.form.patchValue({
                user: this.admin.user,
                pass: this.admin.pass
            });
        }
    }
}
