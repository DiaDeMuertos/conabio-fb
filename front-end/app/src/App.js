import React, { Component } from 'react';
import Map from './componets/Map';

import './App.css';

class App extends Component {
  state = {
    basemap: null,
    poligonos: null,
    area: 0,
  };

  handlerOnBuscarAreaMayor = () => {
    const { area } = this.state;
    const apiUrl = `http://localhost:3000/api/areas/mayores/${area}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          const poligonos = data.payload;
          this.setState({ poligonos });
        }
      })
      .catch(error => console.log(error));
  };

  handlerOnChanage = ({ target: { value } }) => {
    this.setState({ area: value });
  };

  componentDidMount() {
    const apiUrl = 'http://localhost:3000/api/basemap/1';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          const basemap = data.payload.pop();
          this.setState({ basemap });
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    const { basemap, area, poligonos } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>Poligonos Areas</p>
          <div style={{ paddingBottom: '10px' }}>
            <button
              style={{ marginRight: '10px' }}
              onClick={this.handlerOnBuscarAreaMayor}
            >
              Buscar
            </button>
            <input type="text" value={area} onChange={this.handlerOnChanage} />
          </div>
          <Map basemap={basemap} poligonos={poligonos} />
        </header>
      </div>
    );
  }
}

export default App;
