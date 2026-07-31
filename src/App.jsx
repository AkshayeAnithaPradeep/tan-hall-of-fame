import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './NavBar';
import YearSelector from './YearSelector';
import Notes from './Notes';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CheckIcon from '@mui/icons-material/Check';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CakeIcon from '@mui/icons-material/Cake';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import StarRateIcon from '@mui/icons-material/StarRate';
import { I1, I2, I3, I4, I5, I6, I7, I8, I9, I10, I11, I12 } from './images';
import { useMediaQuery } from 'react-responsive';
import ReactImageUploading from 'react-images-uploading';
const ImageUploading = ReactImageUploading.default || ReactImageUploading;
import imageCompression from 'browser-image-compression';
import 'react-photo-view/dist/react-photo-view.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const API_URL = 'https://qop32n6qtwcmpnj4cbkt4jevhy0qljvx.lambda-url.us-west-2.on.aws';

const PREFIX = 'App';

const classes = {
    root: `${PREFIX}-root`,
    add: `${PREFIX}-add`,
    extendedIcon: `${PREFIX}-extendedIcon`,
    iconText: `${PREFIX}-iconText`,
    imageWrapper: `${PREFIX}-imageWrapper`,
    radioColor: `${PREFIX}-radioColor`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.root}`]: {
        minHeight: '100%'
    },

    [`& .${classes.add}`]: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        margin: '40px'
    },

    [`& .${classes.extendedIcon}`]: {
        marginRight: theme.spacing(1)
    },

    [`& .${classes.iconText}`]: {
        paddingLeft: '10px',
        paddingTop: '5px'
    },

    [`& .${classes.imageWrapper}`]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    [`& .${classes.radioColor}`]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

const initialFormState = { name: '', description: '', image: '', color: '#ead454', icon: 'heart' };

export default function App () {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [image, setImage] = React.useState([]);
    const maxNumber = 1;
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    function dataURLtoFile (dataurl, filename) {
        var arr = dataurl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[arr.length - 1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onImageChange = async (imageList, addUpdateIndex) => {
        setImage(imageList);
        if (imageList.length > 0) {
            const imageOg = dataURLtoFile(imageList[addUpdateIndex]['data_url']);

            const options = {
                maxSizeMB: 0.2,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            };
            try {
                const compressedFile = await imageCompression(imageOg, options);
                const reader = new FileReader();
                reader.readAsDataURL(compressedFile);
                reader.onload = function () {
                    const base64String = reader.result;
                    setFormData({ ...formData, 'image': base64String });
                };
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.description) return;
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const newNote = await response.json();
        setNotes([ ...notes, newNote ]);
        setFormData(initialFormState);
        setImage([]);
        setOpen(false);
    };

    const fetchNotes = async () => {
        setLoading(true);
        const allItems = [];
        let nextToken = null;

        do {
            const url = nextToken ? `${API_URL}?nextToken=${encodeURIComponent(nextToken)}` : API_URL;
            const response = await fetch(url);
            const data = await response.json();
            allItems.push(...data.items);
            nextToken = data.nextToken;
        } while (nextToken);

        setNotes(allItems);
        setLoading(false);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const years = [...new Set(notes.map(n => new Date(n.createdAt).getFullYear()))]
        .sort((a, b) => b - a);

    const filterNotes = (note) => {
        let noteCreated = new Date(note.createdAt);
        return noteCreated.getFullYear() === selectedYear;
    };

    const backgrounds = [
        { mobile: I2, desktop: I1 },
        { mobile: I4, desktop: I3 },
        { mobile: I6, desktop: I5 },
        { mobile: I7, desktop: I8 },
        { mobile: I9, desktop: I10 },
        { mobile: I11, desktop: I12 },
    ];

    const pickBackgroundImage = () => {
        const yearIndex = years.length > 0 ? years.indexOf(selectedYear) : 0;
        const bg = backgrounds[yearIndex % backgrounds.length] || backgrounds[0];
        return isTabletOrMobile ? bg.mobile : bg.desktop;
    };

    return (
        <Root className={classes.root} id="root">
            <div className={classes.canvas} id={'canvas'} style={{
                backgroundImage: `url(${pickBackgroundImage()})`,
                backgroundSize: 'cover',
                opacity: 0.5,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'fixed',
                zIndex: -1,
                backgroundPositionX: 'center'
            }}/>
            <CssBaseline/>
            <NavBar />
            <YearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear} years={years}/>
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
                        onChange={e => setFormData({ ...formData, 'description': e.target.value })}
                    />
                    <DialogContentText>
                        Enter your name, nickname or however you want Tanya to remember you.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        type="name"
                        fullWidth
                        onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                    />
                    <DialogContentText>
                        Customize your note with colors and icons!
                    </DialogContentText>
                    <ToggleButtonGroup
                        value={formData.color}
                        exclusive
                        fullWidth
                        size="large"
                        onChange={e => setFormData({ ...formData, 'color': e.target.value })}
                        aria-label="note color"
                    >
                        <ToggleButton value="#ead454" sx={{
                            backgroundColor: '#ead454',
                            '&.Mui-selected': {
                                backgroundColor: '#ead454',
                                '&:hover': {
                                    backgroundColor: '#ead454'
                                }
                            },
                            '&:hover': {
                                backgroundColor: '#ead454'
                            }
                        }}><CheckIcon sx={{ visibility: formData.color === '#ead454' ? 'visible' : 'hidden' }}></CheckIcon></ToggleButton>
                        <ToggleButton value="#b6d7a8" sx={{
                            backgroundColor: '#b6d7a8',
                            '&.Mui-selected': {
                                backgroundColor: '#b6d7a8',
                                '&:hover': {
                                    backgroundColor: '#b6d7a8'
                                }
                            },
                            '&:hover': {
                                backgroundColor: '#b6d7a8'
                            }
                        }}><CheckIcon sx={{ visibility: formData.color === '#b6d7a8' ? 'visible' : 'hidden' }}></CheckIcon></ToggleButton>
                        <ToggleButton value="#eca2c4" sx={{
                            backgroundColor: '#eca2c4',
                            '&.Mui-selected': {
                                backgroundColor: '#eca2c4',
                                '&:hover': {
                                    backgroundColor: '#eca2c4'
                                }
                            },
                            '&:hover': {
                                backgroundColor: '#eca2c4'
                            }
                        }}><CheckIcon sx={{ visibility: formData.color === '#eca2c4' ? 'visible' : 'hidden' }}></CheckIcon></ToggleButton>
                        <ToggleButton value="#b1d3f6" sx={{
                            backgroundColor: '#b1d3f6',
                            '&.Mui-selected': {
                                backgroundColor: '#b1d3f6',
                                '&:hover': {
                                    backgroundColor: '#b1d3f6'
                                }
                            },
                            '&:hover': {
                                backgroundColor: '#b1d3f6'
                            }
                        }}><CheckIcon sx={{ visibility: formData.color === '#b1d3f6' ? 'visible' : 'hidden' }}></CheckIcon></ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                        value={formData.icon}
                        exclusive
                        fullWidth
                        size="large"
                        onChange={(e, newIcon) => setFormData({ ...formData, 'icon': newIcon || formData.icon })}
                        aria-label="note icon"
                    >
                        <ToggleButton value="heart"> <FavoriteBorderIcon/> </ToggleButton>
                        <ToggleButton value="cake"> <CakeIcon/> </ToggleButton>
                        <ToggleButton value="snow"> <AcUnitIcon/> </ToggleButton>
                        <ToggleButton value="song"> <MusicNoteIcon/> </ToggleButton>
                        <ToggleButton value="star"> <StarRateIcon/> </ToggleButton>
                    </ToggleButtonGroup>
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
                            dragProps
                        }) => (
                            (<div className="upload__image-wrapper">
                                <Button
                                    style={isDragging ? { color: 'red' } : { paddingLeft: '0' }}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    <AddAPhotoIcon/> <p className={classes.iconText}> Add a pic to share your favorite moment with Tanya! (Optional)</p>
                                </Button>
                                {imageList.map((image, index) => (
                                    <div key={index} className={[classes.imageWrapper, 'image-item'].join(' ')}>
                                        <img src={image['data_url']} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                            <Button onClick={() => onImageUpdate(index)}>Change</Button>
                                            <Button onClick={() => {
                                                setImage([]);
                                                onImageRemove(index);
                                            }}>Remove</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>)
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
        </Root>
    );
}
