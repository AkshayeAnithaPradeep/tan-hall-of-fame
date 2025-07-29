import React, { useEffect, useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { motion, useAnimate } from 'framer-motion';
import { loadingCat } from './images';
import Note from './Note';
import meow from './audio/meow.mp3';
const PREFIX = 'Notes';

const classes = {
    notes: `${PREFIX}-notes`,
    loadingNotes: `${PREFIX}-loadingNotes`,
    title: `${PREFIX}-title`,
    cat: `${PREFIX}-cat`,
    catImageFlipped: `${PREFIX}-catImageFlipped`,
    catImage: `${PREFIX}-catImage`,
    loadingCat: `${PREFIX}-loadingCat`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.notes}`]: {
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingBottom: theme.spacing(10),
        marginTop: theme.spacing(20),
        [theme.breakpoints.down(572)]: {
            marginTop: theme.spacing(12)
        }
    },

    [`&.${classes.loadingNotes}`]: {
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingBottom: theme.spacing(10),
        marginTop: theme.spacing(16.125),
        [theme.breakpoints.down(572)]: {
            marginTop: theme.spacing(11.875)
        }
    },

    [`& .${classes.title}`]: {
        flexGrow: 1,
        textAlign: 'center'
    },

    [`& .${classes.cat}`]: {
        position: 'absolute',
        left: 0,
        top: 50,
        '&:hover': {
            cursor: 'pointer'
        }
    },

    [`& .${classes.catImageFlipped}`]: {
        transform: 'rotateY(180deg)'
    },

    [`& .${classes.catImage}`]: {
        transform: 'rotateY(0deg)'
    },

    [`& .${classes.loadingCat}`]: {
        margin: '0 auto',
        transform: 'rotate(180deg)'
    }
}));

export default function Notes (props) {
    const [height, setHeight] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [posY, setPosY] = useState('100px');
    const [scope, animate] = useAnimate();
    const ref = useRef(null);

    useEffect(() => {
        if (!props.loading) {
            setHeight(ref.current.clientHeight);
            let highest = -500; let lowest = window.innerWidth + (0.10 * window.innerWidth); let going = 'right';
            let posYTemp;
            animate(scope.current, { x: [-500, window.innerWidth + (0.10 * window.innerWidth)] }, { repeat: Infinity,
                duration: 20,
                repeatType: 'mirror',
                onUpdate: (latest) => {
                    let cat = document.getElementById('cat');
                    if (going === 'right') {
                        highest = latest > highest ? latest : highest;
                        if (latest < highest) {
                            going = 'left';
                            highest = -500;
                            cat.className = classes.catImageFlipped;
                            posYTemp = `${Math.floor(Math.random() * height)}px`;
                            animate(scope.current, { y: posYTemp });
                        }
                    } else {
                        lowest = latest < lowest ? latest : lowest;
                        if (latest > lowest) {
                            going = 'right';
                            lowest = window.innerWidth + (0.10 * window.innerWidth);
                            cat.className = classes.catImage;
                            posYTemp = `${Math.floor(Math.random() * height)}px`;
                            animate(scope.current, { y: posYTemp });
                        }
                    }
                    animate(scope.current);
                } });
        }
    });

    function playMeow () {
        var audio = document.getElementById('audio');
        audio.play();
    }

    if (props.loading) {
        return (
            <Root className={classes.loadingNotes} ref={ref}>
                <img id="cat" className={classes.loadingCat} src={loadingCat} alt="Loading cat animation"/>
            </Root>
        );
    } else {
        return (
            <Root className={classes.notes} ref={ref}>
                {props.notes.map((note, key) => <Note key={key} note={note}/>)}
                <motion.div className={classes.cat} ref={scope} style={{ top: posY, WebkitTapHighlightColor: 'transparent' }} onClick={playMeow}>
                    <img id="cat" src="https://www.kasandbox.org/programming-images/misc/cat-walk.gif" alt="Walking cat animation"/>
                </motion.div >
                <audio id="audio" src={meow}></audio>
            </Root>
        );
    }
}
