import React, { Component } from 'react';

class PageRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 'home',
            recipeId: null,
            recipesData: [],
            filteredRecipesData: [],
            error: null,
            currentPageNumber: 1,
            recipesPerPage: 5,
        };
    }

    componentDidMount() {
        this.fetchRecipesData();
    }

    fetchRecipesData = () => {
        fetch('http://localhost:5000/api/recipes')
            .then(response => response.json())
            .then(recipesData => {
                this.setState({
                    recipesData,
                    filteredRecipesData: recipesData,
                    error: null
                })
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        const { recipesData } = this.state;
        const filteredRecipesData = recipesData.filter(recipe =>
            recipe.recipe_name.toLowerCase().includes(query)
        );
        this.setState({ filteredRecipesData });
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPageNumber: pageNumber });
    }

    render() {
        const { currentPage, filteredRecipesData, currentPageNumber, recipesPerPage } = this.state;

        const indexOfLastRecipe = currentPageNumber * recipesPerPage;
        const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
        const currentRecipes = filteredRecipesData.slice(indexOfFirstRecipe, indexOfLastRecipe);

        let pageContent, tableContent;
        switch (currentPage) {
            case 'home':
                tableContent =
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecipes.map(recipe => (
                                <tr key={recipe.recipe_id}>
                                    <td>{recipe.recipe_id}</td>
                                    <td>{recipe.recipe_name}</td>
                                    <td>
                                        <button onClick={() => this.setState({ currentPage: 'recipes', recipeId: recipe.recipe_id })}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>;

                pageContent =
                    <div>
                        <h1>Food Recipes</h1>
                        <div>
                            <input type="text" placeholder="Search" onChange={this.handleSearch} />
                        </div>
                        {tableContent}
                        
                        <Pagination
                            recipesPerPage={recipesPerPage}
                            totalRecipes={filteredRecipesData.length}
                            currentPage={currentPageNumber}
                            onPageChange={this.handlePageChange}
                        />
                    </div>;
                break;
            case 'recipes':
                let recipeItem = filteredRecipesData.find(item => item.recipe_id === this.state.recipeId);

                pageContent =
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
                    </div>;
                break;
            default:
                break;
        }

        return (
            <div>
                <main>
                    {pageContent}
                </main>
            </div>
        );
    }
}

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

export default PageRenderer;