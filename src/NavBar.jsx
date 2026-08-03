import React from 'react';
import CheeseImage from './cheese.jpg';

export default function NavBar({ selectedYear, setSelectedYear, years, onAddNote }) {
    return (
        <div
            className="fixed top-0 w-full z-10 flex items-center justify-between px-6 py-3 pb-8"
            style={{
                backgroundImage: `url(${CheeseImage})`,
                maskImage: 'linear-gradient(to bottom, black 60%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent)',
            }}
        >
            <h1 className="font-['Acme',sans-serif] text-2xl sm:text-4xl">
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
                    onClick={onAddNote}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm transition-colors"
                >
                    + Add note
                </button>
            </div>
        </div>
    );
}
