import React from 'react';
import Square from '../Square/Square';
import styles from './Board.module.scss';

export default class Board extends React.Component<any> {

  constructor(props: any) {
    super(props);
    this.setStartState();
  }

  private isFinished = false;
  readonly sequencesVictory: Array<number[]> = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],
    [1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ]

  render() {

    if(this.props.status==='restarted') {
      this.setStartState();
      this.props.onStart();
    }

    const { xIsNext }:any = this.state;
    const status = 'Next player: '+ ( xIsNext ? 'X' : 'O') ;
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }

  private setStartState() {
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      started: true
     }
     this.isFinished = false;
  }

  private renderSquare(i: number) {
    const {squares}:any = this.state;
    return <Square 
             value={squares[i]} 
             onClick={() => this.handleClick(i)}
            />;
  }

  private handleClick(i: any) {
    if(!this.isFinished) {
     
      let {squares, xIsNext}:any = this.state;
      
      if(squares[i] === null) {
        squares = squares.slice();
        const player =  xIsNext ? 'X' : 'O';
        squares[i] = player;
        this.setState({squares:squares, xIsNext: !xIsNext})
        this.isFinished = this.verifyWinner(squares, player);
        
        if(this.isFinished) {
          this.props.onFinish(player);
        }
      }
    }
  }

  private verifyWinner(squares: any, player: string) {
    let count = 0;
    const toWin = 3;
    this.sequencesVictory
        .forEach(sequenceArr => {
          if(count !== toWin) {
            count = 0;
            sequenceArr.forEach(position => {
              if(squares[position] === player) {
                count++;
              } else {
                count = 0;
              }
            })
          }
         });
    return count === toWin;
  }
}
