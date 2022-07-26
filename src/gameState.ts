import { createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

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
  };
}

export interface Point {
  x: number;
  y: number;
}

export interface Piece {
  point: Point;
  icon: string;
  moveOptions: MoveOptions;
}

export type MoveOptions = (piece: Piece) => Point[];

export function createGameState(
  startingDimension: number,
  startingPieces: Piece[]
) {
  const [dimension, setDimension] = createSignal(startingDimension);

  const [pieces, setPieces] = createStore<Piece[]>(startingPieces);

  const [activePieceIndex, setActivePieceIndex] = createSignal<number | false>(
    false
  );

  function moveActivePiece(moveTo: Point) {
    const index = activePieceIndex();
    if (index !== false) {
      setPieces(index, "point", moveTo);
    }
  }

  const activePiece = () => {
    const index = activePieceIndex();
    if (index === false) {
      return false;
    }
    return pieces[index];
  };

  const squaresArray = createMemo(() =>
    Array.from({ length: dimension() ** 2 }, (_, i) => ({
      x: i % dimension(),
      y: Math.floor(i / dimension()),
    }))
  );

  function isValidPoint(point: Point) {
    return (
      point.x >= 0 &&
      point.x < dimension() &&
      point.y >= 0 &&
      point.y < dimension()
    );
  }

  const possibleMoves = () => {
    const movingPiece = activePiece();

    if (movingPiece) {
      const moves = movingPiece.moveOptions(movingPiece).filter(isValidPoint);
      return moves;
    }
    return [];
  };

  function isPossibleMove(point: Point) {
    return possibleMoves().some((p) => p.x === point.x && p.y === point.y);
  }

  return {
    dimension,
    isValidPoint,
    squaresArray,
    setActivePieceIndex,
    activePiece,
    moveActivePiece,
    pieces,
    isPossibleMove,
  };
}

export type GameState = ReturnType<typeof createGameState>;
