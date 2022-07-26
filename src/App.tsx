import { Component, createMemo, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import { GameSquare } from "./GameSquare";
import {
  createGameState,
  createPiece,
  GameState,
  MoveOptions,
  Piece,
} from "./gameState";

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

const moveSurrounding: MoveOptions = (piece: Piece) => {
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

const App: Component = () => {
  const startingPieces = [
    createPiece(1, 2, "🐻", moveSurrounding),
    createPiece(1, 3),
    createPiece(3, 6),
  ];

  const gameState = createGameState(10, startingPieces);

  return (
    <div class="flex flex-col">
      <div class="w-100 h-100">
        <Game state={gameState} />
      </div>
    </div>
  );
};

export default App;
