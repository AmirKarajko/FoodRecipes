import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './home_page';
import RecipesPage from './recipes_page';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/recipes/:id" element={<RecipesPage />} />
            </Routes>
        </Router>
    );
}

export default App;