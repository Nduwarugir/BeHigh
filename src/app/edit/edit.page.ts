import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { IFile } from 'src/app/model/file';
import { ScenarioService } from 'src/app/services/scenario/scenario.service';
import { AdminService } from '../services/admin/admin.service';
import { MediaPopupPage } from '../shared/components/media-popup/media-popup.page';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditPage implements OnInit {

    mode!: string;
    type!: string;
    visibility!: number
    currentDirContents!: IFile[];

    fileName!: string;
    editing: boolean = false;

    selectedImage: any;
    selectedVideo: any;
    selectedGif: any;

    uploadedFile!: File;

    invalid: boolean = true;

    constructor(private modalController: ModalController, private alertController: AlertController,
        private scenarioService: ScenarioService, private adminService: AdminService) { }

    async openMediaPopup(mediaUrl: string) {
        const modal = await this.modalController.create({
            component: MediaPopupPage,
            componentProps: {
                mediaUrl: mediaUrl
            }
        });

        return await modal.present();
    }

    ngOnInit() {
        this.currentDirContents = [];
    }

    handleFileInput(event: any) {
        event.preventDefault();

        const file = event.target.files[0];

        if (this.type == 'Image') this.selectedImage = URL.createObjectURL(file);
        else if (this.type == 'Video') this.selectedVideo = URL.createObjectURL(file);
        else this.selectedGif = URL.createObjectURL(file);

        this.uploadedFile = file;

        this.invalid = !((this.type == 'Image' && this.selectedImage) || (this.type == 'Video' && this.selectedVideo) || (this.type == 'Effet' && this.selectedGif));
        event.preventDefault();
    }

    toggleMode(mode: string, visibility: number) {
        this.mode = mode;
        this.visibility = visibility;
        if(this.type) this.readDirContents();
        if(mode === 'delete') this.selectedImage = this.selectedVideo = this.selectedGif = null;
    }

    toggleType(type: string) {
        this.type = type;

        if(this.mode && this.mode ==='delete') this.readDirContents();

        else this.selectedImage = this.selectedVideo = this.selectedGif = null;
    }

    readDirContents() {
    	if(this.type === 'Image')
		    this.scenarioService.readFile('images.json').subscribe({
				next: data => {
		            this.currentDirContents = data;
		        },
				error: err => {
                    if (err.error.statusText !== 'OK') {
                        console.log("Error: ", err.error);
                    } else {

                    }
                }
			});
		else if(this.type === 'Video')
		    this.scenarioService.readFile('videos.json').subscribe({
				next: data => {
		            this.currentDirContents = data;
		        },
				error: err => {
                    if (err.statusText !== 'OK') {
                        console.log("Error: ", err.error);
                    } else {

                    }
                }
			});
		else
		    this.scenarioService.readFile('effets.json').subscribe({
				next: data => {
		            this.currentDirContents = data;
		        },
				error: err => {
                    if (err.statusText !== 'OK') {
                        console.log("Error: ", err.error);
                    } else {

                    }
                }
			});

    }

    upload() {
        let formData = new FormData(), path: string;

        path = '/' + this.uploadedFile.name;

        formData.append("data", this.uploadedFile, path);

        this.adminService.upload(formData).subscribe({
            next: response => {
                console.log('Response: ', response);
                setTimeout(() => {
                    this.showPopupUpdate("Fichier importé avec succes !");
                    this.readDirContents();
                }, 1000);
            },
            error: err => {
                if (err.statusText !== 'OK') {
                    console.log("Error: ", err.error);
                } else {
                    setTimeout(() => {
                        this.showPopupUpdate("Fichier importé avec succes !");
                        this.readDirContents();
                    }, 2*1000);
                }
            }
        });
		//this.router.navigate(['/tabs/edit']);
    }

    delete(fileName: string) {

        let formData = new FormData();

        if (this.type === "Videos") {
            formData.append("path", "/Videos/"+fileName);
        } else if (this.type === "Effet") {
            formData.append("path", "/Effets/"+fileName);
        } else {
            formData.append("path", "/images/"+fileName);
        }

        this.adminService.delete(formData).subscribe({
            next: response => {
                console.log("response: ", response);
                setTimeout(() => {
                    this.readDirContents();
                }, 2*1000);
            },
            error: err => {
                if (err.statusText !== 'OK') {
                    console.log("Error: ", err.error);
                } else {
                    setTimeout(() => {
                        this.readDirContents();
                    }, 2*1000);
                }
            }
        });
    }

    edit(oldFileName: string, newfileName: string) {

        let formData = new FormData(); let srcPath: string, dstPath: string;

        if (this.type === "Videos") {
            dstPath = '/Videos/' + newfileName + '.' + oldFileName.split('.').pop();
            srcPath = "/Videos/" + oldFileName;
        } else if (this.type === "Effet") {
            dstPath = '/Effets/' + newfileName + '.' + oldFileName.split('.').pop();
            srcPath = "/Effets/" + oldFileName;
        } else {
            dstPath = '/images/' + newfileName + '.' + oldFileName.split('.').pop();
            srcPath = "/images/" + oldFileName;
        }

        formData.append("path", dstPath);
        formData.append("src", srcPath);

        this.adminService.rename(formData).subscribe({
            next: response => {
                console.log("Response: ", response);
                setTimeout(() => {
                    this.readDirContents();
                }, 2*1000);
            },
            error: err => {
                if (err.statusText !== 'OK') {
                    console.log("Error: ", err.error);
                } else {
                    setTimeout(() => {
                        this.readDirContents();
                    }, 2*1000);
                }
            }
        });
    }

    async showPopupUpdate(message: string) {
        const alert = await this.alertController.create({
            header: 'Opération réussie.',
            message: message,
            buttons: ['OK'],
            cssClass: 'custom-alert'
        });
        await alert.present();
    }

    async showPopup(oldFileName: string) {
        const alert = await this.alertController.create({
            header: 'Modifier le nom du fichier',
            inputs: [{
                name: 'newUsername',
                type: 'text',
                value: oldFileName.substring(0, oldFileName.lastIndexOf('.')),
                placeholder: 'Nouveau nom du fichier'
            }],
            buttons: [{
                text: 'Annuler',
                role: 'cancel',
                cssClass: 'alert-button-cancel',
            },{
                text: 'Enregistrer',
                cssClass: 'alert-button-confirm',
                handler: (data) => {
                    this.fileName = data.newUsername;
                    this.edit(oldFileName, data.newUsername);
                }
            }],
            cssClass: 'custom-alert'
        });
        await alert.present();
    }

}
