import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-system-settings',
    templateUrl: './system-settings.page.html',
    styleUrls: ['./system-settings.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class SystemSettingsPage implements OnInit {

    form!: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            login: ['', [Validators.required]],
            password: ['', [Validators.minLength(6), Validators.required]],
        });
    }

    ngOnInit() {
    }

    submit() {
        console.log('Method not implemented.');
    }

    restartESP() {

        var xhr = new XMLHttpRequest();
        let formData = new FormData();
        formData.append("configs", JSON.stringify(this.form.value, null, 4));
        xhr.open("GET", "http://192.168.1.117/admin/restart", true);
        // xhr.open("POST", "http://10.1.1.1/admin/config", true);
        xhr.send(formData);
    }
}
