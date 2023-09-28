import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IAdmin } from '../model/admin';

@Component({
    selector: 'app-update',
    templateUrl: './update.page.html',
    styleUrls: ['./update.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class UpdatePage implements OnInit {

    form!: FormGroup;
    lvl: number = 0;
    isButtonDisabled: boolean = false;

    admin!: IAdmin;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            file: ['', Validators.required],
            confirm: ['', [Validators.minLength(6), Validators.required]],
        })
    }

    ngOnInit() {
        this.read();
    }

    summd5() {
        console.log('Method not implemented.');
    }

    send() {
        var xhr = new XMLHttpRequest();
        let formData = new FormData();
        formData.append("scenario", JSON.stringify(this.form, null, 4));
        // xhr.open("POST", "http://192.168.1.117/update", true);
        xhr.open("POST", "http://10.1.1.1/update", true);
        xhr.send(formData);

        alert("Scénario enregistré avec succès !");
    }

    changer() {
        this.lvl++;
        if (this.lvl == 1) {
            console.log("eeeeeeeeeeee");


            // confirm().addEventListener('input', function () {
                // this.isButtonDisabled = false confirm().value.trim() !== this.admin
            // });

        } else if (this.lvl == 2) {
            console.log("eeeeeeeeeeee");

        }
    }

    get confirm() {
        return this.form.get('confirm');
    }

    read(): void {

        // fetch('assets/json/videos.json')
        // fetch('http://192.168.1.117/jsonFiles/secret.json')
        fetch('http://10.1.1.1/jsonFiles/secret.json')
            .then(response => response.json())
            .then(data => {
                // use the 'data' variable which contains the parsed JSON data
                this.admin = data;
                console.log("Scénario: ", this.admin);
            })
            .catch(error => {
                // handle any errors that occur during the fetch request
                console.error(error);
        });

    }

}
