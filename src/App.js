import React, {ReactDOM, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from "./NavBar";
import Notes from "./Notes";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import {I1, I2, I3, I4, I5, I6, I7} from "./images"
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100%",
    },
    add: {
        position: "fixed",
        bottom: 0,
        right: 0,
        margin: "40px",
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    canvas: {

    }
}));


export default function App() {
    const classes = useStyles()
    const [count, setCount] = useState(0)
    const Images = [I1, I2, I3, I4, I5, I6, I7]
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        axios.post('http://localhost:3000/notes', {
            message: message,
            name: name
        }).then(resp => {
            setMessage("");
            setName("");
            fetchNotes();
        }).catch(error => {
            console.log(error);
        });
        setOpen(false);
    };

    const fetchNotes = () => {
        setLoading(true)
        fetch('http://localhost:3000/notes')
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setNotes(data);
                setLoading(false)
            });
    }

    useEffect(() => {
        let s;
        fetchNotes();
        s = setInterval(() => {
            setCount(state => (state +1));
        }, 8000);
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    return (
        <div className={classes.root} id="root">
            <div className={classes.canvas} id={"canvas"} style={{
                backgroundImage: `url(${Images[count%7]})`,
                backgroundSize: "cover",
                opacity: 0.5,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'fixed',
                zIndex: -1,
                transition: "background-image 0.5s ease-in"
            }}/>
            <CssBaseline/>
            <NavBar />
            <Notes notes={notes} loading={loading}/>
            <Fab variant="extended" color="primary" aria-label="add" className={classes.add} onClick={handleClickOpen}>
                <AddIcon className={classes.extendedIcon} />
                Add new note
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Birthday Note</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Write a note to Tanya, on her birthday, to let her know how awesome she is. Please keep it short enough to fit on a sticky note!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="message"
                        label="Note"
                        fullWidth
                        multiline
                        onChange={handleMessageChange}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        type="name"
                        fullWidth
                        onChange={handleNameChange}
                    />
                    <DialogContentText>
                        Enter your name, nickname or however you want Tanya to remember you.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}