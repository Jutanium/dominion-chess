import { createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Owner, Piece } from "./Piece";
import { Player } from "./Players";


export interface Point {
  x: number;
  y: number;
}

export interface Turn {
  playerTurn: string
}


interface ActivePiece extends Piece {
  possibleMoves: Set<string>;
}

const stringifyPoint = (point: Point) => `${point.x},${point.y}`;

export function createGameState(
  startingDimension: number,
  startingPlayer: Player,
  secondPlayer: Player,
) {
  const [dimension, setDimension] = createSignal(startingDimension);


  const [pieces, setPieces] = createStore<ActivePiece[]>([]);

  const [activePieceIndex, setActivePieceIndex] = createSignal<number | false>(
    false
  );

  const [players, setPlayerData] = createStore<[Player, Player]>([startingPlayer, secondPlayer]);

  const [activePlayerIndex, setActivePlayerIndex] = createSignal<number>(0);

  const currentPlayer = () => players[activePlayerIndex()];

  const calculatePossibleMoves = (piece: Piece) => {
  
   const pointSet = new Set<string>();

   piece.moveOptions(piece).filter(isValidPoint).forEach(point => pointSet.add(stringifyPoint(point)));

   return pointSet;
  }

  function addPiece(piece: Piece, player: 0 | 1) {
    const newPiece: ActivePiece = {
      ...piece, 
      owner: player, 
      possibleMoves: calculatePossibleMoves(piece)
    }; 

    setPieces(pieces => [...pieces, newPiece]);
  }

  function moveActivePiece(moveTo: Point) {
    const pieceIndex = activePieceIndex();
    const playerIndex = activePlayerIndex();
    if (pieceIndex !== false && pieces[pieceIndex].owner === playerIndex) { 
      setPieces(pieceIndex, "point", moveTo);
      setPieces(pieceIndex, "possibleMoves", calculatePossibleMoves(pieces[pieceIndex]));
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


  function isActiveOwner(player: Owner) {
    return activePlayerIndex() === player;
  }

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

  function isPossibleMove(point: Point) {
    const movingPiece = activePiece();
    if (movingPiece) {
      return movingPiece.possibleMoves.has(stringifyPoint(point));
    }
    return false;
  }
  
  function finishTurn() {
    setActivePlayerIndex(prevIndex => (prevIndex + 1) % 2);
  }

  return {
    activePiece,
    addPiece,
    currentPlayer,
    dimension,
    finishTurn,
    isActiveOwner,
    isPossibleMove,
    isValidPoint,
    moveActivePiece,
    pieces,
    setActivePieceIndex,
    squaresArray,
  };
}

export type GameState = ReturnType<typeof createGameState>;
