export interface IKeys {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  wave: boolean;
  selectFirstPersonCamera: boolean;
  selectThirdPersonCamera: boolean;
}

// used for receiving other player keys from server where we don't care about all keys
export interface IMoveKeys {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  wave: boolean;
}

export default class PlayerControls {
  public keys: IKeys = {
    up: false,
    down: false,
    left: false,
    right: false,
    wave: false,
    selectFirstPersonCamera: false,
    selectThirdPersonCamera: false,
  };

  constructor() {
    this.setupListeners();
  }

  private setupListeners() {
    window.onkeydown = (e: KeyboardEvent) => this.handleKey(e.code, true);
    window.onkeyup = (e: KeyboardEvent) => this.handleKey(e.code, false);
  }

  private handleKey(code: string, keydown: boolean) {
    switch (code) {
      case "KeyW":
      case "ArrowUp":
        this.keys.up = keydown;
        break;
      case "KeyA":
      case "ArrowLeft":
        this.keys.left = keydown;
        break;
      case "KeyS":
      case "ArrowDown":
        this.keys.down = keydown;
        break;
      case "KeyD":
      case "ArrowRight":
        this.keys.right = keydown;
        break;
      case "Digit1":
        this.keys.selectFirstPersonCamera = keydown;
        break;
      case "Digit2":
        this.keys.selectThirdPersonCamera = keydown;
        break;
      case "KeyF":
      case "KeyF":
        this.keys.wave = keydown;
    }
  }
}
