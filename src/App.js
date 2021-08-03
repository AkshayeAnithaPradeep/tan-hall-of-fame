import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from "./NavBar";
import YearSelector from "./YearSelector";
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
import Amplify, { API } from 'aws-amplify';
import { listMessages } from './graphql/queries';
import { createMessage as createMessageMutation } from './graphql/mutations';
import { useMediaQuery } from 'react-responsive'
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

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

const initialFormState = { name: '', description: '' }

export default function App() {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [selectedYear, setSelectedYear] = useState(2021);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    let Images = []
    if(isTabletOrMobile){
        Images = [I4, I6, I7]
    } else {
        Images = [I1, I2, I3, I5]
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async() => {
        if (!formData.name || !formData.description) return;
        await API.graphql({ query: createMessageMutation, variables: { input: formData } });
        formData["createdAt"] = new Date();
        setNotes([ ...notes, formData ]);
        setFormData(initialFormState);
        setOpen(false);
    };

    const fetchNotes = async() => {
        setLoading(true)
        const apiData = await API.graphql({ query: listMessages });
        setLoading(false)
        await setNotes(apiData.data.listMessages.items);
    }

    useEffect(() => {
        let s;
        fetchNotes().then(() => {
            console.log(notes)
        });
        // s = setInterval(() => {
        //     setCount(state => (state +1));
        // }, 8000);
    }, []);

    const filterNotes = (note) => {
        let noteCreated = new Date(note.createdAt);
        return noteCreated.getFullYear() === selectedYear
    }

    return (
        <div className={classes.root} id="root">
            <div className={classes.canvas} id={"canvas"} style={{
                backgroundImage: `url(${isTabletOrMobile? I7: I2})`,
                backgroundSize: "cover",
                opacity: 0.5,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'fixed',
                zIndex: -1
            }}/>
            <CssBaseline/>
            <NavBar />
            <YearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>
            <Notes notes={notes.filter(filterNotes)} loading={loading}/>
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
                        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        type="name"
                        fullWidth
                        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
                    />
                    <DialogContentText>
                        Enter your name, nickname or however you want Tanya to remember you. okay?
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