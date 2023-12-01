import React from 'react';
import DateSelector from './DateSelector';
import Filter from './Filter';
import Events from './Events';

const Agenda = () => {
    return (<div class="bg-white">
        <h1 class="p-3 text-3xl">Agenda</h1>
        <DateSelector/>
        <Filter/>
        <Events/>
    </div>);
}

export default Agenda; 