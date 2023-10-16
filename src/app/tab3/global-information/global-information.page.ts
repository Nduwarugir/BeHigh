import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { IWifiConfig } from 'src/app/model/wifi-config';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
    selector: 'app-global-information',
    templateUrl: './global-information.page.html',
    styleUrls: ['./global-information.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class GlobalInformationPage implements OnInit {

    form!: FormGroup;
    wifiConfig!: IWifiConfig;

    constructor(private fb: FormBuilder, private alertController: AlertController, private adminService: AdminService) {
        this.form = this.fb.group({
            devicename:['', Validators.required]
        });
    }

    ngOnInit() {
        this.read();
    }

    submit() {
        if (this.form.valid) {

            let formData = new FormData();
            formData.append("devicename", this.form.value.devicename);

            this.adminService.send('/admin/general', formData).subscribe({
                next: response => {
                    console.log("Response: ", response);
                    alert("Nom modifié avec succès !");
                },
                error: err => {
                    if (err.statusText !== 'OK') {
                        console.log("Error: ", err.error);
                    } else {
                        setTimeout(() => {
                            this.showPopup("Nom modifié avec succès !");
                        }, 1*1000);
                    }
                }
            })

        }
    }

    read() {
        
        this.adminService.readData('jsonFiles/config.json').subscribe({
			next: data => {
                this.wifiConfig = data;
                this.form.patchValue({
                    devicename: this.wifiConfig.deviceName,
                })

            },
			error: err => console.log("Error: ", err.error)
		});
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
   
}
