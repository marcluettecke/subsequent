import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable } from "rxjs";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { FeatureModalComponent } from "./feature-modal/feature-modal.component";

@Component({
  selector: "app-feature-list",
  templateUrl: "./feature-list.component.html",
  styleUrls: ["./feature-list.component.scss"],
})
export class FeatureListComponent implements OnInit {
  @ViewChild("networkGraphicCanvas", { static: false })
  networkGraphicCanvas: ElementRef;

  networkScreens: Array<any> = [
    {
      id: 0,
      // x: this.canvasWidth / 4,
      // y: this.canvasHeight / 5,
      // width: this.canvasWidth / 5,
    },
    {
      id: 3,
      // x: (this.canvasWidth / 4) * 3,
      // y: (this.canvasHeight / 5) * 3,
      // width: this.canvasWidth / 7,
    },
  ];

  networkCables: Array<any> = [];

  canvasDrawed: boolean = false;

  canvasWidth: number = 0;

  canvasHeight: number = 0;

  featureImagePath = [
    "../../../../../assets/images/featureSnapshots/skeletal.png",
    "../../../../../assets/images/featureSnapshots/freespace.jpg",
    "../../../../../assets/images/featureSnapshots/skeletal.png",
    "../../../../../assets/images/featureSnapshots/freespace.jpg",
    "../../../../../assets/images/featureSnapshots/skeletal.png",
    "../../../../../assets/images/featureSnapshots/freespace.jpg",
  ];

  isXSmall: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.XSmall
  );

  constructor(
    private matDialog: MatDialog,
    private readonly breakpointObserver: BreakpointObserver,
    private renderer2: Renderer2,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    if (this.canvasWidth === 0) {
      this.canvasWidth = this.networkGraphicCanvas.nativeElement.width.baseVal.value;
      this.canvasHeight = this.networkGraphicCanvas.nativeElement.height.baseVal.value;
    } else if (!this.canvasDrawed) {
      console.log("this.canvasWidth: ", this.canvasWidth);
      console.log("this.canvasHeight: ", this.canvasHeight);
      this.ngZone.run(() => {
        this.drawNetwork();
      });
    }
  }

  drawNetwork() {
    this.canvasDrawed = true;
    // draw network SCREENS:
    this.networkScreens.push({});
    this.networkScreens.push({});
    console.log("this.networkScreens: ", this.networkScreens);
    // draw network CABLES:
    const line1: SVGLineElement = this.renderer2.createElement(
      "line",
      this.networkGraphicCanvas.nativeElement.namespaceURI
    );
    line1.setAttributeNS(null, "x1", "0");
    line1.setAttributeNS(null, "x2", "200");
    line1.setAttributeNS(null, "y1", "0");
    line1.setAttributeNS(null, "y2", "200");
    line1.setAttributeNS(null, "class", "networkCable left");
    this.networkGraphicCanvas.nativeElement.appendChild(line1);
  }

  openModal(event: MouseEvent, index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      imgPath: this.featureImagePath[index],
      descriptionID: index,
    };
    dialogConfig.id = "modal-component";
    dialogConfig.width = "calc(100% - 50px)";
    dialogConfig.maxWidth = "100vw";
    const modelDialog = this.matDialog.open(
      FeatureModalComponent,
      dialogConfig
    );

    const xSmallDialogSubscription = this.isXSmall.subscribe((size) => {
      if (size.matches) {
        modelDialog.updateSize("100vw", "100vh");
      } else {
        modelDialog.updateSize("calc(100% - 50px)", "");
      }
    });
    modelDialog.afterClosed().subscribe(() => {
      xSmallDialogSubscription.unsubscribe();
    });
  }
}
