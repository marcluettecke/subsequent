import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable, Subscription } from "rxjs";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { FeatureModalComponent } from "./feature-modal/feature-modal.component";
import {
  FeatureNetworkScreen,
  FeatureNetworkScreenTemplate,
  FeatureNetworkCable,
} from "../models/LandingPage";

@Component({
  selector: "app-feature-list",
  templateUrl: "./feature-list.component.html",
  styleUrls: ["./feature-list.component.scss"],
})
export class FeatureListComponent implements OnInit {
  @ViewChild("networkGraphicCanvas", { static: false })
  networkGraphicCanvas: ElementRef;

  @ViewChild("networkGraphicWrapper", { static: false })
  networkGraphicWrapper: ElementRef;

  @ViewChild("networkGraphicContainer", { static: false })
  networkGraphicContainer: ElementRef;

  /**
   * NetworkScreenTemplates:
   * Here you can create and edit all Featurescreen positions, size and their images
   */
  networkScreenTemplates: {
    desktop: Array<FeatureNetworkScreenTemplate>;
    mobile: Array<FeatureNetworkScreenTemplate>;
  } = {
    desktop: [
      {
        id: 0,
        xPerc: 0.1,
        yPerc: 0.2,
        widthPerc: 0.2,
        imgSrc: "/assets/images/featureSnapshots/skeletal.png",
      },
      {
        id: 1,
        xPerc: 0.3,
        yPerc: 0.45,
        widthPerc: 0.18,
        imgSrc: "/assets/images/featureSnapshots/freespace.jpg",
      },
      {
        id: 2,
        xPerc: 0.2,
        yPerc: 0.75,
        widthPerc: 0.18,
        imgSrc: "/assets/images/featureSnapshots/skeletal.png",
      },
      {
        id: 3,
        xPerc: 0.9,
        yPerc: 0.23,
        widthPerc: 0.18,
        imgSrc: "/assets/images/featureSnapshots/freespace.jpg",
      },
      {
        id: 4,
        xPerc: 0.68,
        yPerc: 0.35,
        widthPerc: 0.15,
        imgSrc: "/assets/images/featureSnapshots/skeletal.png",
      },
      {
        id: 5,
        xPerc: 0.8,
        yPerc: 0.7,
        widthPerc: 0.23,
        imgSrc: "/assets/images/featureSnapshots/freespace.jpg",
      },
    ],
    mobile: [
      {
        id: 0,
        xPerc: 0.27,
        yPerc: 0.15,
        widthPerc: 0.35,
        imgSrc: "/assets/images/featureSnapshots/skeletal.png",
      },
      {
        id: 1,
        xPerc: 0.25,
        yPerc: 0.48,
        widthPerc: 0.35,
        imgSrc: "/assets/images/featureSnapshots/freespace.jpg",
      },
      {
        id: 2,
        xPerc: 0.26,
        yPerc: 0.75,
        widthPerc: 0.35,
        imgSrc: "/assets/images/featureSnapshots/skeletal.png",
      },
      {
        id: 3,
        xPerc: 0.73,
        yPerc: 0.15,
        widthPerc: 0.3,
        imgSrc: "/assets/images/featureSnapshots/freespace.jpg",
      },
      {
        id: 4,
        xPerc: 0.72,
        yPerc: 0.4,
        widthPerc: 0.35,
        imgSrc: "/assets/images/featureSnapshots/skeletal.png",
      },
      {
        id: 5,
        xPerc: 0.73,
        yPerc: 0.75,
        widthPerc: 0.35,
        imgSrc: "/assets/images/featureSnapshots/freespace.jpg",
      },
    ],
  };

  networkScreens: Array<FeatureNetworkScreen>;

  networkCables: Array<FeatureNetworkCable> = [];

  /**
   * MainCableanchorpoints
   *
   * INDEXES:
   * 0 is for left side
   * 1 for the right side
   */
  mainCableAnchorPoints = {
    desktop: [
      {
        pos1: {
          xPerc: 0.45,
          yPerc: 0.0,
        },
        pos2: {
          xPerc: 0.45,
          yPerc: 0.25,
        },
      },
      {
        pos1: {
          xPerc: 0.55,
          yPerc: 0.0,
        },
        pos2: {
          xPerc: 0.55,
          yPerc: 0.25,
        },
      },
    ],
    mobile: [
      {
        pos1: {
          xPerc: 0.05,
          yPerc: 0.0,
        },
        pos2: {
          xPerc: 0.05,
          yPerc: 0.25,
        },
      },
      {
        pos1: {
          xPerc: 0.95,
          yPerc: 0.0,
        },
        pos2: {
          xPerc: 0.95,
          yPerc: 0.25,
        },
      },
    ],
  };

  canvasWidth: number = 0;

  canvasHeight: number = 0;

  isXSmallSubscription: Subscription;

  isXSmall: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.XSmall
  );

  isSmallSubscription: Subscription;

  isSmall: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Small
  );

  isMediumSubscription: Subscription;

  isMedium: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Medium
  );

  isLargeSubscription: Subscription;

  isLarge: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Large
  );

  isXLargeSubscription: Subscription;

  isXLarge: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.XLarge
  );

  screenMode: "desktop" | "mobile" = "desktop";

  constructor(
    private matDialog: MatDialog,
    private readonly breakpointObserver: BreakpointObserver,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      const resizeFunction = (size: any) => {
        if (size.matches) {
          if (this.networkGraphicContainer.nativeElement.offsetWidth < 600) {
            this.screenMode = "mobile";
          } else {
            this.screenMode = "desktop";
          }
          this.drawNetwork();
        }
      };
      this.isXSmallSubscription = this.isXSmall.subscribe(resizeFunction);
      this.isSmallSubscription = this.isSmall.subscribe(resizeFunction);
      this.isMediumSubscription = this.isMedium.subscribe(resizeFunction);
      this.isLargeSubscription = this.isLarge.subscribe(resizeFunction);
      this.isXLargeSubscription = this.isXLarge.subscribe(resizeFunction);
    }, 300);
  }

  ngOnDestroy(): void {
    this.isXSmallSubscription.unsubscribe();
    this.isSmallSubscription.unsubscribe();
    this.isMediumSubscription.unsubscribe();
    this.isLargeSubscription.unsubscribe();
    this.isXLargeSubscription.unsubscribe();
  }

  ngAfterViewChecked(): void {}

  /**
   * recalculates all fields of all feature screens
   */
  recalculateScreens() {
    this.networkScreens = [];
    this.networkScreenTemplates[this.screenMode].forEach(
      (screenTemplate: FeatureNetworkScreenTemplate) => {
        const newFeatureScreen: FeatureNetworkScreen = {
          id: screenTemplate.id,
          pos: {
            x: this.canvasWidth * screenTemplate.xPerc,
            y: this.canvasHeight * screenTemplate.yPerc,
          },
          width: this.canvasWidth * screenTemplate.widthPerc,
          imgSrc: screenTemplate.imgSrc,
          inLight: false,
        };
        if (screenTemplate.xPerc < 0.5) {
          newFeatureScreen.inLight = true;
        }
        newFeatureScreen.style = `left:${newFeatureScreen.pos.x}px;top:${newFeatureScreen.pos.y}px;width:${newFeatureScreen.width}px;`;
        this.networkScreens.push(newFeatureScreen);
      }
    );
  }

  /**
   * recalculates all fields of all cables
   */
  recalculateCables() {
    // options:
    let supportCableAngle = 27;
    let screenCableAnchorDistance = 50;
    if (this.screenMode === "mobile") {
      supportCableAngle = 30;
      screenCableAnchorDistance = 25;
    }
    this.networkCables = [
      {
        class: "network-cable main-cable left",
        pos1: {
          x:
            this.canvasWidth *
            this.mainCableAnchorPoints[this.screenMode][0].pos1.xPerc,
          y:
            this.canvasHeight *
            this.mainCableAnchorPoints[this.screenMode][0].pos1.yPerc,
        },
        pos2: {
          x:
            this.canvasWidth *
            this.mainCableAnchorPoints[this.screenMode][0].pos2.xPerc,
          y:
            this.canvasHeight *
            this.mainCableAnchorPoints[this.screenMode][0].pos2.yPerc,
        },
      },
      {
        class: "network-cable main-cable right",
        pos1: {
          x:
            this.canvasWidth *
            this.mainCableAnchorPoints[this.screenMode][1].pos1.xPerc,
          y:
            this.canvasHeight *
            this.mainCableAnchorPoints[this.screenMode][1].pos1.yPerc,
        },
        pos2: {
          x:
            this.canvasWidth *
            this.mainCableAnchorPoints[this.screenMode][1].pos2.xPerc,
          y:
            this.canvasHeight *
            this.mainCableAnchorPoints[this.screenMode][1].pos2.yPerc,
        },
      },
    ];
    this.networkScreens.forEach((screen) => {
      if (screen.pos.x && screen.pos.y) {
        // determine side and mainCable connection
        let mCableIndex = 1;
        let sideClass = "right";
        if (screen.pos.x && screen.pos.x < this.canvasWidth / 2) {
          mCableIndex = 0;
          sideClass = "left";
        }
        // determine anchorpoints
        const screenAnchorPoint = {
          x: screen.pos.x,
          y: screen.pos.y - screenCableAnchorDistance,
        };
        const mCableConnectorY =
          screenAnchorPoint.y -
          this.calcOppositeCathetus(
            supportCableAngle,
            Math.abs(screen.pos.x - this.networkCables[mCableIndex].pos1.x)
          );
        if (this.networkCables[mCableIndex].pos2.y < mCableConnectorY) {
          this.networkCables[mCableIndex].pos2.y = mCableConnectorY;
        }
        const mCableConnectionPoint = {
          x: this.networkCables[mCableIndex].pos1.x,
          y: mCableConnectorY,
        };
        this.networkCables.push({
          class: `network-cable ${sideClass}`,
          screenID: screen.id,
          pos1: mCableConnectionPoint,
          pos2: screenAnchorPoint,
        });
        // set final cable section
        this.networkCables.push({
          class: `network-cable ${sideClass}`,
          screenID: screen.id,
          pos1: screenAnchorPoint,
          pos2: screen.pos,
        });
      }
    });
  }

  private toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }

  private calcOppositeCathetus(alpha: number, cathetus: number) {
    return (
      cathetus *
      Math.sin(this.toRadians(alpha)) *
      Math.sin(this.toRadians(alpha))
    );
  }

  /**
   * draws or refreshes the feature network
   */
  drawNetwork() {
    this.canvasWidth = this.networkGraphicCanvas.nativeElement.width.baseVal.value;
    this.canvasHeight = this.networkGraphicCanvas.nativeElement.height.baseVal.value;
    if (this.canvasWidth === 0 || this.canvasHeight === 0) {
      setTimeout(() => {
        this.drawNetwork();
      }, 300);
    }
    // setup network SCREENS:
    this.recalculateScreens();

    // clear CABLE drawCanvas:
    const childElements = this.networkGraphicCanvas.nativeElement.children;
    for (let i = 0; i < childElements.length; i++) {
      this.renderer2.removeChild(
        this.networkGraphicCanvas.nativeElement,
        childElements[i]
      );
    }

    // draw network CABLES:
    this.recalculateCables();
    this.networkCables.forEach((cable) => {
      const line1: SVGLineElement = this.renderer2.createElement(
        "line",
        this.networkGraphicCanvas.nativeElement.namespaceURI
      );
      line1.setAttributeNS(null, "x1", `${cable.pos1.x}`);
      line1.setAttributeNS(null, "x2", `${cable.pos2.x}`);
      line1.setAttributeNS(null, "y1", `${cable.pos1.y}`);
      line1.setAttributeNS(null, "y2", `${cable.pos2.y}`);
      line1.setAttributeNS(null, "class", cable.class);
      this.networkGraphicCanvas.nativeElement.appendChild(line1);
    });
  }

  openModal(event: MouseEvent, index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      imgPath: this.networkScreens[index].imgSrc,
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
