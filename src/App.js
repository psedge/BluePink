import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Root from './Root'; // Ensure the path is correct
import Genders from './Genders'; // Ensure the path is correct

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/genders" element={<Genders />} />
            </Routes>
        </Router>
    );
}

export default App;
