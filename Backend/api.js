const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('./database');

router.use(bodyParser.json());
router.use(fileUpload());

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
    const ingredientsArray = JSON.parse(ingredients);

    db.query("INSERT INTO recipes (name, category, instructions) VALUES (?, ?, ?)", [name, category, instructions], (err, results) => {
        if (err) {
            console.error('Error inserting recipe: ', err);
            res.status(500).send('Error inserting recipe');
            return;
        }
        res.sendStatus(200);
    });

    db.query("SELECT id FROM recipes ORDER BY id DESC LIMIT 1", (err, results) => {
        if (err) {
            console.error('Error fetching recipe ID: ', err);
            return;
        }
        const recipeID = results[0].id;

        if (ingredientsArray != null && ingredientsArray.length > 0) {
            const values = ingredientsArray.map(ingredient => [recipeID, ingredient.ingredientName, ingredient.ingredientQuantity]);
            db.query("INSERT INTO ingredients (recipe_id, name, quantity) VALUES ?", [values], (err, results) => {
                if (err) {
                    console.error('Error inserting ingredient: ', err);
                    return;
                }
            });
        }

        if (req.files && Object.keys(req.files).length > 0) {
            const image = req.files.image;
            if (image && image.mimetype.startsWith('image/')) {
                db.query("INSERT INTO images (recipe_id, name, data) VALUES (?, ?, ?)", [recipeID, image.name, image.data], (err, results) => {
                    if (err) {
                        console.error('Error inserting image: ', err);
                        return;
                    }
                });
            }
        }
    });
});

router.delete('/delete_recipe/:id', (req, res) => {
    const { id } = req.params;
    try {
        db.query('DELETE FROM images WHERE recipe_id = ?', [id]);
        db.query('DELETE FROM ingredients WHERE recipe_id = ?', [id]);
        db.query('DELETE FROM recipes WHERE id = ?', [id]);
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (err) {
        console.error('Error deleting recipe:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/images/:id', (req, res) => {
    const { id } = req.params;
    db.query(`SELECT data FROM images WHERE recipe_id = ${id}`, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if(results.length === 0) {
            // res.status(400).send('Image not found');
            return;
        }

        const data = results[0].data;

        res.send(data);
    });
});

module.exports = router;