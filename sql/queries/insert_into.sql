-- 1. Vanilla Cake
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Classic Vanilla Cake',
  'Dessert',
  'Preheat the Oven: Preheat your oven to 350°F (175°C)... Enjoy your classic vanilla cake!'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (1, 'All-purpose flour', '2 cups'),
  (1, 'Granulated sugar', '1 1/2 cups'),
  (1, 'Baking powder', '1 tablespoon'),
  (1, 'Salt', '1/2 teaspoon'),
  (1, 'Milk', '1 cup'),
  (1, 'Unsalted butter (softened)', '1/2 cup'),
  (1, 'Large eggs', '2'),
  (1, 'Vanilla extract', '2 teaspoons');

-- 2. Chocolate Cake
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Chocolate Cake',
  'Dessert',
  'Preheat your oven to 350°F (175°C)... Enjoy your delicious chocolate cake!'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (2, 'All-purpose flour', '1 and 3/4 cups'),
  (2, 'Granulated sugar', '1 and 1/2 cups'),
  (2, 'Unsweetened cocoa powder', '3/4 cup'),
  (2, 'Baking powder', '1 and 1/2 teaspoons'),
  (2, 'Baking soda', '1 and 1/2 teaspoons'),
  (2, 'Salt', '1 teaspoon'),
  (2, 'Eggs', '2 large'),
  (2, 'Whole milk', '1 cup'),
  (2, 'Vegetable oil', '1/2 cup'),
  (2, 'Vanilla extract', '2 teaspoons'),
  (2, 'Boiling water', '1 cup');

-- 3. Carbonara
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Spaghetti Carbonara',
  'Italian Pasta',
  'Cook spaghetti in salted boiling water... Season with black pepper.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (3, 'Spaghetti', '350g'),
  (3, 'Pancetta or guanciale, diced', '150g'),
  (3, 'Eggs', '3 large'),
  (3, 'Grated Parmesan cheese', '50g'),
  (3, 'Grated Pecorino Romano cheese', '50g'),
  (3, 'Freshly ground black pepper', NULL);

-- 4. Chicken Tikka Masala
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Chicken Tikka Masala',
  'Indian Curry',
  'Marinate chicken in yogurt... serve with rice or naan bread.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (4, 'Boneless chicken, diced', '500g'),
  (4, 'Plain yogurt', '1 cup'),
  (4, 'Tikka masala paste', '3 tablespoons'),
  (4, 'Vegetable oil', '2 tablespoons'),
  (4, 'Onion, finely chopped', '1'),
  (4, 'Cloves garlic, minced', '2'),
  (4, 'Ground cumin', '1 teaspoon'),
  (4, 'Ground coriander', '1 teaspoon'),
  (4, 'Paprika', '1 teaspoon'),
  (4, 'Tomato puree', '1 cup'),
  (4, 'Salt and pepper to taste', NULL);

-- 5. Caesar Salad
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Caesar Salad',
  'Salad',
  'In a large bowl, toss chopped romaine... and serve immediately.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (5, 'Romaine lettuce, chopped', '1 head'),
  (5, 'Caesar dressing', '1/2 cup'),
  (5, 'Grated Parmesan cheese', '1/4 cup'),
  (5, 'Croutons', '1 cup');

-- 6. Beef Stir-Fry
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Beef Stir-Fry',
  'Asian Stir-Fry',
  'Marinate beef... Serve hot over cooked rice.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (6, 'Beef sirloin, thinly sliced', '500g'),
  (6, 'Soy sauce', '2 tablespoons'),
  (6, 'Oyster sauce', '1 tablespoon'),
  (6, 'Sesame oil', '1 tablespoon'),
  (6, 'Garlic, minced', '2 cloves'),
  (6, 'Onion, sliced', '1'),
  (6, 'Bell pepper, sliced', '1'),
  (6, 'Broccoli florets', '1 cup'),
  (6, 'Cooked rice, for serving', NULL);

-- 7. Margarita Pizza
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Margarita Pizza',
  'Italian Pizza',
  'Preheat oven to 220°C... before serving.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (7, 'Pizza dough', NULL),
  (7, 'Tomato sauce', '1/2 cup'),
  (7, 'Shredded mozzarella cheese', '1 cup'),
  (7, 'Fresh basil leaves', NULL),
  (7, 'Olive oil', NULL),
  (7, 'Salt and pepper to taste', NULL);

-- 8. Chocolate Chip Cookies
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Chocolate Chip Cookies',
  'Dessert',
  'Preheat oven to 180°C... cool completely.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (8, 'Unsalted butter, softened', '1 cup'),
  (8, 'Granulated sugar', '1 cup'),
  (8, 'Packed brown sugar', '1 cup'),
  (8, 'Eggs', '2 large'),
  (8, 'Vanilla extract', '1 teaspoon'),
  (8, 'All-purpose flour', '3 cups'),
  (8, 'Baking soda', '1 teaspoon'),
  (8, 'Salt', '1/2 teaspoon'),
  (8, 'Semisweet chocolate chips', '2 cups');

-- 9. French Toast
INSERT INTO recipes (name, category, instructions)
VALUES (
  'French Toast',
  'Breakfast',
  'In a bowl, whisk together eggs, milk, cinnamon, and vanilla. Dip slices of bread into the mixture, coating both sides. Heat butter in a skillet over medium heat. Cook bread slices until golden brown on both sides. Serve hot with syrup or fruit.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (9, 'Bread slices', '6'),
  (9, 'Eggs', '3'),
  (9, 'Milk', '1/2 cup'),
  (9, 'Ground cinnamon', '1 teaspoon'),
  (9, 'Vanilla extract', '1 teaspoon'),
  (9, 'Butter', '2 tablespoons'),
  (9, 'Maple syrup or fruit, for serving', NULL);

-- 10. Tomato Basil Soup
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Tomato Basil Soup',
  'Soup',
  'Sauté onions and garlic in olive oil until soft. Add canned tomatoes and broth, simmer for 20 minutes. Add basil and blend until smooth. Season with salt and pepper. Serve warm.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (10, 'Olive oil', '2 tablespoons'),
  (10, 'Onion, chopped', '1'),
  (10, 'Garlic, minced', '2 cloves'),
  (10, 'Canned tomatoes', '800g'),
  (10, 'Vegetable broth', '2 cups'),
  (10, 'Fresh basil leaves', '1/2 cup'),
  (10, 'Salt and pepper to taste', NULL);

-- 11. Greek Salad
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Greek Salad',
  'Salad',
  'Combine chopped cucumbers, tomatoes, red onion, olives, and feta in a bowl. Drizzle with olive oil and lemon juice. Season with oregano, salt, and pepper. Toss and serve.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (11, 'Cucumber, chopped', '1'),
  (11, 'Tomatoes, chopped', '2'),
  (11, 'Red onion, sliced', '1/2'),
  (11, 'Kalamata olives', '1/2 cup'),
  (11, 'Feta cheese, crumbled', '1/2 cup'),
  (11, 'Olive oil', '2 tablespoons'),
  (11, 'Lemon juice', '1 tablespoon'),
  (11, 'Dried oregano', '1 teaspoon'),
  (11, 'Salt and pepper to taste', NULL);

-- 12. Fluffy Pancakes
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Fluffy Pancakes',
  'Breakfast',
  'In a bowl, mix flour, sugar, baking powder, and salt. In another bowl, whisk milk, egg, and melted butter. Combine mixtures and stir until just combined. Cook on a greased skillet until bubbles form and flip. Serve with syrup or fruit.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (12, 'All-purpose flour', '1 and 1/2 cups'),
  (12, 'Sugar', '2 tablespoons'),
  (12, 'Baking powder', '3 and 1/2 teaspoons'),
  (12, 'Salt', '1/2 teaspoon'),
  (12, 'Milk', '1 and 1/4 cups'),
  (12, 'Egg', '1'),
  (12, 'Butter, melted', '3 tablespoons'),
  (12, 'Syrup or fruit for serving', NULL);

-- 13. Guacamole
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Guacamole',
  'Dip',
  'Mash avocados in a bowl. Mix in chopped onion, tomato, lime juice, cilantro, salt, and pepper. Serve immediately with tortilla chips.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (13, 'Ripe avocados', '2'),
  (13, 'Red onion, finely chopped', '1/4 cup'),
  (13, 'Tomato, diced', '1'),
  (13, 'Lime juice', '2 tablespoons'),
  (13, 'Fresh cilantro, chopped', '2 tablespoons'),
  (13, 'Salt and pepper to taste', NULL);

-- 14. Mac and Cheese
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Mac and Cheese',
  'Comfort Food',
  'Cook pasta. In a saucepan, make a roux with butter and flour. Slowly whisk in milk and cook until thickened. Stir in cheese until melted. Combine with pasta and serve hot.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (14, 'Macaroni pasta', '2 cups'),
  (14, 'Butter', '2 tablespoons'),
  (14, 'All-purpose flour', '2 tablespoons'),
  (14, 'Milk', '2 cups'),
  (14, 'Cheddar cheese, shredded', '2 cups'),
  (14, 'Salt and pepper to taste', NULL);

-- 15. Tuna Sandwich
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Tuna Sandwich',
  'Lunch',
  'Mix tuna with mayonnaise, celery, onion, and seasonings. Spread onto bread slices. Add lettuce if desired. Serve immediately or wrap for later.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (15, 'Canned tuna', '1 can'),
  (15, 'Mayonnaise', '2 tablespoons'),
  (15, 'Celery, finely chopped', '1 stalk'),
  (15, 'Red onion, chopped', '2 tablespoons'),
  (15, 'Salt and pepper', NULL),
  (15, 'Bread slices', '2'),
  (15, 'Lettuce leaves (optional)', NULL);

-- 16. Lentil Soup
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Lentil Soup',
  'Soup',
  'Sauté onion, garlic, carrot, and celery in olive oil. Add lentils, broth, and spices. Simmer until lentils are tender. Season and serve hot.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (16, 'Olive oil', '2 tablespoons'),
  (16, 'Onion, chopped', '1'),
  (16, 'Garlic, minced', '2 cloves'),
  (16, 'Carrot, diced', '1'),
  (16, 'Celery stalk, diced', '1'),
  (16, 'Dried lentils', '1 cup'),
  (16, 'Vegetable broth', '4 cups'),
  (16, 'Cumin', '1 teaspoon'),
  (16, 'Salt and pepper to taste', NULL);

-- 17. Cheese Omelette
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Cheese Omelette',
  'Breakfast',
  'Beat eggs with salt and pepper. Heat butter in a pan. Pour in eggs and cook until mostly set. Add cheese and fold the omelette. Serve hot.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (17, 'Eggs', '3'),
  (17, 'Salt and pepper', NULL),
  (17, 'Butter', '1 tablespoon'),
  (17, 'Grated cheese', '1/2 cup');

-- 18. Veggie Wrap
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Veggie Wrap',
  'Lunch',
  'Spread hummus on tortilla. Layer with lettuce, tomato, cucumber, and shredded carrots. Roll tightly and slice in half.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (18, 'Tortilla wraps', '2'),
  (18, 'Hummus', '1/4 cup'),
  (18, 'Lettuce leaves', '2'),
  (18, 'Tomato, sliced', '1'),
  (18, 'Cucumber, sliced', '1/2'),
  (18, 'Shredded carrots', '1/4 cup');

-- 19. Garlic Bread
INSERT INTO recipes (name, category, instructions)
VALUES (
  'Garlic Bread',
  'Side',
  'Mix softened butter with minced garlic and parsley. Spread on sliced baguette. Bake at 180°C for 10 minutes until golden and crispy.'
);

INSERT INTO ingredients (recipe_id, name, quantity)
VALUES 
  (19, 'Baguette, sliced', '1'),
  (19, 'Butter, softened', '1/2 cup'),
  (19, 'Garlic, minced', '3 cloves'),
  (19, 'Fresh parsley, chopped', '2 tablespoons'),
  (19, 'Salt', 'a pinch');
