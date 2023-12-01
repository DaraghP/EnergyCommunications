import React from 'react';
import './App.css';

// Date Selector component takes in props from Agenda in order to set active date
const DateSelector = ({activeDate, setActiveDate}) => {
    const dates = ['NOV 1st', 'NOV 2nd', 'NOV 3rd', 'NOV 4th', 'NOV 5th', 'NOV 6th', 'NOV 7th', 'NOV 8th', 'NOV 9th', 'NOV 10th', 'NOV 11th','NOV 12th', 'NOV 13th', 'NOV 14th', 'NOV 15th', 'NOV 16th', 'NOV 17th', 'NOV 18th', 'NOV 19th', 'NOV 20th', 'NOV 21st', 'NOV 22nd', 'NOV 23rd', 'NOV 24th', 'NOV 25th', 'NOV 26th', 'NOV 27th', 'NOV 28th', 'NOV 29th', 'NOV 30th']


    // function used by back button, selecting previous date
    function prevDate(date) {
        let currIndx = dates.indexOf(date);
        console.log("previous date = ", dates[currIndx-1]);
        if (currIndx === 0){
            setActiveDate("all");
        } else {
            setActiveDate(dates[currIndx-1]);
        }
    }
    // function used by next button, selecting next date
    function nextDate(date) {
        let currIndx = dates.indexOf(date);
        console.log("next date = ", dates[currIndx+1]);
        if (currIndx === dates.length-1){
            setActiveDate("all");
        } else {
            setActiveDate(dates[currIndx+1]);
        }
    }

    function selectDate(date) {
        setActiveDate(date.element);
        console.log(activeDate);
        console.log(date, "selected.");
    }

    return (
    
        <div class="h-15 flex">

            {/* previous date button */}
            <button onClick={() => prevDate(activeDate)} class="px-2 border-b border-gray-400 hover:border-4 hover:border-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            {/* All events button - shows all events on all dates */}
            <button onClick={()=> setActiveDate("all")}class={`py-1 px-4 border-b hover:border-4 hover:border-blue-700 ${activeDate === 'all' ? 'border-blue-700 text-blue-700' : 'border-gray-400'}`}>All</button>
            
            {/* Iterates through list of dates, and displays button for each */}
            <div class="flex-row flex h-full overflow-x-scroll scrollbar-hide">
                {dates.map((element) => {
                    return <button onClick={() => selectDate({element})} class={`px-5 py-1 h-full border-b hover:border-4 hover:border-blue-700 ${activeDate === element ? 'border-blue-700 text-blue-700' : 'border-gray-400'}`}>{element}</button>
                    })
                }
            </div>

            {/* next date button */}
            <button onClick={() => nextDate(activeDate)} class="px-4 border-b border-gray-400 hover:border-4 hover:border-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
}

export default DateSelector; 