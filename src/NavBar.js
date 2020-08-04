import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheeseImage from './cheese.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundImage: `url(${CheeseImage})`,
        borderBottom: "5px groove red",
        position: "fixed",
        width: "100%",
        zIndex: 10,
        top: 0
    },
    title: {
        flexGrow: 1,
        textAlign: "center"
    },
}));

export default function NavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h2" className={classes.title}>
                Mac 'n' Cheese for Tanya
            </Typography>
        </div>
    );
}
