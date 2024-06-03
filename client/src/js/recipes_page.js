import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/footer';

let recipeItem;

function RecipesPage () {
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/api/recipes/${id}`)
        .then(response => response.json())
        .then(data => {
            recipeItem = data[0];
            console.log(recipeItem);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [id]);

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