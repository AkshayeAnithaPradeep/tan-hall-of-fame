import React, { useState } from 'react';
import ReactImageUploading from 'react-images-uploading';
const ImageUploading = ReactImageUploading.default || ReactImageUploading;
import imageCompression from 'browser-image-compression';

const COLORS = ['#ead454', '#b6d7a8', '#eca2c4', '#b1d3f6'];

const ICONS = [
    { value: 'heart', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"/></svg> },
    { value: 'cake', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2m4.6 9.99-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01M18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z"/></svg> },
    { value: 'snow', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z"/></svg> },
    { value: 'song', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3z"/></svg> },
    { value: 'star', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.43 10 12 2l-2.43 8H2l6.18 4.41L5.83 22 12 17.31 18.18 22l-2.35-7.59L22 10z"/></svg> },
];

export default function AddNoteDialog({ onClose, onSubmit }) {
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({ name: '', description: '', image: '', color: '#ead454', icon: 'heart' });
    const [image, setImage] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    function dataURLtoFile(dataurl) {
        var arr = dataurl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[arr.length - 1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], 'image', { type: mime });
    }

    const onImageChange = async (imageList, addUpdateIndex) => {
        setImage(imageList);
        if (imageList.length > 0) {
            const imageOg = dataURLtoFile(imageList[addUpdateIndex]['data_url']);
            const options = { maxSizeMB: 0.2, maxWidthOrHeight: 1920, useWebWorker: true };
            try {
                const compressedFile = await imageCompression(imageOg, options);
                const reader = new FileReader();
                reader.readAsDataURL(compressedFile);
                reader.onload = function () {
                    setFormData(prev => ({ ...prev, image: reader.result }));
                };
            } catch (error) {
                console.log(error);
            }
        }
    };

    const canAdvance = formData.name.trim() && formData.description.trim();

    const handleSubmit = () => {
        if (submitting) return;
        setSubmitting(true);
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="bg-gray-900 rounded-xl w-full max-w-md mx-4 overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="px-6 pt-6 pb-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                            {page === 1 ? 'Write your note' : 'Customize'}
                        </h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                        </button>
                    </div>
                    {/* Step indicator */}
                    <div className="flex gap-2 mt-3">
                        <div className={`h-1 flex-1 rounded-full ${page >= 1 ? 'bg-white' : 'bg-gray-600'}`} />
                        <div className={`h-1 flex-1 rounded-full ${page >= 2 ? 'bg-white' : 'bg-gray-600'}`} />
                    </div>
                </div>

                {/* Page 1: Note & Name */}
                {page === 1 && (
                    <div className="p-6">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Your message to Tanya
                        </label>
                        <textarea
                            autoFocus
                            placeholder="Write something cheesy..."
                            className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-500 rounded-lg px-3 py-2 mb-5 min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            value={formData.description}
                        />

                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Your name
                        </label>
                        <input
                            type="text"
                            placeholder="Name, nickname, or alias"
                            className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            value={formData.name}
                        />
                    </div>
                )}

                {/* Page 2: Customization */}
                {page === 2 && (
                    <div className="p-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Pick a color
                        </label>
                        <div className="flex gap-3 mb-5">
                            {COLORS.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setFormData({ ...formData, color })}
                                    className="w-12 h-12 rounded-lg flex items-center justify-center border-2 transition-all"
                                    style={{ backgroundColor: color, borderColor: formData.color === color ? '#fff' : 'transparent' }}
                                >
                                    {formData.color === color && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                                    )}
                                </button>
                            ))}
                        </div>

                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Pick an icon
                        </label>
                        <div className="flex gap-3 mb-5">
                            {ICONS.map(icon => (
                                <button
                                    key={icon.value}
                                    onClick={() => setFormData({ ...formData, icon: icon.value })}
                                    className={`p-2.5 rounded-lg border-2 transition-all ${formData.icon === icon.value ? 'border-white bg-gray-700' : 'border-gray-600 hover:border-gray-400'} fill-gray-300`}
                                >
                                    {icon.svg}
                                </button>
                            ))}
                        </div>

                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Add a photo (optional)
                        </label>
                        <ImageUploading
                            value={image}
                            onChange={onImageChange}
                            maxNumber={1}
                            dataURLKey="data_url"
                        >
                            {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                <div>
                                    {imageList.length === 0 ? (
                                        <button
                                            className={`w-full border-2 border-dashed rounded-lg py-6 flex flex-col items-center gap-2 text-sm transition-colors ${isDragging ? 'border-red-400 text-red-500' : 'border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-300'}`}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M3 4V1h2v3h3v2H5v3H3V6H0V4zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2"/></svg>
                                            Tap to upload or drag a photo
                                        </button>
                                    ) : (
                                        imageList.map((img, index) => (
                                            <div key={index} className="flex flex-col items-center">
                                                <img src={img['data_url']} alt="" className="w-32 rounded-lg" />
                                                <div className="flex gap-3 mt-2">
                                                    <button onClick={() => onImageUpdate(index)} className="text-sm text-gray-300 hover:underline">Change</button>
                                                    <button onClick={() => { setImage([]); setFormData(prev => ({ ...prev, image: '' })); onImageRemove(index); }} className="text-sm text-red-400 hover:underline">Remove</button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </ImageUploading>
                    </div>
                )}

                {/* Footer */}
                <div className="px-6 pb-6 flex justify-between">
                    {page === 1 ? (
                        <>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setPage(2)}
                                disabled={!canAdvance}
                                className={`px-5 py-2 rounded-lg font-medium transition-colors ${canAdvance ? 'bg-white text-gray-900 hover:bg-gray-200' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                            >
                                Next
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setPage(1)}
                                className="px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"/></svg>
                                Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className={`px-5 py-2 rounded-lg font-medium transition-colors ${submitting ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900 hover:bg-gray-200'}`}
                            >
                                {submitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
