import React from 'react';
import { styled } from '@mui/material/styles';
import CheeseImage from './cheese.jpg';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const PREFIX = 'YearSelector';

const classes = {
    root: `${PREFIX}-root`,
    selectContainer: `${PREFIX}-selectContainer`,
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

    [`& .${classes.selectContainer}`]: {
        width: '100%',
        margin: 'auto',
        padding: 5,
        display: 'flex',
        justifyContent: 'center'
    },
}));

export default function YearSelector (props) {
    const years = props.years || [];

    return (
        <Root className={classes.root}>
            <div className={classes.selectContainer}>
                <Select
                    value={props.selectedYear}
                    onChange={(e) => props.setSelectedYear(e.target.value)}
                    size="small"
                    sx={{ backgroundColor: 'white', minWidth: 100 }}
                >
                    {years.map(year => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                </Select>
            </div>
        </Root>
    );
}
