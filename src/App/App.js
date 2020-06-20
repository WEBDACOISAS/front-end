import React, { Component } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client'

class App extends Component {

  constructor(){
    super()

    this.state = {
      serverURL: 'http://localhost:4000',
      informationReceived: 'Nothing yet! You should click on the button!'
    }

    const socket = socketIOClient(this.state.serverURL)
    socket.on('infoEvent', (receivedInfo) => {
      this.setState({
        informationReceived: receivedInfo
      })
    })
  }

  emitInfoToAll = () => {

    const socket = socketIOClient(this.state.serverURL)

    socket.emit('infoEvent', 'Hello realtime connected users!')

  }

  render() {
    return (
      <div>
        <header>
          <h1>teste</h1>
        </header>
        <p>
          <button onClick={() => this.emitInfoToAll()}>Send information to all connected clients.</button>
        </p>

        <br/><br/>

        {
          this.state.informationReceived
        }

      </div>
    );
  }
}

export default App;