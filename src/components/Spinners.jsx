import React from 'react';

export const CircleSpinner = props => {
    return (
        props.loading ?
        <div id="spinner_loading_wrapper">
          <div id="spinner">
            <svg xmlns="http://www.w3.org/2000/svg" width={props.width ? props.width : 64} viewBox="0 0 48 48">
              <circle cx="24" cy="4" r="4" fill="#fff" stroke="#333333" strokeWidth="1"/>
              <circle cx="12.19" cy="7.86" r="3.7" fill="#fff" stroke="#333333" strokeWidth="1"/>
              <circle cx="5.02" cy="17.68" r="3.4" fill="#fff" stroke="#333333" strokeWidth="1"/>
              <circle cx="5.02" cy="30.32" r="3.1" fill="#fff" stroke="#333333" strokeWidth="1"/>
              <circle cx="12.19" cy="40.14" r="2.8" fill="#fff" stroke="#333333" strokeWidth="1"/>
              <circle cx="24" cy="44" r="2.5" fill="#fff" stroke="#333333" strokeWidth="1"/>
              <circle cx="35.81" cy="40.14" r="2.2" fill="#fff" stroke="#333333" strokeWidth="1"/>
              <circle cx="42.98" cy="30.32" r="1.9" fill="#fff" stroke="#333333" strokeWidth="1"/>
              <circle cx="42.98" cy="17.68" r="1.6" fill="#fff" stroke="#333333" strokeWidth="1"/>
              <circle cx="35.81" cy="7.86" r="1.3" fill="#fff" stroke="#333333" strokeWidth="1"/>
            </svg>
            <h4>Cargando</h4>
          </div>
        </div> : null
    );
}

export const NormalSpinner = props => {
  return <div className="spinner"></div>
}