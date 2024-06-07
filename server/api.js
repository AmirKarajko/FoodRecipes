const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('./db');

router.use(bodyParser.json());

router.get('/recipes', (req, res) => {
    db.query(`
    SELECT
        recipes.id AS recipe_id,
        recipes.name AS recipe_name,
        recipes.category AS recipe_category
    FROM
        recipes
    LEFT JOIN
        ingredients ON recipes.id = ingredients.recipe_id;
`, (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error fetching data');
        return;
    }

    const recipesMap = new Map();

    results.forEach(row => {
        const recipeId = row.recipe_id;
        if (!recipesMap.has(recipeId)) {
            recipesMap.set(recipeId, {
                recipe_id: row.recipe_id,
                recipe_name: row.recipe_name,
                recipe_category: row.recipe_category,
            });
        }
    });

    res.json(Array.from(recipesMap.values()));
});
});

router.get('/recipes/:id', (req, res) => {
    const { id } = req.params;
    db.query(`
    SELECT
        recipes.id AS recipe_id,
        recipes.name AS recipe_name,
        recipes.category AS recipe_category,
        recipes.instructions AS recipe_instruction,
        ingredients.name AS ingredient_name,
        ingredients.quantity AS ingredient_quantity
    FROM
        recipes
    LEFT JOIN
        ingredients ON recipes.id = ingredients.recipe_id WHERE recipes.id = ${id};
`, parseInt(id), (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error fetching data');
        return;
    }

    const recipesMap = new Map();

    results.forEach(row => {
        const recipeId = row.recipe_id;
        if (!recipesMap.has(recipeId)) {
            recipesMap.set(recipeId, {
                recipe_id: row.recipe_id,
                recipe_name: row.recipe_name,
                recipe_category: row.recipe_category,
                recipe_instruction: row.recipe_instruction,
                ingredients: []
            });
        }

        if (row.ingredient_name != null && row.ingredient_quantity != null) {
            recipesMap.get(recipeId).ingredients.push({
                ingredient_name: row.ingredient_name,
                ingredient_quantity: row.ingredient_quantity
            });
        }
    });

    const recipesWithIngredients = Array.from(recipesMap.values());
    res.json(recipesWithIngredients);
});
});

router.post('/add_new_recipe', (req, res) => {
    const { name, category, instructions, ingredients } = req.body;

    const query = "INSERT INTO recipes (name, category, instructions) VALUES (?, ?, ?)";
    db.query(query, [name, category, instructions], (err, results) => {
        if (err) {
            console.error('Error inserting recipe: ', err);
            res.status(500).send('Error inserting recipe');
            return;
        }
        res.sendStatus(200);

        if (ingredients.length > 0) {
            const latestRecipeIdQuery = "SELECT id FROM recipes ORDER BY id DESC LIMIT 1";

            db.query(latestRecipeIdQuery, (err, results) => {
                if (err) {
                    console.error('Error fetching latest recipe ID: ', err);
                    throw err;
                }
    
                const latestRecipeId = results[0].id;
                const values = ingredients.map(ingredient => [latestRecipeId, ingredient.ingredientName, ingredient.ingredientQuantity]);
    
                const query2 = "INSERT INTO ingredients (recipe_id, name, quantity) VALUES ?";
                db.query(query2, [values], (err, results) => {
                    if (err) {
                        console.error('Error inserting ingredient: ', err);
                        throw err;
                    }
                });
            });
        }
    });
});

router.delete('/delete_recipe/:id', (req, res) => {
    const { id } = req.params;
    try {
        db.query('DELETE FROM ingredients WHERE recipe_id = ?', [id]);
        db.query('DELETE FROM recipes WHERE id = ?', [id]);
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (err) {
        console.error('Error deleting recipe:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;