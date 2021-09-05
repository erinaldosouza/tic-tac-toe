import React from 'react';
import styles from './Square.module.scss';

function square(props: any) {
  console.log(props.squareState)
  return (
    <button className={props.squareState?.squareClass 
                       ? props.squareState?.squareClass  : "square"} 
            onClick={props.onClick}>
        {props.squareState?.value}
    </button>
  );
}

export default square;
/*
export default class Square extends React.Component<any> {


  constructor(props:any) {
    super(props)
    this.state = { value: null }
  }
  
  render() {
    return (
      <button className="square" 
              onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
*/
