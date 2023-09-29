import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IWifiConfig } from 'src/app/model/wifi-config';

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

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            devicename:['', Validators.required]
        });
    }

    ngOnInit() {
        this.read();
    }

    submit() {
        if (this.form.valid) {

            var xhr = new XMLHttpRequest();
            let formData = new FormData();
            formData.append("devicename", this.form.value.devicename);
            xhr.open("POST", "http://192.168.1.117/admin/general", true);
            // xhr.open("POST", "http://10.1.1.1/admin/general", true);
            xhr.send(formData);

            console.log(this.form.value.devicename);

            alert("Nom modifié avec succès !");
        }
    }

    read() {
        // fetch('assets/json/config.json')
        fetch('http://192.168.1.117/jsonFiles/config.json')
        // fetch('http://10.1.1.1/jsonFiles/config.json')
            .then(response => response.json())
            .then(data => {
                // use the 'data' variable which contains the parsed JSON data
                this.wifiConfig = data;
                this.form.patchValue({
                    devicename: this.wifiConfig.deviceName,
                })

            })
            .catch(error => {
                // handle any errors that occur during the fetch request
                console.error(error);
            });
    }
}
