import React, { Fragment } from 'react'
import ChessBoard from './ChessBoard.js'
import './App.css';

const App = () => {
  return (
    <Fragment>
      <header className="App-header">
        <div>Start</div>
        <div>Chess Version 2</div>
        <div>Reset</div>
      </header>
      <body className="App-body">
        <div>
          <ChessBoard />
        </div>
      </body>
      <footer className="App-footer"><p>Developed by <a href="https://linkedin.com/in/ryan-watson-4a8690213" target="_blank">Ryan Watson</a></p></footer>
    </Fragment>
  );
}

export default App;
