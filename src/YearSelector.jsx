import React from 'react';
import CheeseImage from './cheese.jpg';

export default function YearSelector(props) {
    const years = props.years || [];

    return (
        <div
            className="fixed w-full z-10 top-[52px] sm:top-[68px] border-b-[5px] border-red-600"
            style={{ backgroundImage: `url(${CheeseImage})`, borderBottomStyle: 'groove' }}
        >
            <div className="flex justify-center p-2">
                <div className="relative">
                    <select
                        value={props.selectedYear}
                        onChange={(e) => props.setSelectedYear(Number(e.target.value))}
                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-1.5 pr-8 text-sm font-medium shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                    >
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
