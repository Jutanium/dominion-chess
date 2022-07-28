import { Point } from "./gameState";
import { Player } from "./Players";

export interface Piece {
    point: Point;
    icon: string;
    owner: Player;
    moveOptions: MoveOptions;
  }

export type MoveOptions = (piece: Piece) => Point[];

export const kingMoves: MoveOptions = (piece: Piece) => {
    return [
      { x: piece.point.x - 1, y: piece.point.y - 1 },
      { x: piece.point.x, y: piece.point.y - 1 },
      { x: piece.point.x + 1, y: piece.point.y - 1 },
      { x: piece.point.x - 1, y: piece.point.y },
      { x: piece.point.x + 1, y: piece.point.y },
      { x: piece.point.x - 1, y: piece.point.y + 1 },
      { x: piece.point.x, y: piece.point.y + 1 },
      { x: piece.point.x + 1, y: piece.point.y + 1 },
    ];
  };
  
  export const knightMoves: MoveOptions = (piece: Piece) => {
    return [
      { x: piece.point.x + 1, y: piece.point.y + 3 },
      { x: piece.point.x + 1, y: piece.point.y - 3},
      { x: piece.point.x - 1, y: piece.point.y + 3},
      { x: piece.point.x - 1, y: piece.point.y - 3},
      { x: piece.point.x + 3, y: piece.point.y + 1},
      { x: piece.point.x + 3, y: piece.point.y - 1},
      { x: piece.point.x - 3 , y: piece.point.y +1 },
      { x: piece.point.x - 3, y: piece.point.y - 1},
      
    ];
  };

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
  
