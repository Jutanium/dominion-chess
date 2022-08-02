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
      activePiece && props.state.isActiveOwner(activePiece.owner)
    );
  };

  const isPossibleMove = () => props.state.isPossibleMove(point);

  const isHighlighted = () => isPieceMoving() || isPossibleMove();

  const isDark = () => (point.x + point.y) % 2 === 1;

  const highlightColor = () =>
    `url(#pattern-${isYourPiece() ? 'valid' : 'invalid'}-${
      isDark() ? 'dark' : 'light'
    })`;

  const fill = () =>
    isHighlighted()
      ? highlightColor()
      : `${isDark() ? 'gray' : 'rgba(128, 128, 128, 0.3)'}`;

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
      width={props.width}
      height={props.width}
      x={point.x * props.width}
      y={point.y * props.width}
    />
  );
};
