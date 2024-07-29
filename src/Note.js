import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import HeartImage from './love.png';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { PhotoProvider, PhotoView } from 'react-photo-view';

const useStyles = makeStyles((theme) => ({
    note: {
        width: theme.spacing(50),
        margin: theme.spacing(2),
        display: 'flex',
        flexFlow: 'column nowrap',
        backgroundColor: '#ead454',
        [theme.breakpoints.down(800)]: {
            width: theme.spacing(38)
        },
        [theme.breakpoints.down(600)]: {
            width: theme.spacing(40)
        },
        [theme.breakpoints.down(350)]: {
            width: theme.spacing(30)
        }
    },
    noteMessage: {
        flexGrow: 5,
        color: 'black',
        padding: `0 ${theme.spacing(2.5)}`,
        textAlign: 'center'
    },
    noteAuthor: {
        flexGrow: 1,
        padding: theme.spacing(1),
        color: 'black'
    },
    heart: {
        width: theme.spacing(2.5)
    },
    actionItems: {
        flexGrow: 0.5,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    actionButton: {
        padding: theme.spacing(1)
    },
    imageWrapper: {
    },
    noteImage: {
        maxWidth: '400px',
        padding: '25px'
    }
}));

export default function Note (props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let NoteMessage;
    if (props.note.name === 'Neethi Again') {
        NoteMessage = <Typography variant="h6" gutterBottom>
            <pre>{props.note.description}</pre>
        </Typography>;
    } else {
        NoteMessage = <Typography variant="h6" gutterBottom>
            {props.note.description}
        </Typography>;
    }

    let NotePhoto = '';
    if (props.note.image) {
        NotePhoto = <PhotoProvider>
            <PhotoView src={props.note.image}>
                <img src={props.note.image} alt="" />
            </PhotoView>
        </PhotoProvider>;
    }

    return (
        <Paper elevation={3} className={classes.note}>
            <div className={classes.actionItems}>
                <IconButton
                    aria-label="delete"
                    onClick={handleClickOpen}
                    className={classes.actionButton}
                    size="large">
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleClickOpen} size="large">
                    <DeleteIcon />
                </IconButton>
            </div>
            <div className={classes.noteMessage}>
                {NoteMessage}
            </div>
            {NotePhoto}
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
