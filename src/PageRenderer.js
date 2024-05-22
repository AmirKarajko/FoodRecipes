
import React, { Component } from 'react';

class PageRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 'home',
            recipeId: null,
            recipesData: [],
            error: null
        };
    }

    componentDidMount() {
        this.fetchRecipesData();
    }

    fetchRecipesData = () => {
        fetch('http://localhost:5000/api/recipes')
        .then(response => response.json())
        .then(recipesData => { this.setState({ recipesData, error: null }) })
        .catch(error => console.error('Error fetching data:', error));
    }

    setCurrentPage = (pageName, id) => {
        this.setState({ currentPage: pageName, recipeId: id });
    }

    render() {
        const { currentPage, recipesData } = this.state;
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
                {recipesData.map(recipe => (
                    <tr key={recipe.recipe_id}>
                        <td>{recipe.recipe_id}</td>
                        <td>{recipe.recipe_name}</td>
                        <td>
                            <button onClick={() => this.setCurrentPage('recipes', recipe.recipe_id)}>View</button>
                        </td>
                    </tr>
                ))}
                </tbody>
                </table>;

                pageContent = 
                <div>
                    <h1>Food Recipes</h1>
                    {tableContent}
                </div>;
                break;
            case 'recipes':
                let recipeItem = recipesData.find(item => item.recipe_id === this.state.recipeId);

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
};

export default PageRenderer;