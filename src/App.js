import React from 'react';
import styles from './App.module.css';

import { Cards } from "./components/cards/cards";
import { Chart } from "./components/chart/chart";
import { CountrySelector } from "./components/country-selector/country-selector";
import { Coronavirus } from "./components/coronavirus/coronavirus";
import { Covid19State } from "./context/covid-19-data";

const App = () => {
  return (
      <Covid19State>
        <div className={ styles.container }>
          <Coronavirus />
          <Cards />
          <CountrySelector />
          <Chart />
        </div>
      </Covid19State>
  );
};

export default App;
