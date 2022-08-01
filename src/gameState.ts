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
  possibleMoves: Point[];
}

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

  const getPossibleMoves = (piece: Piece) => piece.moveOptions(piece).filter(isValidPoint)

  function addPiece(piece: Piece, player: 0 | 1) {
    const newPiece: ActivePiece = {
      ...piece, 
      owner: player, 
      possibleMoves: getPossibleMoves(piece)
    }; 

    setPieces(pieces => [...pieces, newPiece]);
  }

  function moveActivePiece(moveTo: Point) {
    const pieceIndex = activePieceIndex();
    const playerIndex = activePlayerIndex();
    if (pieceIndex !== false && pieces[pieceIndex].owner === playerIndex) { 
      setPieces(pieceIndex, "point", moveTo);
      setPieces(pieceIndex, "possibleMoves", getPossibleMoves(pieces[pieceIndex]));
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
      return movingPiece.possibleMoves.some((p) => p.x === point.x && p.y === point.y);
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
