import { Schema, type, MapSchema } from "@colyseus/schema";

import {
  PlayerDirectionSchema,
  // PlayerFileNameSchema,
  PlayerKeySchema,
  PlayerPositionSchema,
  PlayerSchema,
} from "./playerSchema";

export class StateHandlerSchema extends Schema {
  @type({ map: PlayerSchema })
  players = new MapSchema<PlayerSchema>();

  addPlayer(sessionId: string) {
    this.players.set(
      sessionId,
      new PlayerSchema().assign({ sessionId: sessionId })
    );
  }

  getPlayer(sessionId: string): PlayerSchema {
    return this.players.get(sessionId);
  }

  removePlayer(sessionId: string) {
    this.players.delete(sessionId);
  }

  setDirection(sessionId: string, direction: PlayerDirectionSchema) {
    this.getPlayer(sessionId).playerDirection.rotationY = direction.rotationY;
  }

  setKeys(sessionId: string, keys: PlayerKeySchema) {
    const player = this.getPlayer(sessionId);
    player.playerKey.up = keys.up;
    player.playerKey.right = keys.right;
    player.playerKey.down = keys.down;
    player.playerKey.left = keys.left;
    player.playerKey.wave = keys.wave;
  }

  setPosition(sessionId: string, position: PlayerPositionSchema) {
    const player = this.getPlayer(sessionId);
    player.playerPosition.x = position.x;
    player.playerPosition.y = position.y;
    player.playerPosition.z = position.z;
  }

  // setFileName(sessionId: string, playerFileName: PlayerFileNameSchema) {
  //   this.getPlayer(sessionId).playerFileName.fileName = playerFileName.fileName;
  // }
}
