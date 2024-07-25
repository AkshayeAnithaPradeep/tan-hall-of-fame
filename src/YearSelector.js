import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import CheeseImage from './cheese.jpg';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundImage: `url(${CheeseImage})`,
        borderBottom: "5px groove red",
        position: "fixed",
        width: "100%",
        zIndex: 10,
        top: 77,
        [theme.breakpoints.down(572)]: {
            top: 43,
        }
    },
    selected: {
        backgroundColor: "white",
        '&:hover': {
            backgroundColor: "white"
        }
    },
    buttonContainer: {
        width: "100%",
        margin: "auto",
        padding: 5,
        display: "flex",
        justifyContent: "space-evenly"
    },
    title: {
        flexGrow: 1,
        textAlign: "center"
    }
}));

export default function YearSelector(props) {
    const classes = useStyles();

    const handleClick = (year) => {
        props.setSelectedYear(year);
    }

    return (
        <div className={classes.root}>
            <div className={classes.buttonContainer}>
                <Button id="button-2024" className={[props.selectedYear === 2024 ? classes.selected : false, classes.yearButton]} onClick={() => handleClick(2024)}> 2024 </Button>
                <Button id="button-2023" className={[props.selectedYear === 2023 ? classes.selected : false, classes.yearButton]} onClick={() => handleClick(2023)}> 2023 </Button>
                <Button id="button-2022" className={[props.selectedYear === 2022 ? classes.selected : false, classes.yearButton]} onClick={() => handleClick(2022)}> 2022 </Button>
                <Button id="button-2021" className={[props.selectedYear === 2021 ? classes.selected : false, classes.yearButton]} onClick={() => handleClick(2021)}> 2021 </Button>
                <Button id="button-2020" className={[props.selectedYear === 2020 ? classes.selected : false, classes.yearButton]} onClick={() => handleClick(2020)}> 2020 </Button>
            </div>
        </div>
    );
}
