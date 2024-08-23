// server.js

const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Set up PostgreSQL connection
const pool = new Pool({
    user: 'postgres',     // Replace with your PostgreSQL username
    host: 'localhost',         // Replace with your database host
    database: 'PP',  // Replace with your database name
    password: 'waakye', // Replace with your PostgreSQL password
    port: 5432,                // Replace with your database port if different
});

app.use(express.json()); // Middleware to parse JSON requests

// Define the /checkout route
app.post('/checkout', async (req, res) => {
    const { items } = req.body; // Assume items is an array of { itemId, quantity }
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        
        for (const item of items) {
            const { itemId, quantity } = item;

            // Check if there's enough inventory
            const inventoryResult = await client.query('SELECT quantity FROM inventory WHERE item_id = $1', [itemId]);
            const availableQuantity = inventoryResult.rows[0]?.quantity;

            if (availableQuantity >= quantity) {
                // Update the inventory
                await client.query('UPDATE inventory SET quantity = quantity - $1 WHERE item_id = $2', [quantity, itemId]);

                // Record the transaction
                await client.query('INSERT INTO transactions (item_id, quantity) VALUES ($1, $2)', [itemId, quantity]);
            } else {
                throw new Error(`Not enough inventory for item ID: ${itemId}`);
            }
        }

        await client.query('COMMIT');
        res.status(200).send('Checkout successful');
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).send('Checkout failed: ' + err.message);
    } finally {
        client.release();
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

