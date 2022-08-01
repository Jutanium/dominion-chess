import { Component, createMemo, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import { GameSquare } from "./GameSquare";
import {
  createGameState,
  GameState,
} from "./gameState";
import { Piece, MoveOptions, createPiece, kingMoves, knightMoves } from "./Piece";
import { createPlayer } from "./Players";

const Game: Component<{ state: GameState }> = (props) => {
  const squareWidth = 10;

  const gridWidth = () => props.state.dimension() * squareWidth;
  const viewBox = () => `0 0 ${gridWidth()} ${gridWidth()}`;

  return (
    <svg class="w-full h-full" viewBox={viewBox()}>
      <For each={props.state.squaresArray()}>
        {(point, i) => (
          <GameSquare state={props.state} point={point} width={squareWidth} />
        )}
      </For>
      <For each={props.state.pieces}>
        {(piece, i) => (
          <text
            class="cursor-pointer"
            onClick={() => props.state.setActivePieceIndex(i())}
            font-size={squareWidth / 2 + "px"}
            dx={-squareWidth / 4 + "px"}
            dy={squareWidth / 6 + "px"}
            x={piece.point.x * squareWidth + squareWidth / 2}
            y={piece.point.y * squareWidth + squareWidth / 2}
          >
            {piece.icon}
          </text>
        )}
      </For>
    </svg>
  );
};


const player1 = createPlayer("Player1", 100);
const player2 = createPlayer("Player2", 100);

const App: Component = () => {

  const gameState = createGameState(10, player1, player2);

  gameState.addPiece(createPiece(1, 2, "🐻", kingMoves), 0);
  gameState.addPiece(createPiece(1, 3, "♞", knightMoves), 0);
  gameState.addPiece(createPiece(3, 6, "👑", kingMoves), 1);
  gameState.addPiece(createPiece(5, 3, "♘", knightMoves), 1);

  return (
    <>
    <div>{gameState.currentPlayer().name}</div>
    <div class="flex flex-col">
      <div class="w-100 h-100">
        <Game state={gameState} />
      </div>
    </div>
    </>
  );
};

export default App;
