import React from 'react';
import Board from '../Board/Board';
import styles from './Game.module.scss';

/**
 * Game é o componente responsável por controlar o estado do jodo
 */
export default class Game extends React.Component<any> {
  constructor(props:any) {
    super(props);
    this.state = { gameState: "Play the game", status: 'started' }
  }

  finish = (winner: string) => {
    this.setState({gameState: `The winner is ${winner}`, status: 'finished'});
  }

  start = () => {
    this.setState({ gameState: "Play the game", status: 'started' });
  }

  restart = () => {
   this.setState({ gameState: "Play the game", status: 'restarted' });
  }

  render() {
    const { gameState, status}: any = this.state;
    return (
      <div className="game">
        <div className="game-board">
          <p>{gameState}</p>
          <Board onFinish={this.finish} status={status} onStart={this.start}/>
          <button onClick={this.restart}>Restart</button>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}