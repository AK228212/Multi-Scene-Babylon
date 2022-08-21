import {
  AdvancedDynamicTexture,
  Button,
  Control,
  StackPanel,
} from "@babylonjs/gui";

export default class MultiSceneGUI {
  public advancedTexture: AdvancedDynamicTexture;
  constructor() {
    this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    this.multiScenesButtons();
  }

  public multiScenesButtons() {
    var panel = new StackPanel("ButtonContainer");
    panel.alpha = 0.8;
    panel.width = 0.1;
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.advancedTexture.addControl(panel);

    var button = Button.CreateSimpleButton("Scene 1", "Garden");
    button.width = 0.9;
    button.height = "45px";
    button.color = "white";
    button.paddingBottom = 6;
    button.paddingTop = 6;
    button.background = "black";
    panel.addControl(button);

    var button1 = Button.CreateSimpleButton("Scene 1", "Castle");
    button1.width = 0.9;
    button1.height = "40px";
    button1.color = "white";
    button1.background = "crimson";
    button1.paddingBottom = 6;
    panel.addControl(button1);
  }
}
