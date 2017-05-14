import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Editor, RichUtils, EditorState } from 'draft-js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state={ editorState: EditorState.createEmpty() }
    this.onChange=(editorState) => { this.setState({ editorState }) }
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this._onBoldClick = this._onBoldClick.bind(this)
    this._onItalicClick = this._onItalicClick.bind(this)
  }

  handleKeyCommand(command) {
    console.log(command)
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if(newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }

  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Editor
          onChange={ this.onChange }
          handleKeyCommand={this.handleKeyCommand}
          editorState={ this.state.editorState } />
        <button onClick={this._onBoldClick}>BOLD</button>
        <button onClick={this._onItalicClick}>ITALIC</button>
      </div>
    );
  }
}

export default App;


