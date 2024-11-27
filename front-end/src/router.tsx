import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RequestTravel from './pages/RequestTravel';
import TravelOptions from './pages/TravelOptions';
import History from './pages/History';

const App: React.FC = () => {
    return (
        <Routes>
        <Route path="/" element={<RequestTravel/>}/>
        <Route path="/options" element={<TravelOptions />} />
        <Route path="/history" element={<History />} />
        </Routes>
    );
};

export default App;
