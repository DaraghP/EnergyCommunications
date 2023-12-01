import React, {useState, useEffect} from 'react';
import DateSelector from './DateSelector';
import Filter from './Filter';
import Events from './Events';

const Agenda = () => {
    const [activeDate, setActiveDate] = useState("all");

    useEffect(() => {
        // 
    }, [activeDate])
    return (<div class="bg-white">
        <h1 class="p-3 text-3xl">Agenda</h1>
        <DateSelector activeDate={activeDate} setActiveDate={setActiveDate}/>
        <Filter/>
        <Events activeDate={activeDate}/>
    </div>);
}

export default Agenda; 