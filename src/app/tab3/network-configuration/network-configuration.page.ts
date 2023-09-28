import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IWifiConfig } from '../../model/wifi-config';

@Component({
    selector: 'app-network-configuration',
    templateUrl: './network-configuration.page.html',
    styleUrls: ['./network-configuration.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class NetworkConfigurationPage implements OnInit {

    form! : FormGroup;
    _disabled!: boolean;

    wifiConfig!: IWifiConfig;

    ngOnInit(){
        this.read();
    }

    //On verifie que chaque champ soit remplir
    constructor(private fb : FormBuilder){

        this.form= this.fb.group({
            modeap:['', Validators.nullValidator],
            ssid:['', Validators.required],
            pass:['', Validators.required],
            dhcp:['', Validators.required],
            ip_1:['', Validators.required],
            ip_2:['', Validators.required],
            ip_3:['', Validators.required],
            ip_4:['', Validators.required],
            nm_1:['', Validators.required],
            nm_2:['', Validators.required],
            nm_3:['', Validators.required],
            nm_4:['', Validators.required],
            gw_1:['', Validators.required],
            gw_2:['', Validators.required],
            gw_3:['', Validators.required],
            gw_4:['', Validators.required],
            dns_1:['', Validators.required],
            dns_2:['', Validators.required],
            dns_3:['', Validators.required],
            dns_4:['', Validators.required],
        });
    }

    disable(): void {

        // Désactivation des configs
        this.dhcp?.valueChanges.subscribe(
            (val) => {
                if (val) {
                    this._disabled = true;
                    this.ip_1?.disable(); this.ip_2?.disable(); this.ip_3?.disable(); this.ip_4?.disable();
                    this.nm_1?.disable(); this.nm_2?.disable(); this.nm_3?.disable(); this.nm_4?.disable();
                    this.gw_1?.disable(); this.gw_2?.disable(); this.gw_3?.disable(); this.gw_4?.disable();
                    this.dns_1?.disable(); this.dns_2?.disable(); this.dns_3?.disable(); this.dns_4?.disable();


                    // Opérations pour le DHCP
                    // Example define the default DNS
                    this.wifiConfig.dns = [0,0,0,0];

                } else {
                    this._disabled = false;
                    this.ip_1?.enable(); this.ip_2?.enable(); this.ip_3?.enable(); this.ip_4?.enable();
                    this.nm_1?.enable(); this.nm_2?.enable(); this.nm_3?.enable(); this.nm_4?.enable();
                    this.gw_1?.enable(); this.gw_2?.enable(); this.gw_3?.enable(); this.gw_4?.enable();
                    this.dns_1?.enable(); this.dns_2?.enable(); this.dns_3?.enable(); this.dns_4?.enable();
                }

            }
        )

    }

    disable_ap(): void {

        // Désactivation des configs
        this.modeap?.valueChanges.subscribe(
            (val) => {
                if (val) {
                    this._disabled = true;
                    this.ssid?.disable(); this.pass?.disable();
                    this.ip_1?.disable(); this.ip_2?.disable(); this.ip_3?.disable(); this.ip_4?.disable();
                    this.nm_1?.disable(); this.nm_2?.disable(); this.nm_3?.disable(); this.nm_4?.disable();
                    this.gw_1?.disable(); this.gw_2?.disable(); this.gw_3?.disable(); this.gw_4?.disable();
                    this.dns_1?.disable(); this.dns_2?.disable(); this.dns_3?.disable(); this.dns_4?.disable();


                    // Opérations pour le DHCP
                    // Example define the default DNS
                    this.wifiConfig.dns = [0,0,0,0];

                } else {
                    this._disabled = false;
                    this.ip_1?.enable(); this.ip_2?.enable(); this.ip_3?.enable(); this.ip_4?.enable();
                    this.nm_1?.enable(); this.nm_2?.enable(); this.nm_3?.enable(); this.nm_4?.enable();
                    this.gw_1?.enable(); this.gw_2?.enable(); this.gw_3?.enable(); this.gw_4?.enable();
                    this.dns_1?.enable(); this.dns_2?.enable(); this.dns_3?.enable(); this.dns_4?.enable();
                }

            }
        )

    }

    submit() {

        if (this.form.valid) {

            if (Number.isNaN(Number(this.ip_1?.value)) || Number.isNaN(Number(this.ip_2?.value)) || Number.isNaN(Number(this.ip_3?.value)) || Number.isNaN(Number(this.ip_4?.value)) ) {
                console.log("Null IP");
                this.setError(1);
            } else if (Number.isNaN(Number(this.nm_1?.value)) || Number.isNaN(Number(this.nm_2?.value)) || Number.isNaN(Number(this.nm_3?.value)) || Number.isNaN(Number(this.nm_4?.value)) ) {
                console.log("Null NETMASK");
                this.setError(2);
            } else if (Number.isNaN(Number(this.gw_1?.value)) || Number.isNaN(Number(this.gw_2?.value)) || Number.isNaN(Number(this.gw_3?.value)) || Number.isNaN(Number(this.gw_4?.value)) ) {
                console.log("Null GATEWAY");
                this.setError(3);
            } else if (Number.isNaN(Number(this.dns_1?.value)) || Number.isNaN(Number(this.dns_2?.value)) || Number.isNaN(Number(this.dns_3?.value)) || Number.isNaN(Number(this.dns_4?.value)) ) {
                console.log("Null DNS");
                this.setError(4);
            } else {
                this.formToConfig();
                console.log("WifiConfig: ", this.wifiConfig);

                var xhr = new XMLHttpRequest();
                let formData = new FormData();
                formData.append("configs", JSON.stringify(this.form.value, null, 4));
                // xhr.open("POST", "http://192.168.1.117/admin/config", true);
                xhr.open("POST", "http://10.1.1.1/admin/config", true);
                xhr.send(formData);

                alert("Paramètres enregistrése avec succès !");
            }

        }

    }

    load() {
        if (this.wifiConfig) {
            this.form.patchValue({
                modeap: this.wifiConfig.Wifi_Mode,
                ssid: this.wifiConfig.ssid,
                pass: this.wifiConfig.pass,
                dhcp: this.wifiConfig.dhcp,
                ip_1: this.wifiConfig.ip[0],
                ip_2: this.wifiConfig.ip[1],
                ip_3: this.wifiConfig.ip[2],
                ip_4: this.wifiConfig.ip[3],
                nm_1: this.wifiConfig.netmask[0],
                nm_2: this.wifiConfig.netmask[1],
                nm_3: this.wifiConfig.netmask[2],
                nm_4: this.wifiConfig.netmask[3],
                gw_1: this.wifiConfig.gateway[0],
                gw_2: this.wifiConfig.gateway[1],
                gw_3: this.wifiConfig.gateway[2],
                gw_4: this.wifiConfig.gateway[3],
                dns_1: this.wifiConfig.dns[0],
                dns_2: this.wifiConfig.dns[1],
                dns_3: this.wifiConfig.dns[2],
                dns_4: this.wifiConfig.dns[3],
            });
            if (this.modeap?.value) {

                this._disabled = true;
                this.ssid?.disable(); this.pass?.disable();
                this.ip_1?.disable(); this.ip_2?.disable(); this.ip_3?.disable(); this.ip_4?.disable();
                this.nm_1?.disable(); this.nm_2?.disable(); this.nm_3?.disable(); this.nm_4?.disable();
                this.gw_1?.disable(); this.gw_2?.disable(); this.gw_3?.disable(); this.gw_4?.disable();
                this.dns_1?.disable(); this.dns_2?.disable(); this.dns_3?.disable(); this.dns_4?.disable();

            } else if(this.dhcp?.value) {

                this._disabled = true;
                this.ip_1?.disable(); this.ip_2?.disable(); this.ip_3?.disable(); this.ip_4?.disable();
                this.nm_1?.disable(); this.nm_2?.disable(); this.nm_3?.disable(); this.nm_4?.disable();
                this.gw_1?.disable(); this.gw_2?.disable(); this.gw_3?.disable(); this.gw_4?.disable();
                this.dns_1?.disable(); this.dns_2?.disable(); this.dns_3?.disable(); this.dns_4?.disable();

            }
        }
    }

    refresh() {
        console.log("Form Values", this.form.value);

        console.log("wifiConfig: ", this.wifiConfig);
    }

    read() {
        // fetch('assets/json/config.json')
        // fetch('http://192.168.1.117/jsonFiles/config.json')
        fetch('http://10.1.1.1/jsonFiles/config.json')
            .then(response => response.json())
            .then(data => {
                // use the 'data' variable which contains the parsed JSON data
                this.wifiConfig = data;
                console.log('wifiConfig: ', this.wifiConfig);
                this.load();
            })
            .catch(error => {
                // handle any errors that occur during the fetch request
                console.error(error);
            });
    }

    // Gestion de l'erreur
    private _err: number = 0;

    setError(n: number){
        this._err = n;
    }

    get error(){
        return this._err;
    }

    //Les getters
    get modeap(){
        return this.form.get('modeap');
    }

    get ssid(){
        return this.form.get('ssid');
    }

    get pass(){
        return this.form.get('pass');
    }

    get dhcp(){
        return this.form.get('dhcp');
    }

    get ip_1(){
        return this.form.get('ip_1');
    }


    get ip_2(){
        return this.form.get('ip_2');
    }

    get ip_3(){
        return this.form.get('ip_3');
    }

    get ip_4(){
        return this.form.get('ip_4');
    }

    get nm_1(){
        return this.form.get('nm_1');
    }

    get nm_2(){
        return this.form.get('nm_2');
    }

    get nm_3(){
        return this.form.get('nm_3');
    }

    get nm_4(){
        return this.form.get('nm_4');
    }

    get gw_1(){
        return this.form.get('gw_1');
    }

    get gw_2(){
        return this.form.get('gw_2');
    }

    get gw_3(){
        return this.form.get('gw_3');
    }

    get gw_4(){
        return this.form.get('gw_4');
    }

    get dns_1(){
        return this.form.get('dns_1');
    }

    get dns_2(){
        return this.form.get('dns_2');
    }

    get dns_3(){
        return this.form.get('dns_3');
    }

    get dns_4(){
        return this.form.get('dns_4');
    }

    formToConfig() {

        if (Number.isNaN(Number(this.ip_1?.value)) || Number.isNaN(Number(this.ip_2?.value)) || Number.isNaN(Number(this.ip_3?.value)) || Number.isNaN(Number(this.ip_4?.value)) ) {
            console.log("Null ip");
            this.setError(1);
        } else if (Number.isNaN(Number(this.nm_1?.value)) || Number.isNaN(Number(this.nm_2?.value)) || Number.isNaN(Number(this.nm_3?.value)) || Number.isNaN(Number(this.nm_4?.value)) ) {
            console.log("Null netmask");
            this.setError(2);
        } else if (Number.isNaN(Number(this.gw_1?.value)) || Number.isNaN(Number(this.gw_2?.value)) || Number.isNaN(Number(this.gw_3?.value)) || Number.isNaN(Number(this.gw_4?.value)) ) {
            console.log("Null gateway");
            this.setError(3);
        } else if (Number.isNaN(Number(this.dns_1?.value)) || Number.isNaN(Number(this.dns_2?.value)) || Number.isNaN(Number(this.dns_3?.value)) || Number.isNaN(Number(this.dns_4?.value)) ) {
            console.log("Null dns");
            this.setError(4);
        } else {

            console.log("Form: ", this.form.value);

            this.wifiConfig.Wifi_Mode = this.modeap?.value;
            this.wifiConfig.ssid = this.ssid?.value;
            this.wifiConfig.pass= this.pass?.value;
            this.wifiConfig.dhcp = this.dhcp?.value;
            this.wifiConfig.ip = [Number(this.ip_1?.value), Number(this.ip_2?.value), Number(this.ip_3?.value), Number(this.ip_4?.value)];
            this.wifiConfig.netmask = [Number(this.nm_1?.value), Number(this.nm_2?.value), Number(this.nm_3?.value), Number(this.nm_4?.value)];
            this.wifiConfig.gateway = [Number(this.gw_1?.value), Number(this.gw_2?.value), Number(this.gw_3?.value), Number(this.gw_4?.value)];
            this.wifiConfig.dns = [Number(this.dns_1?.value), Number(this.dns_2?.value), Number(this.dns_3?.value), Number(this.dns_4?.value)];

        }

    }

}
