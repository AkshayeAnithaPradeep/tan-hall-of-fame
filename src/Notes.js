import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
import Note from "./Note";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: absolute;
  right: 50%;
`;


const useStyles = makeStyles((theme) => ({
    notes: {
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingBottom: theme.spacing(10),
        marginTop: theme.spacing(20),
        [theme.breakpoints.down(572)]: {
            marginTop: theme.spacing(25),
        },
        [theme.breakpoints.down(345)]: {
            marginTop: theme.spacing(35),
        }
    },
    title: {
        flexGrow: 1,
        textAlign: "center"
    },
}));

export default function Notes(props) {
    const classes = useStyles();

    return (
        <div className={classes.notes}>
            <PulseLoader
                css={override}
                size={10}
                color={"#f57f17"}
                loading={props.loading}
            />
            {props.notes.map((note, key) => <Note key={key} note={note}/> )}
        </div>
    );
}
