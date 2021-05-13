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

  networkScreens: Array<FeatureNetworkScreen> = [
    {
      id: 0,
      xPerc: 0.15,
      yPerc: 0.3,
      widthPerc: 0.15,
      pos: {
        x: null,
        y: null,
      },
    },
    {
      id: 1,
      xPerc: 0.15,
      yPerc: 0.75,
      widthPerc: 0.12,
      pos: {
        x: null,
        y: null,
      },
    },
    {
      id: 2,
      xPerc: 0.35,
      yPerc: 0.5,
      widthPerc: 0.14,
      pos: {
        x: null,
        y: null,
      },
    },
    {
      id: 3,
      xPerc: 0.8,
      yPerc: 0.7,
      widthPerc: 0.13,
      pos: {
        x: null,
        y: null,
      },
    },
    {
      id: 4,
      xPerc: 0.7,
      yPerc: 0.3,
      widthPerc: 0.15,
      pos: {
        x: null,
        y: null,
      },
    },
    {
      id: 5,
      xPerc: 0.65,
      yPerc: 0.5,
      widthPerc: 0.13,
      pos: {
        x: null,
        y: null,
      },
    },
  ];

  networkCables: Array<FeatureNetworkCable> = [];

  mainCableAnchorPoints = {
    left: {
      pos1: {
        xPerc: 0.45, // initially % value
        yPerc: 0.0,
      },
      pos2: {
        xPerc: 0.45, // initially % value
        yPerc: 0.25,
      },
    },
    right: {
      pos1: {
        xPerc: 0.55, // initially % value
        yPerc: 0.0,
      },
      pos2: {
        xPerc: 0.55, // initially % value
        yPerc: 0.25,
      },
    },
  };

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

  constructor(
    private matDialog: MatDialog,
    private readonly breakpointObserver: BreakpointObserver,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.drawNetwork();
      const resizeFunction = () => {
        setTimeout(() => {
          this.drawNetwork();
        }, 300);
      };
      this.isSmallSubscription = this.isSmall.subscribe(resizeFunction);
      this.isMediumSubscription = this.isMedium.subscribe(resizeFunction);
      this.isLargeSubscription = this.isLarge.subscribe(resizeFunction);
      this.isXLargeSubscription = this.isXLarge.subscribe(resizeFunction);
    }, 300);
  }

  ngOnDestroy(): void {
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
    this.networkScreens.forEach((screen, index) => {
      this.networkScreens[index].pos = {
        x: this.canvasWidth * screen.xPerc,
        y: this.canvasHeight * screen.yPerc,
      };
      this.networkScreens[index].width = this.canvasWidth * screen.widthPerc;
      this.networkScreens[
        index
      ].style = `left:${screen.pos.x}px;top:${screen.pos.y}px;width:${screen.width}px;`;
    });
  }

  /**
   * recalculates all fields of all cables
   */
  recalculateCables() {
    this.networkCables = [
      {
        class: "network-cable main-cable left",
        pos1: {
          x: this.canvasWidth * this.mainCableAnchorPoints.left.pos1.xPerc,
          y: this.canvasHeight * this.mainCableAnchorPoints.left.pos1.yPerc,
        },
        pos2: {
          x: this.canvasWidth * this.mainCableAnchorPoints.left.pos2.xPerc,
          y: this.canvasHeight * this.mainCableAnchorPoints.left.pos2.yPerc,
        },
      },
      {
        class: "network-cable main-cable right",
        pos1: {
          x: this.canvasWidth * this.mainCableAnchorPoints.right.pos1.xPerc,
          y: this.canvasHeight * this.mainCableAnchorPoints.right.pos1.yPerc,
        },
        pos2: {
          x: this.canvasWidth * this.mainCableAnchorPoints.right.pos2.xPerc,
          y: this.canvasHeight * this.mainCableAnchorPoints.right.pos2.yPerc,
        },
      },
    ];
    this.networkScreens.forEach((screen) => {
      let mCableIndex = 1;
      let sideClass = "right";
      if (screen.pos.x && screen.pos.x < this.canvasWidth / 2) {
        mCableIndex = 0;
        sideClass = "left";
      }
      this.networkCables.push({
        class: `network-cable ${sideClass}`,
        screenID: screen.id,
        pos1: this.networkCables[mCableIndex].pos2,
        pos2: screen.pos,
      });
    });
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
    console.log("this.networkScreens: ", this.networkScreens);

    // delete old CABLES:
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
    console.log("this.networkCables: ", this.networkCables);
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
