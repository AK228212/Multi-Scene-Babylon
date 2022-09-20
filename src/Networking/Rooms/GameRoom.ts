import { Room } from "colyseus.js";
import Player from "../../player/Player";
import { StateHandlerSchema } from "../schema/StateHandlerSchema";
import { PlayerSchema } from "../schema/PlayerSchema";
import GardenScene from "../../Entities/GardenScene";
import CastleScene from "../../Entities/CastleScene";

export default class GameRoom {
  private room: Room<StateHandlerSchema>;
  private clientPlayer: Player;

  private game: GardenScene | CastleScene;

  constructor(level: GardenScene | CastleScene) {
    this.game = level;
    this.clientPlayer = this.game.player;
  }

  public async connect() {
    await this.initJoinOrCreateRoom();
    this.onMessage();
    this.onStateChange();
    this.onAddPlayers();
    this.onRemovePlayers();
  }

  private async initJoinOrCreateRoom() {
    this.room = await this.game.client.joinOrCreate<StateHandlerSchema>(
      "GameRoom"
    );
    console.log(this.room.sessionId, "joined", this.room.name);
  }

  private onMessage() {
    this.room.onMessage("key", (message) => {
      console.log(message);
    });
  }

  private onStateChange() {
    this.room.onStateChange((state: StateHandlerSchema) => {
      state.players.forEach((player: PlayerSchema, key: string) => {
        //updates other player if key does not equal to sessionID
        if (key !== this.room.sessionId) {
          this.game.updateOtherPlayer(player);
        }
      });
    });
  }

  private onAddPlayers() {
    this.room.state.players.onAdd = (player: PlayerSchema) => {
      console.log(player, "has been added at", player.sessionId);
      if (player.sessionId !== this.room.sessionId) {
        this.game.addNewOtherPlayer(player);
      }
    };
  }

  private onRemovePlayers() {
    this.room.state.players.onRemove = (player: PlayerSchema) => {
      console.log(player, "has been removed", player.sessionId);
      this.game.removeOtherPlayer(player);
    };
  }

  public updatePlayerToServer() {
    const pos = this.clientPlayer.getPosition();
    const dir = this.clientPlayer.getDirection();
    const keys = this.clientPlayer.controls.keys;

    this.room.send("playerPosition", { x: pos.x, y: pos.y, z: pos.z });
    this.room.send("playerDirection", { rotationY: dir.y });
    this.room.send("playerKey", {
      up: keys.up,
      right: keys.right,
      down: keys.down,
      left: keys.left,
      wave: keys.wave,
    });
  }
}
