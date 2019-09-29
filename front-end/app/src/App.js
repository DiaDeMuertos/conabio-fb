import React, { Component } from 'react';
import Map from './componets/Map';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import './App.css';

class App extends Component {
  /**
   * Estado iniciar de las variables.
   */
  state = {
    basemap: null,
    poligonos: null,
    fetching: false,
    area: 0,
  };

  /**
   * Funcino handler que se encarga de la accion
   * para el boton buscar.
   */
  handlerOnBuscarAreaMayor = () => {
    const { area } = this.state;
    const apiUrl = `http://localhost:3000/api/areas/mayores/${area}`;

    this.setState({ fetching: true });

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          const poligonos = data.payload;
          this.setState({ poligonos, fetching: false });
        }
      })
      .catch(error => console.log(error));
  };

  /**
   * Funcion hander que se encarga de la accoin del text input.
   */
  handlerOnChanage = ({ target: { value } }) => {
    this.setState({ area: value });
  };

  /**
   * Funcion que se encarga que cargar el mapabase solo una vez.
   */
  componentDidMount() {
    const apiUrl = 'http://localhost:3000/api/basemap/1';

    this.setState({ fetching: true });

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          const basemap = data.payload.pop();
          this.setState({ basemap, fetching: false });
        }
      })
      .catch(error => console.log(error));
  }

  /**
   * Funcion que se encarga de hacer el render.
   *
   */
  render() {
    const { basemap, area, poligonos, fetching } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div style={{ position: 'relative', top: 100, left: 50 }}></div>
          <p>Poligonos Areas</p>
          <div className="button-input">
            <button
              className="button-rs"
              onClick={this.handlerOnBuscarAreaMayor}
            >
              Buscar
            </button>
            <input type="text" value={area} onChange={this.handlerOnChanage} />
          </div>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            visible={fetching}
          />
          {!fetching && <Map basemap={basemap} poligonos={poligonos} />}
        </header>
      </div>
    );
  }
}

export default App;
