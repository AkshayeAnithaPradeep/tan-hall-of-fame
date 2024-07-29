import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: indigo[500]
        },
        secondary: {
            main: pink['A400']
        }
    },
    typography: {
        h2: {
            fontFamily: "'Acme', sans-serif"
        },
        h6: {
            fontFamily: `'Indie Flower', cursive !important`
        },
        subtitle2: {
            fontFamily: "'Pacifico', cursive"
        }
    }
});

function AppWithTheme () {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}><App/></ThemeProvider>
        </StyledEngineProvider>
    );
}

ReactDOM.render(
    <AppWithTheme />, document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
