import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  //State de busqueda
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  const [consultar, guardarConsulta] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  //Extraer ciudad y país
  const {ciudad, pais} = busqueda;

  //UseEffect
  useEffect (() => {
    const consultarAPI = async () => {
      if(consultar){
        const appID = 'b4a7c363e115b27374acdea2297e2e45';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        
        guardarResultado(resultado);
        guardarConsulta(false);

        //Detecta si la ciudad introducida en la busqueda se pudo encontrar o no
        if(resultado.cod === "404"){
          guardarError(true);
        }else{
          guardarError(false);
        }
      }
    }
    consultarAPI();
    // eslint-disable-next-line
  }, [consultar]);

  let componente;
  if(error){
    componente = <Error mensaje="NO HAY RESULTADOS PARA TU BUSQUEDA" />
  }else{
    componente = <Clima 
                  resultado={resultado}
                />
  }

    return ( 
      <Fragment>
        <Header 
          titulo = 'Clima React App'
        />
        <div className="contenedor-form">
          <div className="container">
            <div className="row">
              <div className="col m6 sm2">
                <Formulario 
                  busqueda = {busqueda}
                  guardarBusqueda = {guardarBusqueda}
                  guardarConsulta = {guardarConsulta}
                />
              </div>
              <div className="col m6 sm2">
                {componente}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
}

export default App;