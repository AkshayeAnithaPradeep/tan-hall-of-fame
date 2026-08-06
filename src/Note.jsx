import React from 'react';
import HeartImage from './love.png';
import { PhotoProvider, PhotoView } from 'react-photo-view';

const getBackgroundIcon = (iconName) => {
    switch (iconName) {
        case 'heart':
            return `url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"/></svg>')`;
        case 'cake':
            return `url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2m4.6 9.99-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01M18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z"/></svg>')`;
        case 'snow':
            return `url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z"/></svg>')`;
        case 'song':
            return `url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3z"/></svg>')`;
        case 'star':
            return `url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M14.43 10 12 2l-2.43 8H2l6.18 4.41L5.83 22 12 17.31 18.18 22l-2.35-7.59L22 10z"/></svg>')`;
        default:
            const icons = ['heart', 'cake', 'snow', 'song', 'star'];
            return getBackgroundIcon(icons[Math.floor(Math.random() * icons.length)]);
    }
};

export default function Note(props) {
    const [open, setOpen] = React.useState(false);
    const hasImage = !!props.note.image;

    let NoteMessage;
    if (props.note.name === 'Neethi Again') {
        NoteMessage = <pre className="font-['Indie_Flower',cursive] text-lg text-black whitespace-pre-wrap">{props.note.description}</pre>;
    } else {
        NoteMessage = <p className="font-['Indie_Flower',cursive] text-lg text-black">{props.note.description}</p>;
    }

    if (hasImage) {
        return (
            <div className="w-[calc(25%-60px)] min-w-[280px] rounded-xl shadow-lg overflow-hidden bg-white flex flex-col relative">
                <button onClick={() => setOpen(true)} className="absolute top-2 right-2 p-1.5 bg-white/70 hover:bg-white rounded-full shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"/></svg>
                </button>
                <PhotoProvider>
                    <PhotoView src={props.note.image}>
                        <img
                            src={props.note.image}
                            alt=""
                            className="w-full cursor-pointer hover:opacity-90 transition-opacity"
                        />
                    </PhotoView>
                </PhotoProvider>
                <div
                    className="p-5 flex-grow flex flex-col justify-between"
                    style={{
                        backgroundImage: getBackgroundIcon(props.note.icon),
                        backgroundBlendMode: 'overlay',
                        backgroundColor: props.note.color || '#ead454',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        backgroundSize: '40%',
                    }}
                >
                    <div className="mb-3">
                        {NoteMessage}
                    </div>
                    <p className="font-['Pacifico',cursive] text-sm text-black">
                        With <img className="w-4 inline" src={HeartImage} alt="" /> by {props.note.name}
                    </p>
                </div>
                {open && <ContactDialog onClose={() => setOpen(false)} />}
            </div>
        );
    }

    return (
        <div
            className="w-[calc(25%-60px)] min-w-[280px] p-5 rounded-xl shadow-lg flex flex-col items-center justify-center text-center relative"
            style={{
                backgroundImage: getBackgroundIcon(props.note.icon),
                backgroundBlendMode: 'overlay',
                backgroundColor: props.note.color || '#ead454',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: '50%',
            }}
        >
            <button onClick={() => setOpen(true)} className="absolute top-2 right-2 p-1.5 hover:bg-black/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"/></svg>
            </button>
            <div className="mb-3 flex-grow flex items-center">
                {NoteMessage}
            </div>
            <p className="font-['Pacifico',cursive] text-sm text-black">
                With <img className="w-4 inline" src={HeartImage} alt="" /> by {props.note.name}
            </p>
            {open && <ContactDialog onClose={() => setOpen(false)} />}
        </div>
    );
}

function ContactDialog({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="bg-gray-900 rounded-xl p-6 max-w-sm mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-semibold text-white mb-2">Edit or delete a note?</h3>
                <p className="text-gray-400 text-sm mb-5">
                    Contact Akshaye and he'll take care of it.
                </p>
                <div className="flex flex-col gap-3">
                    <a
                        href="https://wa.me/9794227335"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span className="text-white font-medium">WhatsApp</span>
                    </a>
                    <a
                        href="mailto:akshaye07@gmail.com?subject=Edit%20my%20note%20on%20Mac%20n%20Cheese%20for%20Tanya"
                        className="flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#EA4335">
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        <span className="text-white font-medium">Gmail</span>
                    </a>
                </div>
                <div className="mt-5 text-right">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
