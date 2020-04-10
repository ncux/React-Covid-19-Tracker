import React from 'react';
import styles from './coronavirus.module.css';
import coronavirus from '../../assets/images/covid-19.png';

export const Coronavirus = props => {

    return (
        <img src={ coronavirus } className={ styles.coronavirus } alt='coronavirus' />
    );

};

