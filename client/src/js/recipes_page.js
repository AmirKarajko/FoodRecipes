import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/footer';

function RecipesPage() {
    const { id } = useParams();
    const [recipeItem, setRecipeItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/api/recipes/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setRecipeItem(data[0]);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
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
                <h3>Ingredients:</h3>
                {recipeItem.ingredients.length > 0 ? (<ul>
                    {recipeItem.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.ingredient_quantity} of {ingredient.ingredient_name}</li>
                    ))}
                </ul>) : (<p>No ingredients</p>)}

                <h3>Instructions:</h3>
                <textarea readOnly value={formattedInstructionText} />

                <input type="button" onClick={() => window.location.href = `/delete_recipe/${id}`} value="Delete recipe" />
            </div>

            <Footer />
        </div>
    );
}

export default RecipesPage;