import React, { useState, useEffect, useRef } from 'react';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Pagination from './components/pagination';

const HomePage = () => {
    const [recipesData, setRecipesData] = useState([]);
    const [filteredRecipesData, setFilteredRecipesData] = useState([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [recipesPerPage] = useState(15);
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        fetchRecipesData();
    }, []);

    const fetchRecipesData = () => {
        fetch('http://localhost:5000/api/recipes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setRecipesData(data);
                setFilteredRecipesData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        const filteredData = recipesData.filter(recipe =>
            recipe.recipe_name.toLowerCase().includes(query) || recipe.recipe_category.toLowerCase().includes(query)
        );
        setFilteredRecipesData(filteredData);
        setCurrentPageNumber(0);
        setSearchQuery(query);
        inputRef.current.focus();
    }

    const clearSearch = () => {
        setFilteredRecipesData(recipesData);
        setCurrentPageNumber(0);
        setSearchQuery("");
        inputRef.current.focus();
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPageNumber(pageNumber - 1);
    }

    const handleRowClick = (url) => {
        window.location.href = url;
    };

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