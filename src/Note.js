import React from 'react';
import { styled } from '@mui/material/styles';
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
import Box from '@mui/material/Box';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { whatsappImage } from './images';

const PREFIX = 'Note';

const classes = {
    note: `${PREFIX}-note`,
    noteMessage: `${PREFIX}-noteMessage`,
    noteAuthor: `${PREFIX}-noteAuthor`,
    heartSymbol: `${PREFIX}-heartSymbol`,
    actionItems: `${PREFIX}-actionItems`,
    actionButton: `${PREFIX}-actionButton`,
    imageWrapper: `${PREFIX}-imageWrapper`,
    noteImage: `${PREFIX}-noteImage`,
    whatsapp: `${PREFIX}-whatsapp`
};

const StyledPaper = styled(Paper)((
    {
        theme
    }
) => ({
    [`&.${classes.note}`]: {
        width: theme.spacing(50),
        margin: theme.spacing(2),
        display: 'flex',
        flexFlow: 'column nowrap',
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

    [`& .${classes.noteMessage}`]: {
        flexGrow: 5,
        color: 'black',
        padding: `0 ${theme.spacing(2.5)}`,
        textAlign: 'center'
    },

    [`& .${classes.noteAuthor}`]: {
        flexGrow: 1,
        padding: theme.spacing(1),
        color: 'black'
    },

    [`& .${classes.heartSymbol}`]: {
        width: theme.spacing(2.5)
    },

    [`& .${classes.actionItems}`]: {
        flexGrow: 0.5,
        display: 'flex',
        justifyContent: 'flex-end'
    },

    [`& .${classes.actionButton}`]: {
        padding: theme.spacing(1)
    },

    [`& .${classes.imageWrapper}`]: {
    },

    [`& .${classes.noteImage}`]: {
        maxWidth: '400px',
        padding: '25px'
    },

    [`& .${classes.whatsapp}`]: {
        height: '10px',
        cursor: 'pointer'
    },

    [`.${classes.heart}`]: {
        backgroundImage: `url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3m-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05"></path></svg>')`
    }
}));

const getRandomElement = (arr) => {
  // Generate a random number between 0 (inclusive) and 1 (exclusive)
  const randomIndex = Math.floor(Math.random() * arr.length);

  // Return the element at the random index
  return arr[randomIndex];
}


const getBackgroundIcon = (iconName) => {
    switch (iconName) {
        case 'heart':
            return `url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3m-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05"></path></svg>')`;
        case 'cake':
            return `url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2m4.6 9.99-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01M18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9"></path></svg>')`;
        case 'snow':
            return `url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z"></path></svg>')`;
        case 'song':
            return `url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3z"></path></svg>')`;
        case 'moon':
            return `url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M12.34 2.02C6.59 1.82 2 6.42 2 12c0 5.52 4.48 10 10 10 3.71 0 6.93-2.02 8.66-5.02-7.51-.25-12.09-8.43-8.32-14.96"></path></svg>')`;
        case 'diamond':
            return `url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M12.16 3h-.32L9.21 8.25h5.58zm4.3 5.25h5.16L19 3h-5.16zm4.92 1.5h-8.63V20.1zM11.25 20.1V9.75H2.62zM7.54 8.25 10.16 3H5L2.38 8.25z"></path></svg>')`;
        case 'flower':
            return `url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M18.7 12.4c-.28-.16-.57-.29-.86-.4.29-.11.58-.24.86-.4 1.92-1.11 2.99-3.12 3-5.19-1.79-1.03-4.07-1.11-6 0-.28.16-.54.35-.78.54.05-.31.08-.63.08-.95 0-2.22-1.21-4.15-3-5.19C10.21 1.85 9 3.78 9 6c0 .32.03.64.08.95-.24-.2-.5-.39-.78-.55-1.92-1.11-4.2-1.03-6 0 0 2.07 1.07 4.08 3 5.19.28.16.57.29.86.4-.29.11-.58.24-.86.4-1.92 1.11-2.99 3.12-3 5.19 1.79 1.03 4.07 1.11 6 0 .28-.16.54-.35.78-.54-.05.32-.08.64-.08.96 0 2.22 1.21 4.15 3 5.19 1.79-1.04 3-2.97 3-5.19 0-.32-.03-.64-.08-.95q.36.3.78.54c1.92 1.11 4.2 1.03 6 0-.01-2.07-1.08-4.08-3-5.19M12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4"></path></svg>')`;
        case 'star':
            return `url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M14.43 10 12 2l-2.43 8H2l6.18 4.41L5.83 22 12 17.31 18.18 22l-2.35-7.59L22 10z"></path></svg>')`;
        default:
            return getBackgroundIcon(getRandomElement(['heart', 'cake', 'snow', 'song', 'moon', 'diamond', 'flower', 'star']));
    }
};

export default function Note (props) {
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
        <StyledPaper elevation={3} className={classes.note} sx={{
            backgroundImage: getBackgroundIcon(props.note.icon),
            backgroundBlendMode: 'overlay',
            backgroundColor: props.note.color || '#ead454',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: '50%'
        }}>
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
                    With <img className={classes.heartSymbol} src={HeartImage} alt=""></img> by {props.note.name}
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
                        <br/> <br/>
                        <a aria-label="Chat on WhatsApp" href="https://wa.me/9794227335"><Box component="img" className={classes.whatsapp} alt="Chat on WhatsApp" src={whatsappImage} sx = {{
                            height: '30px',
                            cursor: 'pointer'
                        }}/></a>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Okay
                    </Button>
                </DialogActions>
            </Dialog>
        </StyledPaper>
    );
}
