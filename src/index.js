import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    console.log("Square: props: ", props);
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            nextPlayer: "O",
            winner: null
        };
        console.log("Board: constructor: initial state: ", this.state);
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        console.log("Board: handleClick: squares: ", squares);

        if(this.props.calcWinner(squares) || squares[i]) {
            this.render();
            return;
        }

        squares[i] = this.state.xIsNext? "X": "O";
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            nextPlayer: squares[i]=="X"? "O": "X"
        });
        console.log("Board: handleClick: state: ", this.state);
    } 

    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    render() {
        const winner = this.props.calcWinner(this.state.squares);
        console.log("calc winner: ", winner);
        let status;

        if(this.state.winner != null) {
            status = this.state.winner + " has already won!";
            console.log("already won msg: ", status);
        } else {
            if(winner != null) {
                status = 'Winner: ' + winner;
                this.state.winner = winner;
            } else {
                status = 'Next player: ' + this.state.nextPlayer;
            }
        }

        return this.getBoardDiv(status);
    }

    getBoardDiv(status) {
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
}

class Game extends React.Component {
    
    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for(let i=0; i<lines.length; i++) {
            const [a,b,c] = lines[i];
            if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board calcWinner={this.calculateWinner}/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById("root")
);