import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

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
        <div>
            <Navbar />
            <header>
                <h1>Add New Recipe</h1>
            </header>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="recipeName">Name:</label>
                        <input
                            id="recipeName"
                            type="text"
                            value={formData.recipeName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
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

                    <div className="form-group">
                        <label htmlFor="recipeInstructions">Instructions:</label>
                        <textarea
                            id="recipeInstructions"
                            value={formData.recipeInstructions}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="recipeImage">Image:</label>
                        <input
                            id="recipeImage"
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add recipe" />
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default AddNewRecipePage;
