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
    <>
      <style>{`
        .container {
          max-width: 900px;
          margin: 20px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        header {
          text-align: center;
          margin-bottom: 30px;
        }

        header h1 {
          color: #ff4d4f;
          margin-bottom: 5px;
        }

        header h3 {
          color: #555;
          margin-top: 0;
        }

        header img {
          max-width: 100%;
          height: auto;
          margin-top: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        h3.section-title {
          color: #ff4d4f;
          margin-bottom: 10px;
          border-bottom: 2px solid #ff4d4f;
          padding-bottom: 5px;
        }

        ul.ingredients-list {
          list-style: disc inside;
          margin-bottom: 25px;
          font-size: 16px;
          color: #333;
        }

        ul.ingredients-list li {
          margin-bottom: 6px;
        }

        textarea.instructions-textarea {
          width: 100%;
          height: 160px;
          padding: 12px;
          font-size: 16px;
          font-family: Arial, sans-serif;
          border: 1px solid #ccc;
          border-radius: 6px;
          resize: none;
          background-color: #fff0f0;
          color: #333;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }

        button.delete-button {
          background-color: #ff4d4f;
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          box-shadow: 0 2px 6px rgba(255, 77, 79, 0.4);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          display: block;
          margin: 0 auto 40px auto;
        }

        button.delete-button:hover {
          background-color: #d9363e;
          box-shadow: 0 4px 10px rgba(217, 54, 62, 0.6);
        }
      `}</style>

      <Navbar />

      <div className="container">
        <header>
          <h1>{recipeItem.recipe_name}</h1>
          <h3>{recipeItem.recipe_category}</h3>
          {recipeImage && <img alt={recipeItem.recipe_name} src={recipeImage} />}
        </header>

        <section>
          <h3 className="section-title">Ingredients:</h3>
          {recipeItem.ingredients.length > 0 ? (
            <ul className="ingredients-list">
              {recipeItem.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.ingredient_quantity} of {ingredient.ingredient_name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No ingredients</p>
          )}
        </section>

        <section>
          <h3 className="section-title">Instructions:</h3>
          <textarea
            className="instructions-textarea"
            readOnly
            value={formattedInstructionText}
          />
        </section>

        <button
          className="delete-button"
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this recipe?')) {
              window.location.href = `/delete_recipe/${id}`;
            }
          }}
        >
          Delete
        </button>

      </div>
    </>
  );
}

export default RecipesPage;
