import React, { useState } from 'react';
import Navbar from '../components/navbar';

function AddNewRecipePage() {
    const [formData, setFormData] = useState({
        recipeName: '',
        recipeCategory: '',
        recipeInstructions: '',
        ingredientName: '',
        ingredientQuantity: '',
        ingredients: [],
        recipeImage: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setFormData(prev => ({ ...prev, recipeImage: file }));
        } else {
            alert("Please select a valid image file.");
        }
    };

    const handleIngredientButton = () => {
        const { ingredientName, ingredientQuantity } = formData;
        if (ingredientName.trim() === '' || ingredientQuantity.trim() === '') {
            alert("Please enter values for both ingredients.");
            return;
        }
        setFormData(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, { ingredientName, ingredientQuantity }],
            ingredientName: '',
            ingredientQuantity: ''
        }));
    };

    const handleIngredientDeleteButton = (index) => {
        setFormData(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }));
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submitData = new FormData();
        submitData.append('name', formData.recipeName);
        submitData.append('category', formData.recipeCategory);
        submitData.append('instructions', formData.recipeInstructions);
        submitData.append('ingredients', JSON.stringify(formData.ingredients));
        submitData.append('image', formData.recipeImage);

        try {
            const response = await fetch('http://localhost:5000/api/add_new_recipe', {
                method: 'POST',
                body: submitData,
            });

            if (response.ok) {
                console.log('Recipe added successfully!');

                setFormData({
                    recipeName: '',
                    recipeCategory: '',
                    recipeInstructions: '',
                    ingredientName: '',
                    ingredientQuantity: '',
                    ingredients: [],
                    recipeImage: null,
                });

                window.location.href = "/";
            } else {
                console.error('Failed to add recipe');
            }
        } catch (error) {
            console.error('Failed to add recipe', error);
        }
    };

    return (
        <>
            <style>{`
                .container {
                    max-width: 80%;
                    margin: 30px auto;
                    padding: 20px;
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                form .form-group {
                    margin-bottom: 15px;
                    display: flex;
                    flex-direction: column;
                }

                form label {
                    margin-bottom: 6px;
                    font-weight: 600;
                    color: #333;
                }

                form input[type="text"],
                form textarea,
                form input[type="file"] {
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    outline: none;
                    transition: border-color 0.3s ease;
                }

                form input[type="text"]:focus,
                form textarea:focus,
                form input[type="file"]:focus {
                    border-color: #ff4d4f;
                    box-shadow: 0 0 5px rgba(255, 77, 79, 0.5);
                }

                form textarea {
                    resize: vertical;
                    min-height: 100px;
                }

                .input-group {
                    display: flex;
                    gap: 10px;
                    align-items: flex-end;
                    flex-wrap: wrap;
                }

                .input-group label {
                    flex: 1 0 100px;
                    margin-bottom: 0;
                }

                .input-group input[type="text"] {
                    flex: 2 1 auto;
                }

                .input-group input[type="button"] {
                    padding: 10px 18px;
                    background-color: #ff4d4f;
                    border: none;
                    color: white;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: background-color 0.3s ease;
                }

                .input-group input[type="button"]:hover {
                    background-color: #d9363e;
                }

                form ul {
                    list-style-type: none;
                    padding-left: 0;
                }

                form ul li {
                    display: flex;
                    justify-content: space-between;
                    background: #f9f9f9;
                    padding: 8px 12px;
                    border-radius: 5px;
                    margin-bottom: 6px;
                }

                form ul li input[type="button"] {
                    background-color: #ff4d4f;
                    border: none;
                    color: white;
                    cursor: pointer;
                    border-radius: 4px;
                    padding: 4px 10px;
                    font-size: 14px;
                    transition: background-color 0.3s ease;
                }

                form ul li input[type="button"]:hover {
                    background-color: #d9363e;
                }

                form input[type="submit"] {
                    padding: 12px 24px;
                    background-color: #ff4d4f;
                    border: none;
                    color: white;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 600;
                    transition: background-color 0.3s ease;
                    margin-top: 20px;
                    width: 100%;
                }

                form input[type="submit"]:hover {
                    background-color: #d9363e;
                }
            `}</style>

            <Navbar />

            <div className="container">
                <header>
                    <h1>Add New Recipe</h1>
                </header>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="recipeName">Name:</label>
                        <input
                            id="recipeName"
                            type="text"
                            value={formData.recipeName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="recipeCategory">Category:</label>
                        <input
                            id="recipeCategory"
                            type="text"
                            value={formData.recipeCategory}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="ingredientName">Ingredient:</label>
                        <input
                            id="ingredientName"
                            type="text"
                            value={formData.ingredientName}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="ingredientQuantity">Quantity:</label>
                        <input
                            id="ingredientQuantity"
                            type="text"
                            value={formData.ingredientQuantity}
                            onChange={handleInputChange}
                        />
                        <input type="button" onClick={handleIngredientButton} value="Add ingredient" />
                    </div>

                    <ul>
                        {formData.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <span>{ingredient.ingredientQuantity} of {ingredient.ingredientName}</span>
                                <input type="button" onClick={() => handleIngredientDeleteButton(index)} value="Delete" />
                            </li>
                        ))}
                    </ul>

                    <div className="input-group">
                        <label htmlFor="recipeInstructions">Instructions:</label>
                        <textarea
                            id="recipeInstructions"
                            value={formData.recipeInstructions}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="recipeImage">Image:</label>
                        <input
                            id="recipeImage"
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>

                    <div className="form-input">
                        <input type="submit" value="Add recipe" />
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddNewRecipePage;
