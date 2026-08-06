import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Carousel from './Carousel';
import Notes from './Notes';
import AddNoteDialog from './AddNoteDialog';
import { I1, I2, I3, I4, I5, I6, I7, I8, I9, I10, I11, I12, I13, I14 } from './images';
import { useMediaQuery } from 'react-responsive';
import 'react-photo-view/dist/react-photo-view.css';

const API_URL = 'https://qop32n6qtwcmpnj4cbkt4jevhy0qljvx.lambda-url.us-west-2.on.aws';

export default function App() {
    const [open, setOpen] = useState(false);
    const [showCarousel, setShowCarousel] = useState(true);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const handleSubmit = (formData) => {
        const optimisticNote = {
            ...formData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };
        setNotes([optimisticNote, ...notes]);
        setOpen(false);
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
    };

    const fetchNotes = async (year) => {
        setLoading(true);
        const response = await fetch(`${API_URL}?year=${year}`);
        const data = await response.json();
        setNotes(data.items);
        setLoading(false);
    };

    useEffect(() => {
        fetchNotes(selectedYear);
    }, [selectedYear]);

    const BASE_YEAR = 2020;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - BASE_YEAR + 1 }, (_, i) => currentYear - i);

    const backgrounds = [
        { mobile: I1, desktop: I2 },   // 2020
        { mobile: I3, desktop: I4 },   // 2021
        { mobile: I5, desktop: I6 },   // 2022
        { mobile: I7, desktop: I8 },   // 2023
        { mobile: I9, desktop: I10 },  // 2024
        { mobile: I11, desktop: I12 }, // 2025
        { mobile: I13, desktop: I14 }, // 2026
    ];

    const pickBackgroundImage = () => {
        const yearIndex = selectedYear - BASE_YEAR;
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
                onShowCarousel={() => setShowCarousel(true)}
            />
            {showCarousel && <Carousel onClose={() => setShowCarousel(false)} />}
            <Notes notes={[...notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))} loading={loading} />
            {open && <AddNoteDialog onClose={() => setOpen(false)} onSubmit={handleSubmit} />}
        </div>
    );
}
