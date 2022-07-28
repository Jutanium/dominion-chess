import { createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Piece } from "./Piece";
import { Player } from "./Players";


export interface Point {
  x: number;
  y: number;
}

export interface Turn {
  playerTurn: string
}



export function createGameState(
  startingDimension: number,
  startingPieces: Piece[],
  players: Player[]
) {
  const [dimension, setDimension] = createSignal(startingDimension);

  const [pieces, setPieces] = createStore<Piece[]>(startingPieces);

  const [activePieceIndex, setActivePieceIndex] = createSignal<number | false>(
    false
  );

  const [turn, setTurn] = createSignal<string>(players[0].firstTurn ? players[0].id : players[1].id)

  function moveActivePiece(moveTo: Point) {
    const index = activePieceIndex();
    if (index !== false && pieces[index].owner.id === turn()) {
      setPieces(index, "point", moveTo);
      finishTurn();
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
  
  function finishTurn() {
    console.log(turn())
    setTurn(players[0].id === turn() ? players[1].id : players[0].id)

  }

  return {
    dimension,
    isValidPoint,
    squaresArray,
    setActivePieceIndex,
    activePiece,
    moveActivePiece,
    turn,
    pieces,
    isPossibleMove,
    finishTurn
  };
}

export type GameState = ReturnType<typeof createGameState>;
