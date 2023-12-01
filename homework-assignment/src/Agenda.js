import React, {useState, useEffect} from 'react';
import DateSelector from './DateSelector';
import Filter from './Filter';
import Events from './Events';

const Agenda = () => {

    // activeDate is initialised here and sent to child components 'DateSelector' and 'Events'
    const [activeDate, setActiveDate] = useState("all");

    return (<div class="bg-white">
        <h1 class="p-3 text-3xl">Agenda</h1>
        <DateSelector activeDate={activeDate} setActiveDate={setActiveDate}/>
        <Filter/>
        <Events activeDate={activeDate}/>
    </div>);
}

export default Agenda; 