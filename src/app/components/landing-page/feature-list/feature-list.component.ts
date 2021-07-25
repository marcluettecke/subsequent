import {
  Component,
  ElementRef,
  HostListener,
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

declare let particlesJS: any;

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

  @ViewChild("runningManVideo", { static: false })
  runningManVideoRef: ElementRef;

  @ViewChild("runningManVideoWrapper", { static: false })
  runningManVideoWrapper: ElementRef;

  showRunningManVideoClass: string[] = [];

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
        xPerc: 0.25,
        yPerc: 0.15,
        widthPerc: 0.2,
        imgSrc: "/assets/images/featureSnapshots/skeletal.png",
      },
      {
        id: 1,
        xPerc: 0.3,
        yPerc: 0.4,
        widthPerc: 0.18,
        imgSrc: "/assets/images/featureSnapshots/freespace.jpg",
      },
      {
        id: 2,
        xPerc: 0.33,
        yPerc: 0.65,
        widthPerc: 0.18,
        imgSrc: "/assets/images/featureSnapshots/skeletal.png",
      },
      {
        id: 3,
        xPerc: 0.77,
        yPerc: 0.21,
        widthPerc: 0.18,
        imgSrc: "/assets/images/featureSnapshots/freespace.jpg",
      },
      {
        id: 4,
        xPerc: 0.65,
        yPerc: 0.4,
        widthPerc: 0.15,
        imgSrc: "/assets/images/featureSnapshots/skeletal.png",
      },
      {
        id: 5,
        xPerc: 0.7,
        yPerc: 0.67,
        widthPerc: 0.23,
        imgSrc: "/assets/images/featureSnapshots/freespace.jpg",
      },
    ],
    mobile: [
      {
        id: 0,
        xPerc: 0.29,
        yPerc: 0.15,
        widthPerc: 0.27,
        imgSrc: "/assets/images/featureSnapshots/skeletal.png",
      },
      {
        id: 1,
        xPerc: 0.23,
        yPerc: 0.48,
        widthPerc: 0.28,
        imgSrc: "/assets/images/featureSnapshots/freespace.jpg",
      },
      {
        id: 2,
        xPerc: 0.2,
        yPerc: 0.75,
        widthPerc: 0.27,
        imgSrc: "/assets/images/featureSnapshots/skeletal.png",
      },
      {
        id: 3,
        xPerc: 0.71,
        yPerc: 0.15,
        widthPerc: 0.28,
        imgSrc: "/assets/images/featureSnapshots/freespace.jpg",
      },
      {
        id: 4,
        xPerc: 0.74,
        yPerc: 0.4,
        widthPerc: 0.31,
        imgSrc: "/assets/images/featureSnapshots/skeletal.png",
      },
      {
        id: 5,
        xPerc: 0.73,
        yPerc: 0.75,
        widthPerc: 0.3,
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

  @ViewChild("bgVidBreakPointElement") bgVidBreakPointElement: ElementRef;

  @ViewChild("bgVidBreakPointElement2") bgVidBreakPointElement2: ElementRef;

  @ViewChild("bgVideoContainer") bgVideoContainer: ElementRef;

  @ViewChild("bottomNetworkContainer") bottomNetworkContainer: ElementRef;

  @HostListener("window:scroll", ["$event"]) onScroll() {
    if (
      this.bgVidBreakPointElement.nativeElement.getBoundingClientRect().top <=
      -550
    ) {
      if (!this.showRunningManVideoClass.includes("show-video")) {
        this.showRunningManVideoClass.push("show-video");
        this.runningManVideoRef.nativeElement.muted = true;
        this.runningManVideoRef.nativeElement.currentTime = 0;
        this.runningManVideoRef.nativeElement.play();
      }
    } else if (this.showRunningManVideoClass.includes("show-video")) {
      this.showRunningManVideoClass = this.showRunningManVideoClass.filter(
        (e) => e !== "show-video"
      );
      this.runningManVideoRef.nativeElement.muted = true;
      this.runningManVideoRef.nativeElement.pause();
      this.runningManVideoRef.nativeElement.currentTime = 0;
    }
    if (this.bgVideoContainer.nativeElement.getBoundingClientRect().top <= 0) {
      if (!this.showRunningManVideoClass.includes("fixed-position")) {
        this.showRunningManVideoClass.push("fixed-position");
      }
    } else if (this.showRunningManVideoClass.includes("fixed-position")) {
      this.showRunningManVideoClass = this.showRunningManVideoClass.filter(
        (e) => e !== "fixed-position"
      );
    }
    if (
      this.bgVidBreakPointElement2.nativeElement.getBoundingClientRect().top <=
      0
    ) {
      this.showRunningManVideoClass.push("sticky-bottom");
      this.showRunningManVideoClass = this.showRunningManVideoClass.filter(
        (e) => e !== "sticky-top"
      );
    } else {
      this.showRunningManVideoClass = this.showRunningManVideoClass.filter(
        (e) => e !== "sticky-bottom"
      );
      this.showRunningManVideoClass.push("sticky-top");
    }
    // fixed-position
  }

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

  ngAfterViewInit() {
    this.initParticles();
  }

  ngOnDestroy(): void {
    this.isXSmallSubscription.unsubscribe();
    this.isSmallSubscription.unsubscribe();
    this.isMediumSubscription.unsubscribe();
    this.isLargeSubscription.unsubscribe();
    this.isXLargeSubscription.unsubscribe();
  }

  ngAfterViewChecked(): void {}

  initParticles() {
    particlesJS("particles-js", {
      particles: {
        number: { value: 40, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 },
          image: { src: "img/github.svg", width: 100, height: 100 },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });
  }

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
