import React, { useState, useEffect, useRef, useMemo } from 'react';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Pagination from '../components/pagination';

const DashboardPage = () => {
    const inputRef = useRef();

    const [state, setState] = useState({
        recipesData: [],
        searchQuery: "",
        currentPageNumber: 0,
        recipesPerPage: 15
    });

    const { recipesData, searchQuery, currentPageNumber, recipesPerPage } = state;

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
                setState(prev => ({ ...prev, recipesData: data }));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setState(prev => ({
            ...prev,
            searchQuery: query,
            currentPageNumber: 0
        }));
        inputRef.current.focus();
    };

    const clearSearch = () => {
        setState(prev => ({
            ...prev,
            searchQuery: "",
            currentPageNumber: 0
        }));
        inputRef.current.focus();
    };

    const handlePageChange = (pageNumber) => {
        setState(prev => ({
            ...prev,
            currentPageNumber: pageNumber - 1
        }));
    };

    const handleRowClick = (url) => {
        window.location.href = url;
    };

    const handleSort = (criteria) => {
        setState(prev => {
            const sortedData = [...filteredRecipes].sort((a, b) => {
                const valueA = a[criteria].toLowerCase();
                const valueB = b[criteria].toLowerCase();
                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
                return 0;
            });
            return {
                ...prev,
                recipesData: sortedData
            };
        });
    };

    const filteredRecipes = useMemo(() => {
        if (!searchQuery) return recipesData;
        return recipesData.filter(recipe =>
            recipe.recipe_name.toLowerCase().includes(searchQuery) ||
            recipe.recipe_category.toLowerCase().includes(searchQuery)
        );
    }, [recipesData, searchQuery]);

    const currentRecipes = useMemo(() => {
        const startIndex = currentPageNumber * recipesPerPage;
        return filteredRecipes.slice(startIndex, startIndex + recipesPerPage);
    }, [filteredRecipes, currentPageNumber, recipesPerPage]);

    return (
        <div>
            <Navbar />

            <div className="container">
                <div className="input-group">
                    <input
                        id="searchInput"
                        type="text"
                        placeholder="Search"
                        onChange={handleSearch}
                        value={searchQuery}
                        ref={inputRef}
                    />
                    <input
                        type="button"
                        value="Clear"
                        onClick={clearSearch}
                    />
                </div>

                {currentRecipes && currentRecipes.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('recipe_name')}>Name</th>
                                <th onClick={() => handleSort('recipe_category')}>Category</th>
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
                ) : (
                    <p>No recipes</p>
                )}

                <Pagination
                    recipesPerPage={recipesPerPage}
                    totalRecipes={filteredRecipes.length}
                    currentPage={currentPageNumber + 1}
                    onPageChange={handlePageChange}
                />
            </div>

            <Footer />
        </div>
    );
};

export default DashboardPage;
