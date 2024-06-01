import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

class PageRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipesData: [],
            filteredRecipesData: [],
            error: null,
            currentPageNumber: 0,
            recipesPerPage: 5,
            searchQuery: "",
        };

        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.fetchRecipesData();
    }

    fetchRecipesData = () => {
        fetch('http://localhost:5000/api/recipes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(recipesData => {
                this.setState({
                    recipesData,
                    filteredRecipesData: recipesData,
                    error: null
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ error: error.message });
            });
    }

    handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        const { recipesData } = this.state;
        const filteredRecipesData = recipesData.filter(recipe =>
            recipe.recipe_name.toLowerCase().includes(query) || recipe.recipe_category.toLowerCase().includes(query)
        );
        this.setState({ 
            filteredRecipesData: filteredRecipesData,
            currentPageNumber: 0,
            searchQuery: query
        }, () => {
            this.inputRef.current.focus();
        });
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPageNumber: pageNumber - 1 });
    }

    render() {
        const { filteredRecipesData, currentPageNumber, recipesPerPage } = this.state;

        const indexOfLastRecipe = (currentPageNumber + 1) * recipesPerPage;
        const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
        const currentRecipes = filteredRecipesData.slice(indexOfFirstRecipe, indexOfLastRecipe);

        const Home = () =>
            <div>
                <h1>Food Recipes</h1>
                <div>
                    <input type="text" placeholder="Search" onChange={this.handleSearch} value={this.state.searchQuery} ref={this.inputRef} />
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecipes.map(recipe => (
                            <tr key={recipe.recipe_id}>
                                <td>{recipe.recipe_name}</td>
                                <td>{recipe.recipe_category}</td>
                                <td>
                                    <Link to={`/recipes/${recipe.recipe_id}`}>View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination
                    recipesPerPage={recipesPerPage}
                    totalRecipes={filteredRecipesData.length}
                    currentPage={currentPageNumber + 1}
                    onPageChange={this.handlePageChange}
                />
            </div>;

        const Recipes = ({ filteredRecipesData }) => {
            const { id } = useParams();
            const recipeItem = filteredRecipesData.find(item => item.recipe_id === parseInt(id));
            if (!recipeItem) return <div>Recipe not found</div>;

            return (
                <div>
                    <h1>Food Recipes</h1>
                    <p>ID: {recipeItem.recipe_id}<br />
                        Name: {recipeItem.recipe_name}<br />
                        Category: {recipeItem.recipe_category}<br /><br />
                        Instructions: <br /><br />{recipeItem.recipe_instruction}<br /><br />
                        Ingredients:</p>
                    <ul>
                        {recipeItem.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.ingredient_quantity} of {ingredient.ingredient_name}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        };

        const Pagination = ({ recipesPerPage, totalRecipes, currentPage, onPageChange }) => {
            const pageNumbers = Math.ceil(totalRecipes / recipesPerPage);
        
            if (pageNumbers === 1) return null;
        
            return (
                <nav>
                    {Array.from({ length: pageNumbers }, (_, index) => (
                        <button key={index + 1} onClick={() => onPageChange(index + 1)} className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}>{index + 1}</button>
                    ))}
                </nav>
            );
        };

        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/recipes/:id" element={<Recipes filteredRecipesData={filteredRecipesData} />} />
                </Routes>
            </Router>
        );
    }
}

export default PageRenderer;