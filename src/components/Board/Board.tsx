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
             squareState={squares[i]} 
             onClick={() => this.handleClick(i)}
            />;
  }

  private handleClick(i: any) {
    if(!this.isFinished) {
     
      let {squares, xIsNext}:any = this.state;
      
      if(squares[i] === null) {
        const squaresNew = squares.slice();
        console.log(squaresNew)
        const player =  xIsNext ? 'X' : 'O';
        squaresNew[i] = { value: player };
        const winnerSeq =  this.verifyWinner(squaresNew, player);

        this.isFinished = winnerSeq.length > 0;
       
        if(this.isFinished) {
          winnerSeq.map(v => {
            v.map(i => {
              squaresNew[i].squareClass = "square-green";
            })
          })

          this.props.onFinish(player);
        }

        this.setState({squares:squaresNew, xIsNext: !xIsNext})
      }
    }
  }

  private verifyWinner(squares: any, player: string) {
    return this.sequencesVictory
               .filter(sequenceArr => {
                 const[a, b, c] = sequenceArr;
                 const squareA = squares[a];
                 return squareA 
                        && squareA.value 
                        && squareA.value === squares[b]?.value 
                        && squareA.value === squares[c]?.value;
               });

  }
}
