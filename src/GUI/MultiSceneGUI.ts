import { Observable } from "@babylonjs/core";
import {
  AdvancedDynamicTexture,
  Button,
  Control,
  Image,
  Rectangle,
  ScrollViewer,
  StackPanel,
  ValueAndUnit,
} from "@babylonjs/gui";

export default class MultiSceneGUI {
  public advancedTexture: AdvancedDynamicTexture;

  public scenetype: any;

  public sceneTypeObservable: Observable<{ sceneType: string }>;

  constructor() {
    this.sceneTypeObservable = new Observable();
  }

  public multiScenesButtons() {
    this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var countClick: number = 0;
    var hamBurgerMenuButton = Button.CreateImageOnlyButton(
      "hamBurgerMenu",
      "./assets/HamBurger.png"
    );
    hamBurgerMenuButton.width = 0.04;
    hamBurgerMenuButton._automaticSize = false;
    hamBurgerMenuButton.height = "50px";
    hamBurgerMenuButton.thickness = 0;
    hamBurgerMenuButton.zIndex = 2;
    hamBurgerMenuButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    hamBurgerMenuButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    hamBurgerMenuButton.paddingLeft = 8;
    hamBurgerMenuButton.paddingTop = 8;

    hamBurgerMenuButton.onPointerClickObservable.add(() => {
      countClick++;
      if (countClick % 2 !== 0) {
        panel.isVisible = true;
      } else {
        panel.isVisible = false;
      }
    });
    countClick = 0;

    this.advancedTexture.addControl(hamBurgerMenuButton);

    var panel = new StackPanel("ButtonContainer");
    panel.width = 0.4;
    panel.height = 0.6;
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    panel.background = "";
    panel._automaticSize = true;

    var mainPanelBackground = new Rectangle("mainPanelBackground");
    mainPanelBackground.color = "white";
    mainPanelBackground.thickness = 0;
    mainPanelBackground.cornerRadius = 6;
    mainPanelBackground.background = "#c1f7f6";
    mainPanelBackground.alpha = 0.2;
    panel.addControl(mainPanelBackground);

    var mainPanelSV = new ScrollViewer("MainPanelSV");
    mainPanelSV.width = "100%";
    mainPanelSV.height = "100%";
    panel.addControl(mainPanelSV);

    var mainPanelSvContainer = new StackPanel("MainPanelSvContainer");
    mainPanelSvContainer.background = "";
    mainPanelSvContainer.color = "white";
    mainPanelSV.addControl(mainPanelSvContainer);

    panel.isVisible = false;
    this.advancedTexture.addControl(panel);

    var panelButton1 = new StackPanel("GardenButtonPanel");
    panelButton1.width = 0.95;
    panelButton1.height = "200px";
    panelButton1.paddingTop = 6;
    // panelButton1.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    // panelButton1.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    // panelButton1.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    panelButton1.background = "";

    var buttonPanelBackground = new Rectangle("");
    buttonPanelBackground.color = "";
    buttonPanelBackground.cornerRadius = 6;
    buttonPanelBackground.thickness = 0;
    buttonPanelBackground.background = "black";
    buttonPanelBackground.alpha = 0.5;
    buttonPanelBackground.zIndex = -1;
    panelButton1.addControl(buttonPanelBackground);
    mainPanelSvContainer.addControl(panelButton1);

    var panelButton2 = new StackPanel("CastleButtonPanel");
    panelButton2.width = 0.95;
    panelButton2.height = "200px";
    panelButton2.isVertical = false;
    panelButton2.background = "";
    panelButton2.paddingTop = 2;
    panelButton2.paddingBottom = 4;

    var button1panelBackground = new Rectangle("button1panelBackground");
    button1panelBackground.color = "";
    button1panelBackground.cornerRadius = 6;
    button1panelBackground.thickness = 0;
    button1panelBackground.background = "black";
    button1panelBackground.alpha = 0.6;
    panelButton2.addControl(button1panelBackground);
    mainPanelSvContainer.addControl(panelButton2);

    var gardenImage = new Image("GardenImage", "./assets/GardenImage.jpg");
    // gardenImage.width = "300px";
    // gardenImage.height = "150px";
    gardenImage.paddingLeft = 2;
    gardenImage.paddingRight = 2;
    gardenImage.paddingTop = 2;
    gardenImage.paddingBottom = 2;
    // gardenImage.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    // panelButton1.addControl(gardenImage);

    var gardenImageBorder = new Rectangle("GardenImageBorder");
    gardenImageBorder.color = "crimson";
    gardenImageBorder.thickness = 2;
    gardenImageBorder.width = 0.4;
    gardenImageBorder.height = "150px";
    gardenImageBorder.paddingLeft = 40;
    gardenImageBorder.paddingRight = 50;
    gardenImageBorder.paddingTop = 5;
    gardenImageBorder.cornerRadius = 6;
    gardenImageBorder.addControl(gardenImage);
    panelButton1.addControl(gardenImageBorder);

    var button = Button.CreateSimpleButton("Scene 1", "Garden");
    // button.width = 0.35;
    // button.height = "45px";
    button.width = "35%";
    button.height = "30px";
    button.color = "white";
    button.background = "black";
    button.hoverCursor = "pointer";
    button.onPointerClickObservable.add(() => {
      this.sceneTypeObservable.notifyObservers({
        sceneType: "garden",
      });
    });

    button.onPointerEnterObservable.add(() => {
      button.background = "crimson";
    });
    button.onPointerOutObservable.add(() => {
      button.background = "black";
    });
    panelButton1.addControl(button);

    var castleImage = new Image("CastleImage", "./assets/CastleImage.png");
    castleImage.paddingLeft = 2;
    castleImage.paddingRight = 2;
    castleImage.paddingTop = 2;
    castleImage.paddingBottom = 2;

    var castleImageBorder = new Rectangle("GardenImageBorder");
    castleImageBorder.color = "crimson";
    castleImageBorder.thickness = 2;
    castleImageBorder.width = "300px";
    castleImageBorder.height = "150px";
    castleImageBorder.paddingLeft = 40;
    castleImageBorder.paddingRight = 50;
    castleImageBorder.paddingTop = 5;
    castleImageBorder.cornerRadius = 6;
    castleImageBorder.addControl(castleImage);
    panelButton2.addControl(castleImageBorder);

    var button1 = Button.CreateSimpleButton("Scene 1", "Castle");
    button1.width = "120px";
    button1.height = "40px";
    button1.color = "white";
    button1.background = "black";
    button1.paddingTop = 6;
    button1.paddingBottom = 6;
    button1.hoverCursor = "pointer";
    button1.onPointerClickObservable.add(() => {
      this.sceneTypeObservable.notifyObservers({
        sceneType: "castle",
      });
    });
    button1.onPointerEnterObservable.add(() => {
      button1.background = "crimson";
    });
    button1.onPointerOutObservable.add(() => {
      button1.background = "black";
    });
    panelButton2.addControl(button1);

    var panelCloseButton = new StackPanel();
    panelCloseButton.width = 0.95;
    panelCloseButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    panelCloseButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    panelCloseButton.background = "";
    panelCloseButton.paddingBottom = 4;

    var closePanelBackground = new Rectangle("ClosePanelBackground");
    closePanelBackground.color = "";
    closePanelBackground.cornerRadius = 6;
    closePanelBackground.thickness = 0;
    closePanelBackground.background = "black";
    closePanelBackground.alpha = 0.6;
    closePanelBackground.zIndex = -1;
    panelCloseButton.addControl(closePanelBackground);
    mainPanelSvContainer.addControl(panelCloseButton);

    var closeButton = Button.CreateSimpleButton("CloseButton", "Close");
    closeButton.width = 0.5;
    closeButton.height = "40px";
    closeButton.color = "white";
    closeButton.background = "black";
    closeButton.paddingTop = 6;
    closeButton.paddingBottom = 6;
    closeButton.hoverCursor = "pointer";
    closeButton.onPointerClickObservable.add(() => {
      panel.isVisible = false;
      countClick++;
    });
    closeButton.onPointerEnterObservable.add(() => {
      closeButton.background = "crimson";
    });
    closeButton.onPointerOutObservable.add(() => {
      closeButton.background = "black";
    });
    panelCloseButton.addControl(closeButton);
  }
}
