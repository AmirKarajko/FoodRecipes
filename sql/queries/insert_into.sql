INSERT INTO recipes (name, category, instructions)
VALUES ('Classic Vanilla Cake', 'Dessert', 'Preheat the Oven: Preheat your oven to 350°F (175°C). Grease and flour two 9-inch round cake pans. Mix Dry Ingredients: In a large mixing bowl, whisk together the flour, sugar, baking powder, and salt until well combined. Combine Wet Ingredients: In another bowl, beat together the milk, softened butter, eggs, and vanilla extract until smooth. Combine Wet and Dry Mixtures: Gradually add the wet ingredients to the dry ingredients, mixing until just combined. Be careful not to overmix, as it can result in a dense cake. Pour Batter into Pans: Divide the batter evenly between the prepared cake pans, smoothing the tops with a spatula. Bake: Place the pans in the preheated oven and bake for 25-30 minutes, or until a toothpick inserted into the center of the cakes comes out clean. Cool: Remove the cakes from the oven and allow them to cool in the pans for 10 minutes. Then, transfer them to a wire rack to cool completely. Frosting (Optional): Once the cakes are completely cooled, you can frost them with your favorite frosting, such as buttercream or cream cheese frosting. Serve: Slice and serve the cake as desired. Enjoy your classic vanilla cake!');

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES (1, 'All-purpose flour', '2 cups'),
       (1, 'Granulated sugar', '1 1/2 cups'),
       (1, 'Baking powder', '1 tablespoon'),
       (1, 'Salt', '1/2 teaspoon'),
       (1, 'Milk', '1 cup'),
       (1, 'Unsalted butter (softened)', '1/2 cup'),
       (1, 'Large eggs', '2'),
       (1, 'Vanilla extract', '2 teaspoons');

INSERT INTO recipes (name, category, instructions)
VALUES ('Chocolate Cake', 'Dessert', 'Preheat your oven to 350°F (175°C). Grease and flour two 9-inch round cake pans. In a large mixing bowl, sift together the flour, sugar, cocoa powder, baking powder, baking soda, and salt. Add eggs, milk, vegetable oil, and vanilla extract to the dry ingredients mixture. Beat on medium speed for 2 minutes until well combined. Stir in the boiling water into the batter. The batter will be thin, but this is normal. Pour the batter evenly into the prepared cake pans. Bake in the preheated oven for 30 to 35 minutes, or until a toothpick inserted into the center comes out clean. Remove the cakes from the oven and let them cool in the pans for 10 minutes. After 10 minutes, remove the cakes from the pans and transfer them to a wire rack to cool completely. Once the cakes are cooled, you can frost them with your favorite frosting or ganache. Enjoy your delicious chocolate cake!');

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES (2, 'All-purpose flour', '1 and 3/4 cups'),
       (2, 'Granulated suga', '1 and 1/2 cups'),
       (2, 'Unsweetened cocoa powder', '3/4 cup'),
       (2, 'Baking powder', '1 and 1/2 teaspoons'),
       (2, 'Baking soda', '1 and 1/2 teaspoons'),
       (2, 'Salt', '1 teaspoon'),
       (2, 'Eggs', '2 large'),
       (2, 'Whole milk', '1 cup'),
       (2, 'Vegetable oil', '1/2 cup'),
       (2, 'Vanilla extract', '2 teaspoons'),
       (2, 'Boiling water', '1 cup');

INSERT INTO recipes (name, category, instructions)
VALUES ('Spaghetti Carbonara', 'Italian Pasta', 'Cook spaghetti in salted boiling water until al dente. While spaghetti cooks, fry pancetta in a skillet until crispy. In a bowl, whisk eggs with Parmesan and Pecorino Romano cheeses. Drain spaghetti, reserving some cooking water. Toss hot spaghetti with pancetta and egg mixture until creamy. Add cooking water if needed. Season with black pepper.');

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES (3, 'Spaghetti', '350g'),
       (3, 'Pancetta or guanciale, diced', '150g'),
       (3, 'Eggs', '3 large'),
       (3, 'Grated Parmesan cheese', '50g'),
       (3, 'Grated Pecorino Romano cheese', '50g'),
       (3, 'Freshly ground black pepper', '');

INSERT INTO recipes (name, category, instructions)
VALUES ('Chicken Tikka Masala', 'Indian Curry', 'Marinate chicken in yogurt and tikka masala paste for at least 1 hour. Heat oil in a pan, sauté onion and garlic until soft. Add chicken and marinade to the pan, cook until browned. Stir in spices and tomato puree, simmer for 15-20 minutes. Season with salt and pepper, serve with rice or naan bread.');

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES (4, 'Boneless chicken, diced', '500g'),
       (4, 'Plain yogurt', '1 cup'),
       (4, 'Tikka masala paste', '3 tablespoons'),
       (4, 'Vegetable oil', '2 tablespoons'),
       (4, 'Onion, finely chopped', '1'),
       (4, 'Cloves garlic, minced', '2'),
       (4, 'Ground cumin', '1 teaspoon'),
       (4, 'Ground coriander', '1 teaspoon'),
       (4, 'Paprika', '1 teaspoon'),
       (4, 'Tomato puree', '1 cup'),
       (4, 'Salt and pepper to taste', '');

INSERT INTO recipes (name, category, instructions)
VALUES ('Caesar Salad', 'Salad', 'In a large bowl, toss chopped romaine lettuce with Caesar dressing until evenly coated. Sprinkle grated Parmesan cheese over the salad. Add croutons on top and serve immediately.');

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES (5, 'Romaine lettuce, chopped', '1 head'),
       (5, 'Caesar dressing', '1/2 cup'),
       (5, 'Grated Parmesan cheese', '1/4 cup'),
       (5, 'Croutons', '1 cup');

INSERT INTO recipes (name, category, instructions)
VALUES ('Beef Stir-Fry', 'Asian Stir-Fry', 'Marinate beef in soy sauce, oyster sauce, and sesame oil for 30 minutes. Heat oil in a wok or large skillet, stir-fry garlic until fragrant. Add marinated beef, cook until browned. Add onion, bell pepper, and broccoli, stir-fry until vegetables are tender. Serve hot over cooked rice');

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES (6, 'Beef sirloin, thinly sliced', '500g'),
       (6, 'Soy sauce', '2 tablespoons'),
       (6, 'Oyster sauce', '1 tablespoon'),
       (6, 'Sesame oil', '1 tablespoon'),
       (6, 'Garlic, minced', '2 cloves'),
       (6, 'Onion, sliced', '1'),
       (6, 'Bell pepper, sliced', '1'),
       (6, 'Broccoli florets', '1 cup'),
       (6, 'Cooked rice, for serving', '');

INSERT INTO recipes (name, category, instructions)
VALUES ('Margarita Pizza', 'Italian Pizza', 'Preheat oven to 220°C (425°F). Roll out pizza dough into a circle. Spread tomato sauce evenly over the dough, leaving a border. Sprinkle shredded mozzarella cheese on top. Drizzle olive oil over the pizza, season with salt and pepper. Bake in the preheated oven for 12-15 minutes, until crust is golden and cheese is bubbly. Garnish with fresh basil leaves before serving.');

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES (7, 'Pizza dough', ''),
       (7, 'Tomato sauce', '1/2 cup'),
       (7, 'Shredded mozzarella cheese', '1 cup'),
       (7, 'Fresh basil leaves', ''),
       (7, 'Olive oil', ''),
       (7, 'Salt and pepper to taste', '');

INSERT INTO recipes (name, category, instructions)
VALUES ('Chocolate Chip Cookies', 'Dessert', 'Preheat oven to 180°C (350°F). In a large bowl, cream together butter, granulated sugar, and brown sugar until light and fluffy. Beat in eggs one at a time, then stir in vanilla extract. In a separate bowl, combine flour, baking soda, and salt. Gradually add to the creamed mixture and mix well. Stir in chocolate chips. Drop by rounded spoonfuls onto ungreased baking sheets. Bake for 10-12 minutes, until edges are golden brown. Cool on baking sheets for a few minutes before transferring to wire racks to cool completely.');

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES (8, 'Unsalted butter, softened', '1 cup'),
       (8, 'Granulated sugar', '1 cup'),
       (8, 'Packed brown sugar', '1 cup'),
       (8, 'Eggs', '2 large'),
       (8, 'Vanilla extract', '1 teaspoon'),
       (8, 'All-purpose flour', '3 cups'),
       (8, 'Baking soda', '1 teaspoon'),
       (8, 'Salt', '1/2 teaspoon'),
       (8, 'Semisweet chocolate chips', '2 cups');