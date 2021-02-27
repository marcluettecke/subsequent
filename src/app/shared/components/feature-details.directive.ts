import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { promoTexts } from '../../../assets/text/landingPage/promoTexts'
import { IPromoText } from '../../components/landing-page/models/iLandingPage'

@Directive({
	selector: '[featureDetails]'
})
export class FeatureDetailsDirective implements OnInit {
	@Input() imgUrl: string;
	@Input() number: string;
	@Input() textDescription: string;
	promoTexts: IPromoText = promoTexts

	private nativeElement: Node;

	constructor(private renderer: Renderer2, private element: ElementRef) {}

	ngOnInit() {
		this.renderFeature()
	}

	private renderFeature() {
		this.nativeElement = this.element.nativeElement;
		const container = this.renderer.createElement('div');
		this.renderer.setAttribute(container, 'class', 'container'+this.number);
		const checkbox = this.renderer.createElement('input');
		this.renderer.setAttribute(checkbox, 'type', 'checkbox');
		this.renderer.setAttribute(checkbox, 'id', 'checkbox' + this.number);
		const label = this.renderer.createElement('label');
		this.renderer.setAttribute(label, 'for', 'checkbox' + this.number);
		const flexContainer = this.renderer.createElement('div');
		this.renderer.setAttribute(flexContainer, 'class', 'flexContainer');
		
		const imgContainer = this.renderer.createElement('div');
		this.renderer.setAttribute(imgContainer, 'class', 'imgContainer');
		const img = this.renderer.createElement('img');
		this.renderer.setAttribute(img, 'src', this.imgUrl);
		this.renderer.setAttribute(img, 'class', 'featureImage');
		const divPromoText = this.renderer.createElement('p');
		const promoText = this.renderer.createText(this.promoTexts.skeletalExtraction);
		this.renderer.setAttribute(divPromoText, 'class', 'promoText');
		const background = this.renderer.createElement('div');
		this.renderer.setAttribute(background, 'class', 'background');
		
		this.renderer.appendChild(this.nativeElement, container);
		this.renderer.appendChild(container, checkbox);

		this.renderer.appendChild(container, label);
		this.renderer.appendChild(container, background);
		this.renderer.appendChild(label, flexContainer);
		this.renderer.appendChild(flexContainer, imgContainer);
		this.renderer.appendChild(imgContainer, img);
		this.renderer.appendChild(flexContainer, divPromoText);
		this.renderer.appendChild(divPromoText, promoText);
	}
}
