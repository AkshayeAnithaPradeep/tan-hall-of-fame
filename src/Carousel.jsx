import React, { useState, useEffect } from 'react';
import img1 from './images/carousel/DSC06116.jpg';
import img2 from './images/carousel/DSC07202.jpg';
import img3 from './images/carousel/DSC07962.jpg';
import img4 from './images/carousel/DSC08371.jpg';
import img5 from './images/carousel/PRD00530.jpg';
import img6 from './images/carousel/PRD01480.jpg';
import img7 from './images/carousel/RAJ03375.jpg';
import img8 from './images/carousel/RAJ05009.jpg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function Carousel({ onClose }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const prev = () => setCurrent((current - 1 + images.length) % images.length);
    const next = () => setCurrent((current + 1) % images.length);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose}>
            <div className="bg-gray-900 rounded-xl max-w-3xl w-full mx-4 overflow-hidden relative" onClick={e => e.stopPropagation()}>
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 text-white/70 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-1.5 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>

                <div className="p-6 text-center">
                    <h2 className="font-['Acme',sans-serif] text-3xl sm:text-4xl text-white">
                        Life just got more cheesy!
                    </h2>
                </div>

                <div className="relative">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt=""
                            className={`w-full transition-opacity duration-700 ${index === current ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
                        />
                    ))}

                    <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${index === current ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-4 flex justify-center gap-4">
                    <a
                        href="https://photos.app.goo.gl/jwa2UdP7UsxH9eN67"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                    >
                        See more photos
                    </a>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
