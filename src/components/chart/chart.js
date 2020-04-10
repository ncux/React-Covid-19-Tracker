import React, { useContext } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { Covid19Context } from "../../context/covid-19-data";
import styles from './chart.module.css';
import Loading from "../loading/loading";

export const Chart = props => {

    const { loading, dailyData, selectedCountry, selectedCountryData, global } = useContext(Covid19Context);

    const lineChart = (
        dailyData.length ? (
            <Line data={{
                labels: dailyData.map(data => data.reportDate),
                datasets: [
                    {
                        data: dailyData.map(data => data.totalConfirmed),
                        label: 'Confirmed cases',
                        borderColor: '#3333ff',
                        fill: true
                    },
                    {
                        data: dailyData.map(data => data.deaths.total),
                        label: 'Fatalities',
                        borderColor: '#ff0000',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true
                    }
                 ]
            }} />
        ) : (<Loading />)
    );

    const barChart = (
        selectedCountryData.length ? (
            <Bar data={{
                labels: ['Confirmed cases', 'Fatalities', 'Recovered'],
                datasets: [{
                    label: 'People',
                    data: [...selectedCountryData.map(data => data.value)],
                    backgroundColor: ['rgba(255, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)']
                }]
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Current situation in ${selectedCountry}` }
            }}
            />
        ): (<Loading />)
    );

    if(loading) return (<Loading />);

    return (
        <div className={ styles.container }>
            { !global && selectedCountry ? barChart : lineChart }
        </div>
    );

};

