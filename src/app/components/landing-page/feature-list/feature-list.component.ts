import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FeatureModalComponent } from './feature-modal/feature-modal.component';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {
  featureImagePath = [
    "../../../../../assets/images/featureSnapshots/skeletal.png",
    "../../../../../assets/images/featureSnapshots/freespace.jpg",
    "../../../../../assets/images/featureSnapshots/skeletal.png",
    "../../../../../assets/images/featureSnapshots/freespace.jpg",
    "../../../../../assets/images/featureSnapshots/skeletal.png",
    "../../../../../assets/images/featureSnapshots/freespace.jpg",
]

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModal(event: MouseEvent, index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      imgPath: this.featureImagePath[index],
      descriptionID: index
    }
    dialogConfig.id = "modal-component";
    dialogConfig.height = "600px";
    dialogConfig.width = "800px";
    const modelDialog = this.matDialog.open(FeatureModalComponent, dialogConfig)

  }

}
