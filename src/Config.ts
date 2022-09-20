export default class Config {
  // debugPlayer will draw the collision ellipsoid for the player
  public static debugPlayer = false;
  // showInspector will open up the BabylonJS inspector: https://doc.babylonjs.com/toolsAndResources/tools/inspector
  public static showInspector = false;
  // useNetworking can be disabled if you want to only develop client-side
  public static useNetworking = true;

  // this address currently hosts the game
  public static socketAddressProduction = "ws://p5e36e.colyseus.in/";
}
