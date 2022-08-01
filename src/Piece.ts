import { Point } from "./gameState";
import { Player } from "./Players";

export type Owner = -1 | 0 | 1;

export interface Piece {
    point: Point;
    icon: string;
    moveOptions: MoveOptions;
    owner: Owner
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
      { x: piece.point.x + 1, y: piece.point.y + 2 },
      { x: piece.point.x + 1, y: piece.point.y - 2},
      { x: piece.point.x - 1, y: piece.point.y + 2},
      { x: piece.point.x - 1, y: piece.point.y - 2},
      { x: piece.point.x + 2, y: piece.point.y + 1},
      { x: piece.point.x + 2, y: piece.point.y - 1},
      { x: piece.point.x - 2 , y: piece.point.y +1 },
      { x: piece.point.x - 2, y: piece.point.y - 1},
    ];
  };

export function createPiece(
    x,
    y,
    icon?: string,
    moveOptions?: MoveOptions
  ): Piece {
    return {
      point: { x, y },
      icon: icon || "🐻",
      moveOptions: moveOptions || (() => []),
      owner: -1
    };
  }
  
