import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

function RecipesPage() {
  const { id } = useParams();

  const [data, setData] = useState({
    recipeItem: null,
    recipeImage: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    setData(prev => ({ ...prev, loading: true, error: null }));

    fetch(`http://localhost:5000/api/recipes/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(dataJson => {
        setData(prev => ({ ...prev, recipeItem: dataJson[0], loading: false }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setData(prev => ({ ...prev, loading: false, error: error.message }));
      });

    fetch(`http://localhost:5000/api/images/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setData(prev => ({ ...prev, recipeImage: url }));
      })
      .catch(err => {
        console.error('Error fetching image: ', err);
        setData(prev => ({ ...prev, error: err.message }));
      });
  }, [id]);

  const { recipeItem, recipeImage, loading, error } = data;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipeItem) return <div>Recipe not found</div>;

  const splitInstructionText = recipeItem.recipe_instruction.split(". ");
  const formattedInstructionText = splitInstructionText.join("\n\n");

  return (
    <div>
      <Navbar />

      <header>
        <h1>{recipeItem.recipe_name}</h1>
        <h3>{recipeItem.recipe_category}</h3>
        {recipeImage && <img alt={recipeItem.recipe_name} src={recipeImage} />}
      </header>

      <div className="container">
        <h3>Ingredients:</h3>
        {recipeItem.ingredients.length > 0 ? (
          <ul>
            {recipeItem.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.ingredient_quantity} of {ingredient.ingredient_name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No ingredients</p>
        )}

        <h3>Instructions:</h3>
        <textarea readOnly value={formattedInstructionText} />

        <input
          type="button"
          onClick={() => (window.location.href = `/delete_recipe/${id}`)}
          value="Delete recipe"
        />
      </div>

      <Footer />
    </div>
  );
}

export default RecipesPage;
