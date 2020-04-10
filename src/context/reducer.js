import {
    SET_LOADING,
    SET_CURRENT_COVID19_DATA,
    SET_DAILY_COVID19_DATA,
    SET_COUNTRIES,
    SET_SELECTED_COUNTRY, SET_SELECTED_COUNTRY_DATA, SET_GLOBAL_DATA
} from "./types";

export const Reducer = (state, action) => {

    switch (action.type) {
        case SET_LOADING:
            return { ...state,
                loading: true
            };

        case SET_CURRENT_COVID19_DATA:    // for the cards
            return { ...state,
                loading: false,
                confirmedCases: action.payload.confirmed,
                recoveredCases: action.payload.recovered,
                fatalities: action.payload.deaths,
                lastUpdated: action.payload.lastUpdate
            };

        case SET_DAILY_COVID19_DATA:    // for the global line chart
            return { ...state,
                loading: false,
                global: false,
                dailyData: [...action.payload]
            };

        case SET_COUNTRIES:   // for the country selector
            return { ...state,
                loading: false,
                countries: [...action.payload]
            };

        case SET_SELECTED_COUNTRY:
            return { ...state,
                loading: false,
                selectedCountry: action.payload
            };

        case SET_SELECTED_COUNTRY_DATA:
            const data = Object.values(action.payload);
            return { ...state,
                loading: false,
                selectedCountryData: [...data]
            };

        case SET_GLOBAL_DATA:
            return { ...state,
                loading: false,
                global: true
            };

        default:
            return state;
    }
};

