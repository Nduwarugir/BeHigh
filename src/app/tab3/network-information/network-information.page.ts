import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
    selector: 'app-network-information',
    templateUrl: './network-information.page.html',
    styleUrls: ['./network-information.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class NetworkInformationPage implements OnInit, AfterViewInit {

    wifiConfig!: IInfo;

    constructor( private adminService: AdminService) { }

    ngAfterViewInit(): void {
        this.read();
    }

    ngOnInit() {
        this.read();
    }

    ionViewDidEnter() {
        this.read();
    }

    read() {

        this.adminService.readData('admin/infovalues2').subscribe({
			next: data => {
                let fields: string[] = data.split('\n');
                this.wifiConfig = new IInfo(fields[0], fields[1], fields[2], fields[3], fields[4], fields[5], fields[6], fields[7], fields[8], fields[9])
            },
			error: err => {
                if (err.statusText !== 'OK') {
                    console.log("Error: ", err.error);
                } else {
                    setTimeout(() => {
                        let fields: string[] = err.error.text.split('\n');
                        this.wifiConfig = new IInfo(fields[0], fields[1], fields[2], fields[3], fields[4], fields[5], fields[6], fields[7], fields[8], fields[9])
                    }, 1*1000);
                }
            }
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