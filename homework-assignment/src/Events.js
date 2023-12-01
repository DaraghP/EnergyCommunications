import React, { useEffect, useState} from 'react';

// Events component receives activeDate prop from Agenda and then displays list of events scheduled for that date
const Events = ({activeDate}) => {

    // dummy events list
    const events = [
        {  
            date: "NOV 1st",
            title: "This is an event haha",
            startTime: "09:30 GBT+1",
            endTime: "10:30 GBT+1",
            location: "Somewhere in a room",
            tags: ["This is a tag", "this is another tag", "so many tags", "This is a tag", "this is another tag", "so many tags"]
        },
        {  
            date: "NOV 1st",
            title: "Lunch",
            startTime: "12:30 GBT+1",
            endTime: "13:30 GBT+1",
            location: "Fine restaurant",
            tags: ["This is a tag", "this is another tag", "so many tags"]
        },
        {  
            date: "NOV 3rd",
            title: "This is an event haha",
            startTime: "09:30 GBT+1",
            endTime: "10:30 GBT+1",
            location: "Somewhere in a room",
            tags: ["This is a tag", "this is another tag", "so many tags"]
        },
        {  
            date: "NOV 1st",
            title: "This is an event haha",
            startTime: "09:30 GBT+1",
            endTime: "10:30 GBT+1",
            location: "Somewhere in a room",
            tags: ["This is a tag", "this is another tag", "so many tags"]
        }
    ]
    
    const [activeEvents, setActiveEvents] = useState(events);
    
    // whenever activeDate changes, reset activeEvents list to be displayed.
    // if activeDate is 'all', then show all events
    useEffect(() => {
        if (activeDate !== "all") {
            console.log("all events happening on", activeDate, ":");
            let currEvents = events.filter(function (e) {
                return e.date === activeDate;
            })
            console.log(activeEvents);
            setActiveEvents(currEvents);
        } else {
            setActiveEvents(events);
        }
    }, [activeDate]);

    return (
        <div class="flex flex-col overflow-y-auto max-h-screen">
            {/* show only if no events scheduled */}
            {activeEvents.length === 0 &&
                <>    
                    <h1 class="p-5 font-medium">No events.</h1>
                    <hr class="bg-gray-400 h-0.5"/>
                </>
            }

            {/* iterate through events, and display data */}
            {activeEvents.map((event) => {
                return <div class="px-5 py-3">
                            <div>{event.startTime}</div>
                            <hr class="bg-gray-400 h-0.5"/>
                            <div class="px-1">
                                <h2 class="text-2xl">{event.title}</h2>
                                <p>{event.startTime} - {event.endTime}</p>
                                <div class="flex flex-row">
                                    {/* location icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>

                                    <p class="px-2">{event.location}</p></div>
                                
                                {/* iterate through tags and display data */}
                                <div class="flex-wrap flex bg-white-800 py-1">
                                    {event.tags.map((tag) => {
                                        return <p class="text-sm rounded font-medium px-1 mt-1 mr-2 bg-gray-200 h-full">{tag.toUpperCase()}</p>
                                    })}
                                </div>
                            </div>
                            
                            <hr class="bg-gray-400 h-0.5"/>
                        </div>
            })
            }
            </div>
    );
}

export default Events; 