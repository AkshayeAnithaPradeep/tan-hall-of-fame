import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { loadingCat } from './images';
import Note from './Note';
import meow from './audio/meow.mp3';

export default function Notes(props) {
    const [height, setHeight] = useState(0);
    const [posY, setPosY] = useState('100px');
    const [scope, animate] = useAnimate();
    const ref = useRef(null);

    useEffect(() => {
        if (!props.loading) {
            setHeight(ref.current.clientHeight);
            let highest = -500;
            let lowest = window.innerWidth + (0.10 * window.innerWidth);
            let going = 'right';
            let posYTemp;
            animate(scope.current, { x: [-500, window.innerWidth + (0.10 * window.innerWidth)] }, {
                repeat: Infinity,
                duration: 20,
                repeatType: 'mirror',
                onUpdate: (latest) => {
                    let cat = document.getElementById('cat');
                    if (going === 'right') {
                        highest = latest > highest ? latest : highest;
                        if (latest < highest) {
                            going = 'left';
                            highest = -500;
                            cat.className = 'scale-x-[-1]';
                            posYTemp = `${Math.floor(Math.random() * height)}px`;
                            animate(scope.current, { y: posYTemp });
                        }
                    } else {
                        lowest = latest < lowest ? latest : lowest;
                        if (latest > lowest) {
                            going = 'right';
                            lowest = window.innerWidth + (0.10 * window.innerWidth);
                            cat.className = '';
                            posYTemp = `${Math.floor(Math.random() * height)}px`;
                            animate(scope.current, { y: posYTemp });
                        }
                    }
                    animate(scope.current);
                }
            });
        }
    });

    function playMeow() {
        var audio = document.getElementById('audio');
        audio.play();
    }

    if (props.loading) {
        return (
            <div className="relative flex flex-wrap justify-around pb-10 mt-[80px]" ref={ref}>
                <img id="cat" className="mx-auto rotate-180" src={loadingCat} alt="Loading cat animation" />
            </div>
        );
    } else {
        return (
            <div className="relative overflow-hidden pb-10 mt-[80px]" ref={ref}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-6 px-10 lg:gap-x-[80px]">
                    {props.notes.map((note, key) => <Note key={key} note={note} />)}
                </div>
                <motion.div
                    className="absolute left-0 top-[50px] hover:cursor-pointer"
                    ref={scope}
                    style={{ top: posY, WebkitTapHighlightColor: 'transparent' }}
                    onClick={playMeow}
                >
                    <img id="cat" src="https://www.kasandbox.org/programming-images/misc/cat-walk.gif" alt="Walking cat animation" />
                </motion.div>
                <audio id="audio" src={meow}></audio>
            </div>
        );
    }
}
