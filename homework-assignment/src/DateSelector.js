import React, {useEffect, useState} from 'react';

const DateSelector = () => {
    const windowWidth = window.innerWidth;
    const [activeDate, setActiveDate] = useState("all");
    const dates = ['Nov 1st', 'Nov 2nd', 'Nov 3rd', 'Nov 4th', 'Nov 5th', 'Nov 6th', 'Nov 7th', 'Nov 8th', 'Nov 9th', 'Nov 10th', 'Nov 11th','Nov 12th', 'Nov 13th', 'Nov 14th']

    useEffect(()=> {
        console.log(String(activeDate).split(" "));
        console.log(window.innerWidth);

    }, [])

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