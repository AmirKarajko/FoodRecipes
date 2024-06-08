import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function AddNewRecipePage() {
    const [recipeName, setRecipeName] = useState('');
    const [recipeCategory, setRecipeCategory] = useState('');
    const [recipeInstructions, setRecipeInstructions] = useState('');
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientQuantity, setIngredientQuantity] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [recipeImage, setRecipeImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setRecipeImage(e.target.files[0]);
        } else {
            alert("Please select a valid image file.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', recipeName);
        formData.append('category', recipeCategory);
        formData.append('instructions', recipeInstructions);
        if (ingredients.length > 0) {
            formData.append('ingredients', JSON.stringify(ingredients));
        } else {
            formData.append('ingredients', null);
        
        }
        formData.append('image', recipeImage);

        try {
            const response = await fetch('http://localhost:5000/api/add_new_recipe', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                console.log('Recipe added successfully!');
    
                setRecipeName('');
                setRecipeCategory('');
                setRecipeInstructions('');
                setIngredients([]);
                setRecipeImage(null);

                window.location.href = "/";
            } else {
                console.error('Failed to add recipe');
            }
        } catch (error) {
            console.error('Failed to add recipe', error);
        }
    };    

    const handleIngredientButton = () => {
        if (ingredientName.trim() === '' || ingredientQuantity.trim() === '') {
            alert("Please enter values for both ingredients.");
            return;
        }
        setIngredients([...ingredients, { ingredientName, ingredientQuantity }]);
        setIngredientName('');
        setIngredientQuantity('');
    }

    const handleIngredientDeleteButton = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    }

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
                        <input id="recipeName" type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipeCategory">Category:</label>
                        <input id="recipeCategory" type="text" value={recipeCategory} onChange={(e) => setRecipeCategory(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="ingredientName">Ingredient:</label>
                        <input id="ingredientName" type="text" value={ingredientName} onChange={(e) => setIngredientName(e.target.value)} />
                        <label htmlFor="ingredientQuantity">Quantity:</label>
                        <input id="ingredientQuantity" type="text" value={ingredientQuantity} onChange={(e) => setIngredientQuantity(e.target.value)} />
                        <input type="button" onClick={handleIngredientButton} value="Add ingredient" />
                    </div>

                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <span>{ingredient.ingredientQuantity} of {ingredient.ingredientName} </span>
                                <input type="button" onClick={() => handleIngredientDeleteButton(index)} value="Delete" />
                            </li>
                        ))}
                    </ul>
                    
                    <div className="form-group">
                        <label htmlFor="recipeInstructions">Instructions:</label>
                        <textarea id="recipeInstructions" value={recipeInstructions} onChange={(e) => setRecipeInstructions(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="recipeImage">Image:</label>
                        <input id="recipeImage" type="file" onChange={handleImageChange} accept="image/*" />
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