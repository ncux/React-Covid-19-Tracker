import React, {useContext} from 'react';
import styles from './cards.module.css';
import cx from 'classnames';
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";

import { Covid19Context } from "../../context/covid-19-data";
import Loading from "../loading/loading";
import { timestampToDateConverter } from "../../utils/timeStampToDateConverter";

export const Cards = props => {

    const { loading, confirmedCases, recoveredCases, fatalities, lastUpdated } = useContext(Covid19Context);

    // console.log(confirmedCases);

    if(loading) return (<Loading/>);

    return (
        <div className={ styles.container }>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={ cx(styles.card, styles.infected) }>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={ confirmedCases.value } duration={2.0} separator="," />
                        </Typography>
                        <Typography color="textSecondary">{ timestampToDateConverter(lastUpdated) }</Typography>
                        <Typography variant="body2">Number of active cases</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={ cx(styles.card, styles.recovered) }>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={ recoveredCases.value } duration={2.0} separator="," />
                        </Typography>
                        <Typography color="textSecondary">{ timestampToDateConverter(lastUpdated) }</Typography>
                        <Typography variant="body2">Number of Recovered cases</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={ cx(styles.card, styles.fatalities) }>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Fatalities</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={ fatalities.value } duration={2.0} separator="," />
                        </Typography>
                        <Typography color="textSecondary">{ timestampToDateConverter(lastUpdated) }</Typography>
                        <Typography variant="body2">Number of fatalities</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );

};

