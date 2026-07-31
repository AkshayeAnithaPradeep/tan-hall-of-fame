import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CheeseImage from './cheese.jpg';

const PREFIX = 'NavBar';

const classes = {
    root: `${PREFIX}-root`,
    title: `${PREFIX}-title`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.root}`]: {
        flexGrow: 1,
        backgroundImage: `url(${CheeseImage})`,
        borderBottom: '5px groove red',
        position: 'fixed',
        width: '100%',
        zIndex: 10,
        top: 0
    },

    [`& .${classes.title}`]: {
        flexGrow: 1,
        textAlign: 'center',
        [theme.breakpoints.down(572)]: {
            fontSize: '2rem'
        }
    }
}));

export default function NavBar () {


    return (
        <Root className={classes.root}>
            <Typography variant="h2" className={classes.title}>
                Mac 'n' Cheese for Tanya
            </Typography>
        </Root>
    );
}
