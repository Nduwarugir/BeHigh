import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimationController, Animation , IonicModule, ToastController } from '@ionic/angular';

@Component({
	selector: 'app-pre-visual',
	templateUrl: './pre-visual.page.html',
	styleUrls: ['./pre-visual.page.scss'],
	standalone: true,
	imports: [IonicModule, CommonModule, FormsModule]
})
export class PreVisualPage implements OnInit {

	constructor(private toastController: ToastController, private animationController: AnimationController) { }

    ngOnInit() {
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
