import React, {useEffect, useState, useRef} from 'react';
import { motion, useAnimate } from "framer-motion"
import { makeStyles } from '@material-ui/core/styles';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
import Note from "./Note";
import meow from "./audio/meow.mp3";

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
        overflow: 'hidden',
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
    cat: {
        position: 'absolute',
        left: 0,
        top: 50,
        '&:hover': {
            cursor: 'pointer'
        }
    },
    catImageFlipped: {
        transform: 'rotateY(180deg)'
    },
    catImage: {
        transform: 'rotateY(0deg)'
    }
}));

export default function Notes(props) {
    const classes = useStyles();
    const [height, setHeight] = useState(0)
    const [posY, setPosY] = useState('100px');
    const [scope, animate] = useAnimate()
    const ref = useRef(null)

    useEffect(() => {
        setHeight(ref.current.clientHeight);
        let highest = -500, lowest = window.innerWidth+(0.10 * window.innerWidth), going = 'right';
        let posYTemp;
        animate(scope.current, {x:[-500, window.innerWidth+(0.10 * window.innerWidth)]} , { repeat: Infinity, duration: 20, repeatType: "mirror", onUpdate:(latest) => {
            let cat = document.getElementById("cat");
            if (going === 'right') {
                highest = latest > highest ? latest : highest;
                if (latest < highest) {
                    going = 'left';
                    highest = -500;
                    cat.className = classes.catImageFlipped;
                    posYTemp = `${Math.floor(Math.random() * height)}px`;
                    animate(scope.current, {y:posYTemp});
                }
            } else {
                lowest = latest < lowest ? latest : lowest;
                if ( latest > lowest) {
                    going = 'right';
                    lowest = window.innerWidth+(0.10 * window.innerWidth);
                    cat.className = classes.catImage;
                    posYTemp = `${Math.floor(Math.random() * height)}px`;
                    animate(scope.current, {y:posYTemp});
                }
            }
            animate(scope.current)
        } });
    });

    function playMeow() {
        var audio = document.getElementById("audio");
        audio.play();
      }

    return (
        <div className={classes.notes} ref={ref}>
            <PulseLoader
                css={override}
                size={10}
                color={"#f57f17"}
                loading={props.loading}
            />
            {props.notes.map((note, key) => <Note key={key} note={note}/> )}
            {/* <div className={classes.cat} id='cat-container'>
                <img id="cat" src="https://www.kasandbox.org/programming-images/misc/cat-walk.gif"/>
            </div> */}
            <motion.div className={classes.cat} ref={scope} style={{top: posY}} onClick={playMeow}>
                <img id="cat" src="https://www.kasandbox.org/programming-images/misc/cat-walk.gif"/>
            </motion.div >
            <audio id="audio" src={meow}></audio>
        </div>
    );
}
