import React from 'react';
import CheeseImage from './cheese.jpg';

export default function NavBar({ selectedYear, setSelectedYear, years, onAddNote, onShowCarousel }) {
    return (
        <div
            className="fixed top-0 w-full z-10 flex items-center justify-between px-6 py-3 pb-8"
            style={{
                backgroundImage: `url(${CheeseImage})`,
                maskImage: 'linear-gradient(to bottom, black 60%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent)',
            }}
        >
            <h1 className="font-['Acme',sans-serif] text-2xl sm:text-4xl text-gray-900">
                Mac 'n' Cheese for Tanya
            </h1>
            <div className="flex items-center gap-3">
                <div className="relative">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="appearance-none bg-white/90 border border-gray-300 rounded-lg px-4 py-1.5 pr-8 text-sm font-medium shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                        {(years || []).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </div>
                <button
                    onClick={onShowCarousel}
                    className="bg-orange-700 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm transition-colors"
                >
                    <span className="hidden sm:inline">Wedding Bells</span>
                    <svg className="sm:hidden w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C9.24 2 7 4.24 7 7v4.17l-2 2V15h14v-1.83l-2-2V7c0-2.76-2.24-5-5-5zm0 20c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-8.83V7c0-3.08-2.17-5.64-5-6.32V0h-2v.68C7.17 1.36 5 3.92 5 7v6.17L3 15.17V17h18v-1.83l-3-2z"/></svg>
                </button>
                <button
                    onClick={onAddNote}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm transition-colors"
                >
                    <span className="hidden sm:inline">+ Add note</span>
                    <svg className="sm:hidden w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/></svg>
                </button>
            </div>
        </div>
    );
}
