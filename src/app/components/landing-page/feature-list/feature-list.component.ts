import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FeatureModalComponent } from './feature-modal/feature-modal.component';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
	selector: 'app-feature-list',
	templateUrl: './feature-list.component.html',
	styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {
	featureImagePath = [
		'../../../../../assets/images/featureSnapshots/skeletal.png',
		'../../../../../assets/images/featureSnapshots/freespace.jpg',
		'../../../../../assets/images/featureSnapshots/skeletal.png',
		'../../../../../assets/images/featureSnapshots/freespace.jpg',
		'../../../../../assets/images/featureSnapshots/skeletal.png',
		'../../../../../assets/images/featureSnapshots/freespace.jpg'
	];
	isXSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);

	constructor(
		private matDialog: MatDialog,
		private readonly breakpointObserver: BreakpointObserver
	) {}

	ngOnInit(): void {}

	openModal(event: MouseEvent, index: number) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = {
			imgPath: this.featureImagePath[index],
			descriptionID: index
		};
		dialogConfig.id = 'modal-component';
		dialogConfig.width = 'calc(100% - 50px)';
		dialogConfig.maxWidth = '100vw';
		const modelDialog = this.matDialog.open(FeatureModalComponent, dialogConfig);

		const xSmallDialogSubscription = this.isXSmall.subscribe(size => {
			if (size.matches) {
				modelDialog.updateSize('100vw', '100vh');
			} else {
				modelDialog.updateSize('calc(100% - 50px)', '');
			}
		});
		modelDialog.afterClosed().subscribe(() => {
			xSmallDialogSubscription.unsubscribe();
		});
	}
}
