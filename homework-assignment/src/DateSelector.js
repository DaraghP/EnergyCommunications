import React, {useEffect, useState} from 'react';

const DateSelector = ({activeDate, setActiveDate}) => {
    const windowWidth = window.innerWidth;
    const dates = ['NOV 1st', 'NOV 2nd', 'NOV 3rd', 'NOV 4th', 'NOV 5th', 'NOV 6th', 'NOV 7th', 'NOV 8th', 'NOV 9th', 'NOV 10th', 'NOV 11th','NOV 12th', 'NOV 13th', 'NOV 14th']

    // useEffect(()=> {
    //     console.log(String(activeDate).split(" "));
    //     console.log(window.innerWidth);

    // }, [])

    function prevDate(date) {
        // console.log(date, " index: ", dates.indexOf(date));
        let currIndx = dates.indexOf(date);
        console.log("previous date = ", dates[currIndx-1]);
        if (currIndx === 0){
            setActiveDate("all");
        } else {
            setActiveDate(dates[currIndx-1]);
        }
    }

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
    
        <div class="h-12 flex">
            <button onClick={() => prevDate(activeDate)} class="px-2 border-b border-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button onClick={()=> setActiveDate("all")}class={`py-1 px-4 border-b ${activeDate === 'all' ? 'border-blue-700 text-blue-700' : 'border-gray-400'}`}>All</button>
            <div class="flex-row flex h-full overflow-x-scroll overscroll-y-contain">
                {dates.map((element) => {
                    return <button onClick={() => selectDate({element})} class={`px-5 h-full border-b ${activeDate === element ? 'border-blue-700 text-blue-700' : 'border-gray-400'}`}>{element}</button>
                    })
                }
            </div>
            <button onClick={() => nextDate(activeDate)} class="px-4 border-b border-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>

            </button>
        </div>
    );
}

export default DateSelector; 