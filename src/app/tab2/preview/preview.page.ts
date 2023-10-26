import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimationController, Animation , IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.page.html',
  styleUrls: ['./preview.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreviewPage implements OnInit {

	@ViewChild('streamContainer') streamContainerRef!: ElementRef;
	@ViewChild('stream') streamRef!: ElementRef;
	@ViewChild('toggleStream') toggleStreamRef!: ElementRef;

	streamUrl!: string;
	streamEnabled: boolean = false;
	streamButtonValue: string = 'Start Stream';
	stream64!: any;
	streamIntervalId!: any;
	
	constructor(private toastController: ToastController, private animationController: AnimationController, private http: HttpClient) { }

    ngOnInit() {
    }

	open() {
        if (this.streamEnabled) this.stopStream();
        else this.startStream();
	}

	close() {
		this.stopStream();
	}

	show(el: HTMLInputElement) {
		el.classList.remove('hidden');
	}

	hide(el: HTMLInputElement) {
		el.classList.add('hidden');
	}

	async startStream() {

		this.streamIntervalId = setInterval(() => {
			this.http.get(`http://192.168.1.117/stream`).subscribe({
				next: (res: any) => {
					this.stream64 = res;
					console.log(res);
				},
				
				error: err => console.log(err),
			});
		}, 5*1000);
		
		this.streamEnabled = true;
		// this.streamUrl = `http://192.168.1.144:81/stream`;
		this.streamButtonValue = 'Stop Stream';
	}

	async stopStream() {

		clearInterval(this.streamIntervalId);

		// window.stop();
		this.streamEnabled = false;
		// this.streamUrl = ``;
		this.streamButtonValue = 'Start Stream';
	}



	async presentToast() {
		const toast = await this.toastController.create({
			message: 'Hello, this is a toast message!', // The message to display
			duration: 5000, // Optional, the duration in milliseconds for how long the toast should be displayed
			position: 'bottom' // Optional, the position where the toast should be displayed (e.g., 'top', 'bottom', 'middle')
		});
	  
		toast.present();
	}
	
	animateScrollingText() {
		const textElement = document.querySelector('.scrolling-text');
		const animationDuration = 5000; // Durée de l'animation en millisecondes
		
		if (textElement && textElement.parentElement) {
			console.log('textElement: ', textElement, 'parentElement: ', textElement.parentElement);

			// Calcule la distance à parcourir en fonction de la largeur du texte
			const textWidth = textElement.clientWidth;
			const containerWidth = textElement.parentElement.clientWidth;
			const distance = textWidth - containerWidth;
			
			console.log('textWidth: ', textWidth, 'containerWidth: ', containerWidth, 'distance: ', distance);

			// Crée une animation en utilisant l'AnimationController
			const animation: Animation = this.animationController.create()
			.addElement(textElement)
			.duration(animationDuration)
			.iterations(Infinity) // Fait boucler l'animation en continu
			.fromTo('transform', 'translateX(0)', `translateX(-${distance}px)`);
			
			// Démarre l'animation
			animation.play();
		}
	}
}
