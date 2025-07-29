import React from 'react';
import { styled } from '@mui/material/styles';
import CheeseImage from './cheese.jpg';
import Button from '@mui/material/Button';

const PREFIX = 'YearSelector';

const classes = {
    root: `${PREFIX}-root`,
    selected: `${PREFIX}-selected`,
    yearButton: `${PREFIX}-yearButton`,
    buttonContainer: `${PREFIX}-buttonContainer`,
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
        top: 77,
        [theme.breakpoints.down(572)]: {
            top: 43
        }
    },

    [`& .${classes.selected}`]: {
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: 'white'
        }
    },

    [`& .${classes.yearButton}`]: {
        color: 'black'
    },

    [`& .${classes.buttonContainer}`]: {
        width: '100%',
        margin: 'auto',
        padding: 5,
        display: 'flex',
        justifyContent: 'space-evenly'
    },

    [`& .${classes.title}`]: {
        flexGrow: 1,
        textAlign: 'center'
    }
}));

export default function YearSelector (props) {
    const handleClick = (year) => {
        props.setSelectedYear(year);
    };

    return (
        <Root className={classes.root}>
            <div className={classes.buttonContainer}>
                <Button id="button-2024" className={[props.selectedYear === 2025 ? classes.selected : false, classes.yearButton]} onClick={() => handleClick(2025)}> 2025 </Button>
                <Button id="button-2024" className={[props.selectedYear === 2024 ? classes.selected : false, classes.yearButton]} onClick={() => handleClick(2024)}> 2024 </Button>
                <Button id="button-2023" className={[props.selectedYear === 2023 ? classes.selected : false, classes.yearButton]} onClick={() => handleClick(2023)}> 2023 </Button>
                <Button id="button-2022" className={[props.selectedYear === 2022 ? classes.selected : false, classes.yearButton]} onClick={() => handleClick(2022)}> 2022 </Button>
                <Button id="button-2021" className={[props.selectedYear === 2021 ? classes.selected : false, classes.yearButton]} onClick={() => handleClick(2021)}> 2021 </Button>
                <Button id="button-2020" className={[props.selectedYear === 2020 ? classes.selected : false, classes.yearButton]} onClick={() => handleClick(2020)}> 2020 </Button>
            </div>
        </Root>
    );
}
