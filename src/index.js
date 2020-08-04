import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: blue[500],
        },
        secondary: {
            main: pink["A400"],
        },
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
    },
});

function AppWithTheme() {
    return (
        <ThemeProvider theme={theme}><App/></ThemeProvider>
    );
}

ReactDOM.render(
    <AppWithTheme />, document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
