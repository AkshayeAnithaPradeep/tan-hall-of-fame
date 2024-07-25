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
import {I1, I2, I3, I4, I5, I6, I7, I8, I9, I10} from "./images"
import { Amplify, API } from 'aws-amplify';
import { listMessages } from './graphql/queries';
import { createMessage as createMessageMutation } from './graphql/mutations';
import { useMediaQuery } from 'react-responsive'
import awsconfig from './aws-exports';
import ImageUploading from 'react-images-uploading';
import imageCompression from 'browser-image-compression';
import 'react-photo-view/dist/react-photo-view.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

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
    iconText: {
        paddingLeft: "10px",
        paddingTop: "5px"
    },
    imageWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

const initialFormState = { name: '', description: '', image: '' };

export default function App() {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [selectedYear, setSelectedYear] = useState(2024);
    const [image, setImage] = React.useState([]);
    const maxNumber = 1;
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onImageChange = async (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImage(imageList);
        if (imageList.length > 0) {
            const imageOg = dataURLtoFile(imageList[addUpdateIndex]['data_url']);
            console.log('originalFile instanceof Blob', imageOg instanceof Blob); // true
            console.log(`originalFile size ${imageOg.size / 1024 / 1024} MB`);

            const options = {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 1920,
            useWebWorker: true
            }
            try {
            const compressedFile = await imageCompression(imageOg, options);
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onload = function () {
                const base64String = reader.result;
                console.log(base64String); // Prints the Base64 string
                setFormData({ ...formData, 'image': base64String});
            };
            } catch (error) {
                console.log(error);
            } 
        }
    };

    const onImageRemove = (index) => {
        setImage([]);
    }

    const handleSubmit = async() => {
        if (!formData.name || !formData.description) return;
        await API.graphql({ query: createMessageMutation, variables: { input: formData } });
        formData["createdAt"] = new Date();
        setNotes([ ...notes, formData ]);
        setFormData(initialFormState);
        setImage([]);
        setOpen(false);
    };

    const fetchNotes = async() => {
        setLoading(true)
        const apiData = await API.graphql({ query: listMessages, variables: { limit: 500 } });
        setLoading(false)
        await setNotes(apiData.data.listMessages.items);
    }

    useEffect(() => {
        fetchNotes().then();
    }, []);

    const filterNotes = (note) => {
        let noteCreated = new Date(note.createdAt);
        return noteCreated.getFullYear() === selectedYear;
    }

    const pickBackgroundImage = () => {
        switch (selectedYear) {
            case 2024:
                return isTabletOrMobile ? I9 : I10;
            case 2023:
                return isTabletOrMobile ? I7 : I8;
            case 2022:
                return isTabletOrMobile ? I6 : I5;
            case 2021:
                return isTabletOrMobile ? I4 : I3;
            case 2020:
                return isTabletOrMobile ? I2 : I1;
            default:
                return isTabletOrMobile ? I2 : I1;
        }
    }

    return (
        <div className={classes.root} id="root">
            <div className={classes.canvas} id={"canvas"} style={{
                backgroundImage: `url(${pickBackgroundImage()})`,
                backgroundSize: "cover",
                opacity: 0.5,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'fixed',
                zIndex: -1,
                backgroundPositionX: "center"
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
                        Write a note to Tanya, on her birthday, to let her know how awesome she is.
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
                        Enter your name, nickname or however you want Tanya to remember you.
                    </DialogContentText>
                    <ImageUploading
                        value={image}
                        onChange={onImageChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                    >
                        {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                        }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            <Button
                            style={isDragging ? { color: 'red' } : {paddingLeft: "0"}}
                            onClick={onImageUpload}
                            {...dragProps}
                            >
                            <AddAPhotoIcon/> <p className={classes.iconText}> Add a pic to share your favorite moment with Tanya! </p>
                            </Button>
                            {imageList.map((image, index) => (
                            <div key={index} className={[classes.imageWrapper, "image-item"].join(" ")}>
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                <Button onClick={() => onImageUpdate(index)}>Change</Button>
                                <Button onClick={() => {
                                    setImage([]);
                                    onImageRemove(index)
                                }}>Remove</Button>
                                </div>
                            </div>
                            ))}
                        </div>
                        )}
                    </ImageUploading>
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