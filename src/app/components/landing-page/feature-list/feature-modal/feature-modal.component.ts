import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-feature-modal",
  templateUrl: "./feature-modal.component.html",
  styleUrls: ["./feature-modal.component.scss"],
})
export class FeatureModalComponent implements OnInit {
  imagePath: string;

  private featureID: number;

  featureDescriptionPath: string;

  featureTitlePath: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FeatureModalComponent>
  ) {}

  ngOnInit(): void {
    this.featureID = this.data.descriptionID;
    this.imagePath = this.data.imgPath;
    this.featureDescriptionPath = this.getDescription();
    this.featureTitlePath = this.getTitle();
  }

  private getDescription() {
    return `features-details.feature${this.featureID + 1}.description`;
  }

  private getTitle() {
    return `features-details.feature${this.featureID + 1}.title`;
  }

  // closeModal() {
  // 	this.dialogRef.close();
  // }
}
