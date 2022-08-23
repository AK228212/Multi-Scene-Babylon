import { Observable } from "@babylonjs/core";
import {
  AdvancedDynamicTexture,
  Button,
  Control,
  Image,
  Rectangle,
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
    hamBurgerMenuButton.height = "50px";
    hamBurgerMenuButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    hamBurgerMenuButton.zIndex = 2;
    hamBurgerMenuButton.thickness = 2;
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
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    panel.background = "";

    var mainPanelBackground = new Rectangle("mainPanelBackground");
    mainPanelBackground.color = "";
    mainPanelBackground.thickness = 2;
    mainPanelBackground.background = "";
    mainPanelBackground.alpha = 0.6;
    panel.addControl(mainPanelBackground);

    panel.isVisible = false;
    this.advancedTexture.addControl(panel);

    var panelButton1 = new StackPanel("GardenButtonPanel");
    panelButton1.width = 0.95;
    panelButton1.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    panelButton1.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    panelButton1.background = "";
    panelButton1.paddingTop = 4;
    panelButton1.paddingBottom = 2;

    var buttonPanelBackground = new Rectangle("");
    buttonPanelBackground.color = "";
    buttonPanelBackground.cornerRadius = 6;
    buttonPanelBackground.thickness = 0;
    buttonPanelBackground.background = "white";
    buttonPanelBackground.alpha = 0.5;
    buttonPanelBackground.zIndex = -1;
    panelButton1.addControl(buttonPanelBackground);
    panel.addControl(panelButton1);

    var panelButton2 = new StackPanel("CastleButtonPanel");
    panelButton2.width = 0.95;
    panelButton2.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    panelButton2.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    panelButton2.background = "";
    panelButton2.paddingTop = 2;
    panelButton2.paddingBottom = 4;

    var button1panelBackground = new Rectangle("button1panelBackground");
    button1panelBackground.color = "";
    button1panelBackground.cornerRadius = 6;
    button1panelBackground.thickness = 0;
    button1panelBackground.background = "white";
    button1panelBackground.alpha = 0.6;
    panelButton2.addControl(button1panelBackground);
    panel.addControl(panelButton2);

    var gardenImage = new Image("GardenImage", "./assets/GardenImage.jpg");
    gardenImage.width = 0.6;
    gardenImage.height = "150px";
    gardenImage.paddingTop = 5;
    // gardenImage.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panelButton1.addControl(gardenImage);

    var button = Button.CreateSimpleButton("Scene 1", "Garden");
    button.width = 0.5;
    button.height = "45px";
    button.color = "white";
    button.paddingBottom = 6;
    button.paddingTop = 6;
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
    castleImage.width = 0.6;
    castleImage.height = "150px";
    castleImage.paddingTop = 5;
    panelButton2.addControl(castleImage);

    var button1 = Button.CreateSimpleButton("Scene 1", "Castle");
    button1.width = 0.5;
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
    closePanelBackground.background = "white";
    closePanelBackground.alpha = 0.6;
    closePanelBackground.zIndex = -1;
    panelCloseButton.addControl(closePanelBackground);
    panel.addControl(panelCloseButton);

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
