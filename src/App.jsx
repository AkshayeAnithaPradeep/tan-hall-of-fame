import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Notes from './Notes';
import { I1, I2, I3, I4, I5, I6, I7, I8, I9, I10, I11, I12 } from './images';
import { useMediaQuery } from 'react-responsive';
import ReactImageUploading from 'react-images-uploading';
const ImageUploading = ReactImageUploading.default || ReactImageUploading;
import imageCompression from 'browser-image-compression';
import 'react-photo-view/dist/react-photo-view.css';

const API_URL = 'https://qop32n6qtwcmpnj4cbkt4jevhy0qljvx.lambda-url.us-west-2.on.aws';

const initialFormState = { name: '', description: '', image: '', color: '#ead454', icon: 'heart' };

const COLORS = ['#ead454', '#b6d7a8', '#eca2c4', '#b1d3f6'];

const ICONS = [
    { value: 'heart', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"/></svg> },
    { value: 'cake', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2m4.6 9.99-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01M18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z"/></svg> },
    { value: 'snow', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z"/></svg> },
    { value: 'song', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3z"/></svg> },
    { value: 'star', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.43 10 12 2l-2.43 8H2l6.18 4.41L5.83 22 12 17.31 18.18 22l-2.35-7.59L22 10z"/></svg> },
];

export default function App() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [image, setImage] = React.useState([]);
    const maxNumber = 1;
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    function dataURLtoFile(dataurl, filename) {
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
        setNotes([...notes, newNote]);
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
        <div className="min-h-full">
            <div
                className="fixed inset-0 -z-1 bg-cover bg-center opacity-50"
                style={{ backgroundImage: `url(${pickBackgroundImage()})` }}
            />
            <NavBar
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                years={years}
                onAddNote={() => setOpen(true)}
            />
            <Notes notes={notes.filter(filterNotes)} loading={loading} />

            {/* Dialog */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setOpen(false)}>
                    <div className="bg-white rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Birthday Note</h2>

                            <p className="text-gray-600 text-sm mb-2">
                                Write a note to Tanya, on her birthday, to let her know how awesome she is.
                            </p>
                            <textarea
                                autoFocus
                                placeholder="Note"
                                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onChange={e => setFormData({ ...formData, 'description': e.target.value })}
                                value={formData.description}
                            />

                            <p className="text-gray-600 text-sm mb-2">
                                Enter your name, nickname or however you want Tanya to remember you.
                            </p>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                                value={formData.name}
                            />

                            <p className="text-gray-600 text-sm mb-2">
                                Customize your note with colors and icons!
                            </p>

                            {/* Color picker */}
                            <div className="flex gap-2 mb-3">
                                {COLORS.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setFormData({ ...formData, color })}
                                        className="w-10 h-10 rounded flex items-center justify-center border-2 transition-all"
                                        style={{ backgroundColor: color, borderColor: formData.color === color ? '#333' : 'transparent' }}
                                    >
                                        {formData.color === color && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Icon picker */}
                            <div className="flex gap-2 mb-4">
                                {ICONS.map(icon => (
                                    <button
                                        key={icon.value}
                                        onClick={() => setFormData({ ...formData, icon: icon.value })}
                                        className={`p-2 rounded border-2 transition-all ${formData.icon === icon.value ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-400'}`}
                                    >
                                        {icon.svg}
                                    </button>
                                ))}
                            </div>

                            {/* Image upload */}
                            <ImageUploading
                                value={image}
                                onChange={onImageChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps
                                }) => (
                                    <div>
                                        <button
                                            className={`flex items-center gap-2 text-sm ${isDragging ? 'text-red-500' : 'text-gray-600'} hover:text-indigo-500 transition-colors`}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M3 4V1h2v3h3v2H5v3H3V6H0V4zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2"/></svg>
                                            Add a pic to share your favorite moment with Tanya! (Optional)
                                        </button>
                                        {imageList.map((img, index) => (
                                            <div key={index} className="flex flex-col items-center mt-3">
                                                <img src={img['data_url']} alt="" className="w-24 rounded" />
                                                <div className="flex gap-2 mt-2">
                                                    <button onClick={() => onImageUpdate(index)} className="text-sm text-indigo-500 hover:underline">Change</button>
                                                    <button onClick={() => { setImage([]); onImageRemove(index); }} className="text-sm text-red-500 hover:underline">Remove</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ImageUploading>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 px-6 pb-6">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
