import React, { useContext } from 'react';
import styles from './country-selector.module.css'
import { NativeSelect, FormControl } from "@material-ui/core";

import { Covid19Context } from "../../context/covid-19-data";
import Loading from "../loading/loading";

export const CountrySelector = props => {

    const { countries, fetchSelectedCountryData } = useContext(Covid19Context);

    if(!countries.length) return (<Loading />);

    if(countries.length) {
        const countriesList = countries.map(country => country.name);
        return (
            <FormControl className={ styles.formControl }>
                <NativeSelect onChange={ event => fetchSelectedCountryData(event.target.value) } defaultValue="">
                    <option value="global">Worldwide</option>
                    { countriesList.map((country, i) => (<option key={i} value={country}>{ country }</option>)) }
                </NativeSelect>
            </FormControl>
        );
    }

};

