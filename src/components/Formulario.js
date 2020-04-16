import React, {useState} from 'react'
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({busqueda, guardarBusqueda, guardarConsulta}) => {

    //State del Error
    const [error, guardarError] = useState(false);

    //Extraer ciudad y país
    const {ciudad, pais} = busqueda;

    //Función que coloca los elementos en el state
    const handleChange = e => {
        //Actualizar el state
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    //Función del submit
    const handleSubmit = e => {
        e.preventDefault();

        //Validar
        if(ciudad.trim() === '' || pais.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarConsulta(true);

        //Pasar al componente principal

    }

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje="TODOS LOS CAMPOS SON OBLIGATORIOS"/>: null}

            <div className="input-field col s12">
                <input 
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">-- Selecciona un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">País: </label>
            </div>
            <div className="input-field col s12">
                <button
                    type="submit"
                    value="Buscar Clima"
                    className="black waves-effect waves-light btn-large btn-block yellow accent-4 col s12 black-text"
                >Buscar Clima
                </button>
            </div>
        </form>
    );
}

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired,
    guardarConsulta: PropTypes.func.isRequired
}
 
export default Formulario;