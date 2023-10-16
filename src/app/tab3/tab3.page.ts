import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GlobalInformationPage } from './global-information/global-information.page';
import { NetworkConfigurationPage } from './network-configuration/network-configuration.page';
import { NetworkInformationPage } from './network-information/network-information.page';
import { SystemSettingsPage } from './system-settings/system-settings.page';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, GlobalInformationPage, NetworkConfigurationPage, NetworkInformationPage, SystemSettingsPage],
})
export class Tab3Page implements OnInit {

    private _visibility: number = 0;

    constructor() { }

    ngOnInit(): void {
    }

    public get visibility() : number {
        return this._visibility
    }

    public set visibility(v : number) {
        this._visibility = v;
    }

    toggleVisibility(n: number){
        this.visibility = n;
    }

}
