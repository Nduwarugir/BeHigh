import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-network-information',
    templateUrl: './network-information.page.html',
    styleUrls: ['./network-information.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class NetworkInformationPage implements OnInit, AfterViewInit {

    wifiConfig!: IInfo;

    constructor() { }

    ngAfterViewInit(): void {
        this.read();
    }

    ngOnInit() {
        this.read();
    }

    submit() {

    }


    read() {
        // fetch('assets/json/config.json')
        // fetch('http://192.168.1.117/jsonFiles/config.json')
        // // fetch('http://10.1.1.1/jsonFiles/config.json')
        //     .then(response => response.json())
        //     .then(data => {
        //         // use the 'data' variable which contains the parsed JSON data
        //         this.wifiConfig = data;
        //         console.log("datas: ", data);

        //     })
        //     .catch(error => {
        //         // handle any errors that occur during the fetch request
        //         console.error(error);
        //     });

        fetch('http://192.168.1.117/admin/infovalues2')
        // fetch('http://10.1.1.1/admin/infovalues2')
            .then(response => response.text())
            .then(data => {
                // use the 'data' variable which contains the parsed JSON data
                let fields: string[] = data.split('\n');
                this.wifiConfig = new IInfo(fields[0], fields[1], fields[2], fields[3], fields[4], fields[5], fields[6], fields[7], fields[8], fields[9])
                console.log(fields);
            })
            .catch(error => {
                // handle any errors that occur during the fetch request
                console.error(error);
            });
    
    }

}

class IInfo {

    x_Wifi_Mode!: string;
    x_ssid!: string;
    x_ip!: string;
    x_gateway!: string;
    x_netmask!: string;
    x_mac!: string;
    x_dns!: string;
    x_ntp_sync!: string;
    x_ntp_time!: string;
    x_ntp_date!: string;

    constructor(x_Wifi_Mode: string, x_ssid: string, x_ip: string, x_gateway: string,  x_netmask: string,
                 x_mac: string, x_dns: string, x_ntp_sync: string, x_ntp_time: string, x_ntp_date: string,) {
        this.x_Wifi_Mode = x_Wifi_Mode;
        this.x_ssid = x_ssid;
        this.x_ip = x_ip;
        this.x_gateway = x_gateway;
        this.x_netmask = x_netmask;
        this.x_mac = x_mac;
        this.x_dns = x_dns;
        this.x_ntp_sync = x_ntp_sync;
        this.x_ntp_time = x_ntp_time;
        this.x_ntp_date = x_ntp_date;
    }
}