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
        recipesPerPage: 5
    });

    const [loading, setLoading] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const { recipesData, searchQuery, currentPageNumber, recipesPerPage } = state;

    useEffect(() => {
        const fetchRecipesData = () => {
            setLoading(true);
            fetch('http://localhost:5000/api/recipes')
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    setState(prev => ({ ...prev, recipesData: data }));
                })
                .catch(() => {})
                .finally(() => setLoading(false));
        };

        fetchRecipesData();
    }, []);

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
        let direction = 'asc';
        if (sortConfig.key === criteria && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key: criteria, direction });

        setState(prev => {
            const sortedData = [...filteredRecipes].sort((a, b) => {
                const valueA = a[criteria].toLowerCase();
                const valueB = b[criteria].toLowerCase();
                if (valueA < valueB) return direction === 'asc' ? -1 : 1;
                if (valueA > valueB) return direction === 'asc' ? 1 : -1;
                return 0;
            });
            return {
                ...prev,
                recipesData: sortedData
            };
        });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            fetch(`http://localhost:5000/api/delete_recipe/${id}`, { method: 'DELETE' })
                .then(() => {
                    const fetchRecipesData = () => {
                        setLoading(true);
                        fetch('http://localhost:5000/api/recipes')
                            .then(response => {
                                if (!response.ok) throw new Error('Network response was not ok');
                                return response.json();
                            })
                            .then(data => {
                                setState(prev => ({ ...prev, recipesData: data }));
                            })
                            .catch(() => {})
                            .finally(() => setLoading(false));
                    };
                    fetchRecipesData();
                })
                .catch(() => {});
        }
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
        <>
            <style>{`
                /* Search input and clear button */
                .search-container {
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    max-width: 90%;
                }
                .search-input {
                    flex-grow: 1;
                    padding: 10px 12px;
                    border: 1px solid #ccc;
                    border-radius: 4px 0 0 4px;
                    font-size: 16px;
                    outline: none;
                    transition: border-color 0.3s ease;
                }
                .search-input:focus {
                    border-color: #ff4d4f;
                    box-shadow: 0 0 5px rgba(255, 77, 79, 0.5);
                }
                .clear-button {
                    padding: 8px 16px;
                    background-color: #ff4d4f;
                    border: none;
                    color: white;
                    cursor: pointer;
                    border-radius: 0 4px 4px 0;
                    font-size: 16px;
                    font-weight: 600;
                    margin-left: 4px;
                    box-shadow: 0 2px 6px rgba(255, 77, 79, 0.4);
                    transition: background-color 0.3s ease, box-shadow 0.3s ease;
                }
                .clear-button:hover {
                    background-color: #d9363e;
                    box-shadow: 0 4px 10px rgba(217, 54, 62, 0.6);
                }

                /* Table styles */
                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-family: Arial, sans-serif;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                thead {
                    background-color: #ff4d4f;
                    color: white;
                }
                thead th {
                    padding: 12px 15px;
                    text-align: left;
                    cursor: pointer;
                    user-select: none;
                }
                thead th:hover {
                    background-color: #e04344;
                }
                tbody td {
                    padding: 12px 15px;
                    border: 1px solid #ddd;
                }
                tbody tr:hover {
                    background-color: #ffe6e6;
                }
                tbody tr td:first-child,
                tbody tr td:nth-child(2) {
                    cursor: pointer;
                }
                button {
                    background-color: #ff4d4f;
                    border: none;
                    color: white;
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    font-size: 14px;
                }
                button:hover {
                    background-color: #d9363e;
                }
            `}</style>

            <Navbar />

            <div className="container" style={{ padding: '20px' }}>
                <div className="search-container">
                    <input
                        id="searchInput"
                        type="text"
                        placeholder="Search"
                        onChange={handleSearch}
                        value={searchQuery}
                        ref={inputRef}
                        className="search-input"
                    />
                    <button
                        type="button"
                        onClick={clearSearch}
                        aria-label="Clear search"
                        className="clear-button"
                    >
                        Clear
                    </button>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Recipes per page:&nbsp;
                        <select
                            value={recipesPerPage}
                            onChange={(e) => setState(prev => ({ ...prev, recipesPerPage: Number(e.target.value), currentPageNumber: 0 }))}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </label>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    currentRecipes.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort('recipe_name')}>
                                        Name {sortConfig.key === 'recipe_name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                    </th>
                                    <th onClick={() => handleSort('recipe_category')}>
                                        Category {sortConfig.key === 'recipe_category' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecipes.map(recipe => (
                                    <tr key={recipe.recipe_id}>
                                        <td onClick={() => handleRowClick(`/recipes/${recipe.recipe_id}`)}>{recipe.recipe_name}</td>
                                        <td onClick={() => handleRowClick(`/recipes/${recipe.recipe_id}`)}>{recipe.recipe_category}</td>
                                        <td>
                                            <button onClick={() => handleDelete(recipe.recipe_id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No recipes found.</p>
                    )
                )}

                <Pagination
                    recipesPerPage={recipesPerPage}
                    totalRecipes={filteredRecipes.length}
                    currentPage={currentPageNumber + 1}
                    onPageChange={handlePageChange}
                />
            </div>

            <Footer />
        </>
    );
};

export default DashboardPage;
