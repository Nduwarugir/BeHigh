import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IWifiConfig } from 'src/app/model/wifi-config';

@Component({
    selector: 'app-network-information',
    templateUrl: './network-information.page.html',
    styleUrls: ['./network-information.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class NetworkInformationPage implements OnInit {

    wifiConfig!: IWifiConfig;

    constructor() { }

    ngOnInit() {
        this.read();
    }

    submit() {

    }


    read() {
        // fetch('assets/json/config.json')
        // fetch('http://192.168.1.117/jsonFiles/config.json')
        fetch('http://10.1.1.1/jsonFiles/config.json')
            .then(response => response.json())
            .then(data => {
                // use the 'data' variable which contains the parsed JSON data
                this.wifiConfig = data;
                console.log("datas: ", data);

            })
            .catch(error => {
                // handle any errors that occur during the fetch request
                console.error(error);
            });
    }

}
