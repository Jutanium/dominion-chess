import { Point } from "./gameState";
import { Player } from "./Players";

export interface Piece {
    point: Point;
    icon: string;
    owner: Player;
    moveOptions: MoveOptions;
  }

export type MoveOptions = (piece: Piece) => Point[];

export function createPiece(
    x,
    y,
    owner: Player,
    icon?: string,
    moveOptions?: MoveOptions
  ): Piece {
    return {
      point: { x, y },
      icon: icon || "🐻",
      owner: owner,
      moveOptions: moveOptions || (() => []),
    };
  }
  
