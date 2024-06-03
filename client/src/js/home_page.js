import React from 'react';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Pagination from './components/pagination';

function HomePage ({ state, handleSearch, inputRef, clearSearch, handleRowClick, handlePageChange }) {
    const { filteredRecipesData, currentPageNumber, recipesPerPage, searchQuery } = state;

    const indexOfLastRecipe = (currentPageNumber + 1) * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipesData.slice(indexOfFirstRecipe, indexOfLastRecipe);

    return (
        <div>
            <Navbar />

            <div className="container">
                <div className="input-group">
                    <input className="text-input" id="searchInput" type="text" placeholder="Search" onChange={handleSearch} value={searchQuery} ref={inputRef} />
                    <input className="button-input" type="button" value="Clear" onClick={clearSearch} />
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecipes.map(recipe => (
                            <tr key={recipe.recipe_id} onClick={() => handleRowClick(`/recipes/${recipe.recipe_id}`)}>
                                <td>{recipe.recipe_name}</td>
                                <td>{recipe.recipe_category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination
                    recipesPerPage={recipesPerPage}
                    totalRecipes={filteredRecipesData.length}
                    currentPage={currentPageNumber + 1}
                    onPageChange={handlePageChange}
                />
            </div>

            <Footer />
        </div>
    );
}

export default HomePage;