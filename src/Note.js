import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import HeartImage from "./love.png"
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    note: {
        width: theme.spacing(50),
        margin: theme.spacing(2),
        display: "flex",
        flexFlow: "column nowrap",
        backgroundColor: "#ead454",
        transform: "rotate(-3deg)"
    },
    noteMessage: {
        flexGrow: 5,
        color: "black",
        padding: `0 ${theme.spacing(2.5)}px`,
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
    },
    actionItems: {
        flexGrow: 0.5,
        display: "flex",
        justifyContent: "flex-end"
    },
    actionButton: {
        padding: theme.spacing(1)
    }
}));

export default function Note(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let NoteMessage;
    if (props.note.name === "Neethi Again") {
        NoteMessage = <Typography variant="h6" gutterBottom>
                        <pre>{props.note.description}</pre>
                    </Typography>;
    } else {
        NoteMessage = <Typography variant="h6" gutterBottom>
                        {props.note.description}
                    </Typography>;
    }


    return (
        <Paper elevation={3} className={classes.note}>
            <div className={classes.actionItems}>
                <IconButton aria-label="delete" onClick={handleClickOpen} className={classes.actionButton}>
                    <EditIcon  />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleClickOpen}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <div className={classes.noteMessage}>
                {NoteMessage}
            </div>
            <div className={classes.noteAuthor}>
                <Typography variant="subtitle2" gutterBottom>
                    With <img className={classes.heart} src={HeartImage} alt=""></img> by {props.note.name}
                </Typography>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Contact Akshaye to edit or delete a note.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Okay
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
