import React from 'react';
import { useParams } from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/footer';

function RecipesPage ({ filteredRecipesData }) {
    const { id } = useParams();
    const recipeItem = filteredRecipesData.find(item => item.recipe_id === parseInt(id));
    if (!recipeItem) return <div>Recipe not found</div>;

    const splitInstructionText = recipeItem.recipe_instruction.split(". ");
    const formattedInstructionText = splitInstructionText.join("\n\n");

    return (
        <div>
            <Navbar />

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

            <Footer />
        </div>
    );
};

export default RecipesPage;