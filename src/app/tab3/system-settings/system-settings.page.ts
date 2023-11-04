import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, RangeCustomEvent } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin/admin.service';
import { IAdmin } from 'src/app/model/admin';
import { Router } from '@angular/router';

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

    @ViewChild('light') lightRef!: ElementRef;

    constructor(private formBuilder: FormBuilder, private adminService: AdminService, private alertController: AlertController, private router: Router) {
        this.form = this.formBuilder.group({
            lighting: ['', [Validators.required]],
            auto: ['', [Validators.required]],
            // user: ['', [Validators.required]],
            // pass: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.read();
    }

    ionViewDidEnter() {
        this.read();
    }

    rangeChange(ev: Event) {
        let light: HTMLInputElement = this.lightRef.nativeElement;
        light.innerHTML = String((ev as RangeCustomEvent).detail.value);
    }

    submit() {
        if (this.form.valid) {
            let formData = new FormData();
            
			if(this.form.value.auto){
	            formData.append("auto", this.form.value.auto);
			} else {
           		formData.append("lighting", this.form.value.lighting);
			}
            console.log(formData);

            this.adminService.send('/admin/lighting', formData).subscribe({
                next: response => {
                    console.log("Response: ", response);
                    this.showPopup("Luminosité modifiée avec succès !");
                },
                error: err => {
                    if (err.error.statusText !== 'OK') {
                        console.log("Error: ", err.error);
                    }
                    else this.showPopup("Luminosité modifiée avec succès !");
                }
            });

        }
    }

    edit() {
		this.router.navigate(['/tabs/edit']);
    }

    update() {
		this.router.navigate(['/tabs/update']);
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

        this.adminService.readData('admin/lighting').subscribe({
			next: data => {
                // this.admin = data;
                // this.load();
                this.form.patchValue({
                    lighting: data.lighting,
                    auto: data.auto
                });
            },
			error: err => {
                if (err.statusText !== 'OK') {
                    console.log("Error: ", err.error);
                } else {
                	let fields: string[] = err.error.text.split('|');
			        this.form.patchValue({
			            lighting: +fields[1],
			            auto: fields[3] === '1'
			        });
			        if (fields[3] === '1')
                    	this.lighting?.disable();
                }
            }
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
   
    load() {
        if (this.admin) {
            this.form.patchValue({
                user: this.admin.user,
                pass: this.admin.pass
            });
        }
    }

    disable(): void {
        // Désactivation des configs
        this.auto?.valueChanges.subscribe(
            (val) => {
                if (val) {
                    this.lighting?.disable();
                } else {
                    this.lighting?.enable();
                }
            }
        );
    }

    get auto(){
        return this.form.get('auto');
    }

    get lighting(){
        return this.form.get('lighting');
    }

}
