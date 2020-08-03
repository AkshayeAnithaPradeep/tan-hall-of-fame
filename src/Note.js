import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import HeartImage from "./love.png"

const useStyles = makeStyles((theme) => ({
    note: {
        width: theme.spacing(50),
        height: theme.spacing(30),
        margin: theme.spacing(2),
        display: "flex",
        flexFlow: "column nowrap",
        backgroundColor: "#ead454",
        transform: "rotate(-3deg)"
    },
    noteMessage: {
        flexGrow: 5,
        color: "black",
        padding: theme.spacing(2.5),
        textAlign: "center",
        transform: "rotate(3deg)"
    },
    noteAuthor: {
        flexGrow: 1,
        padding: theme.spacing(1),
        transform: "rotate(3deg)",
        color: "black"
    },
    heart: {
        width: theme.spacing(2.5)
    }
}));

export default function Note(props) {
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.note}>
            <div className={classes.noteMessage}>
                <Typography variant="h4" gutterBottom>
                    {props.note.message}
                </Typography>
            </div>
            <div className={classes.noteAuthor}>
                <Typography variant="subtitle2" gutterBottom>
                    With <img className={classes.heart} src={HeartImage}></img> by {props.note.name}
                </Typography>
            </div>
        </Paper>
    );
}
