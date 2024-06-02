import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

class PageRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipesData: [],
            filteredRecipesData: [],
            error: null,
            currentPageNumber: 0,
            recipesPerPage: 15,
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

    clearSearch = () => {
        const { recipesData } = this.state;
        this.setState({ 
            filteredRecipesData: recipesData,
            currentPageNumber: 0,
            searchQuery: "",
        }, () => {
            if (this.inputRef && this.inputRef.current) {
                this.inputRef.current.focus();
            }
        });
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPageNumber: pageNumber - 1 });
    }

    handleRowClick = (url) => {
        window.location.href = url;
    };

    render() {
        const { filteredRecipesData, currentPageNumber, recipesPerPage } = this.state;

        const indexOfLastRecipe = (currentPageNumber + 1) * recipesPerPage;
        const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
        const currentRecipes = filteredRecipesData.slice(indexOfFirstRecipe, indexOfLastRecipe);

        const navbar =
        <div>
            <ul className="topnav">
            <li><a className="active" href="/">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            </ul>
        </div>;

        const footer = 
        <footer>
            <p>Copyright © 2024</p>
        </footer>;

        const Home = () =>
            <div>
                {navbar}

                <div className="container">
                    <div className="input-group">
                        <input className="text-input" id="searchInput" type="text" placeholder="Search" onChange={this.handleSearch} value={this.state.searchQuery} ref={this.inputRef} />
                        <input className="button-input" type="button" value="Clear" onClick={this.clearSearch} />
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
                                <tr key={recipe.recipe_id} onClick={() => this.handleRowClick(`/recipes/${recipe.recipe_id}`)}>
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
                        onPageChange={this.handlePageChange}
                    />
                </div>

                {footer}
            </div>;

        const Recipes = ({ filteredRecipesData }) => {
            const { id } = useParams();
            const recipeItem = filteredRecipesData.find(item => item.recipe_id === parseInt(id));
            if (!recipeItem) return <div>Recipe not found</div>;

            const splitInstructionText = recipeItem.recipe_instruction.split(". ");
            const formattedInstructionText = splitInstructionText.join("\n\n");

            return (
                <div>
                    {navbar}

                    <header>
                        <h1>{recipeItem.recipe_name}</h1>
                        <h2>{recipeItem.recipe_category}</h2>
                    </header>

                    <div className="container">
                        <h3>
                            Ingredients:
                        </h3>
                        <ul>
                            {recipeItem.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.ingredient_quantity} of {ingredient.ingredient_name}
                                </li>
                            ))}
                        </ul>

                        <h3>
                            Instructions:
                        </h3>
                        <textarea readOnly value={formattedInstructionText} />
                    </div>

                    {footer}
                </div>
            );
        };

        const Pagination = ({ recipesPerPage, totalRecipes, currentPage, onPageChange }) => {
            const pageNumbers = Math.ceil(totalRecipes / recipesPerPage);
        
            if (pageNumbers === 1) return null;
        
            return (
                <nav align="center">
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