//this is the top
import { Component } from "solid-js";
import { Properties } from "solid-js/web";
import { GameState, Point } from "./gameState";

export const GameSquare: Component<{
  state: GameState;
  point: Point;
  width: number;
}> = (props) => {
  const point = props.point;

  const isPieceMoving = () => {
    const activePiece = props.state.activePiece();
    return (
      activePiece &&
      activePiece.point.x === point.x &&
      activePiece.point.y === point.y
    );
  };

  const isYourPiece = () => {
    const activePiece = props.state.activePiece();
    return (
      activePiece &&
      activePiece.owner.id === props.state.turn()
    );
  };

  const isPossibleMove = () => props.state.isPossibleMove(point);

  const isHighlighted = () => isPieceMoving() || isPossibleMove();

  const highlightColor = () => isYourPiece() ? "green" : "red";
  
  const opacity = () => ((point.x + point.y) % 2 === 1 ? 1 : 0.3);

  const fill = () => (isHighlighted() ? highlightColor() : "gray");

  function clicked() {
    if (isPossibleMove()) {
      props.state.moveActivePiece(point);
      props.state.setActivePieceIndex(false);
    }
  }

  return (
    <rect
      onClick={clicked}
      fill={fill()}
      fill-opacity={opacity()}
      width={props.width}
      height={props.width}
      x={point.x * props.width}
      y={point.y * props.width}
    />
  );
};
