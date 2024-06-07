import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DashboardPage from './pages/dashboard';
import RecipesPage from './pages/recipes';
import AddNewRecipePage from './pages/add_new_recipe';
import DeleteRecipePage from './pages/delete_recipe';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<DashboardPage />} />
                <Route path="/recipes/:id" element={<RecipesPage />} />
                <Route path="/add_new_recipe" element={<AddNewRecipePage />} />
                <Route path="/delete_recipe/:id" element={<DeleteRecipePage />} />
            </Routes>
        </Router>
    );
}

export default App;