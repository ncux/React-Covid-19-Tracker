import React, { useEffect, useReducer, createContext } from 'react';
import axios from 'axios';

import { Reducer } from "./reducer";
import {
    SET_COUNTRIES,
    SET_CURRENT_COVID19_DATA,
    SET_DAILY_COVID19_DATA, SET_GLOBAL_DATA,
    SET_LOADING,
    SET_SELECTED_COUNTRY,
    SET_SELECTED_COUNTRY_DATA
} from "./types";

const API_URL = 'https://covid19.mathdro.id/api';

const GlobalState = {
    loading: false,
    confirmedCases: [],
    recoveredCases: [],
    fatalities: [],
    lastUpdated: '',
    dailyData: [],
    countries: [],
    selectedCountry: '',
    selectedCountryData: [],  // for selected country's bar chart
    global: false
};

export const Covid19Context = createContext(GlobalState);

export const Covid19State = ({ children }) => {

    useEffect(() => {
        fetchCurrentCovid19Data();
    }, []);

    useEffect(() => {
        fetchDailyCovid19Data();
    }, []);

    useEffect(() => {
        fetchCountriesData();
    }, []);

    const [state, dispatch] = useReducer(Reducer, GlobalState);

    const fetchCurrentCovid19Data = async () => {
        try {
            const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(API_URL);
            setCurrentCovid19Data({ confirmed, recovered, deaths, lastUpdate });
        } catch (e) {
            console.log(e);
        }
    };

    const fetchDailyCovid19Data = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/daily`);
            setDailyCovid19Data(data);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchCountriesData = async () => {
        try {
            const { data: { countries } } = await axios.get(`${API_URL}/countries`);
            setCountriesData(countries);
        } catch (e) {
            console.log(e);
        }
    };

    const setLoading = () => dispatch({ type: SET_LOADING });

    const setCurrentCovid19Data = data => {
        setLoading();
        return dispatch({ type: SET_CURRENT_COVID19_DATA, payload: data });
    };

    const setDailyCovid19Data = data => {
        setLoading();
        return dispatch({ type: SET_DAILY_COVID19_DATA, payload: data });
    };

    const setCountriesData = data => {
        setLoading();
        return dispatch({ type: SET_COUNTRIES, payload: data });
    };

    const fetchSelectedCountryData = async country => {
        setLoading();
        console.log(country);
        if(country === 'global') {
            await fetchCurrentCovid19Data();
            setGlobalData();
            return;
        }
        const { data } = await axios.get(`${API_URL}/countries/${country}`);

        const { confirmed, recovered, deaths, lastUpdate } = data;
        setCurrentCovid19Data({ confirmed, recovered, deaths, lastUpdate }); // setting for one country in the cards
        setSelectedCountry(country);
        setSelectedCountryData({ confirmed, deaths, recovered });   // setting for one country in the chart
    };

    const setSelectedCountry = country => {
        setLoading();
        return dispatch({ type: SET_SELECTED_COUNTRY, payload: country });
    };

    const setSelectedCountryData = data => {
        setLoading();
        return dispatch({ type: SET_SELECTED_COUNTRY_DATA, payload: data });
    };

    const setGlobalData = () => {
        setLoading();
        return dispatch({ type: SET_GLOBAL_DATA });
    };


    return (
        <Covid19Context.Provider value={{
            loading: state.loading,
            confirmedCases: state.confirmedCases,
            recoveredCases: state.recoveredCases,
            fatalities: state.fatalities,
            lastUpdated: state.lastUpdated,
            dailyData: state.dailyData,
            countries: state.countries,
            selectedCountry: state.selectedCountry,
            selectedCountryData: state.selectedCountryData,
            global: state.global,
            fetchSelectedCountryData
        }}>
            { children }
        </Covid19Context.Provider>
    )

};
