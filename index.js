import express from 'express';
import axios from 'axios';

const app = express();
const port = '3000';

// Serve static files
app.use(express.static("public"));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse JSON
app.use(express.json());

// Route to render the homepage with optional target workouts
app.get('/', async (req, res) => {
    const target = req.query.target; // Retrieve target from query parameters
    let workouts = [];

    if (target) {
        try {
            const response = await axios.request({
                method: 'GET',
                url: `https://exercisedb.p.rapidapi.com/exercises/target/${target}`,
                headers: {
                    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                    'x-rapidapi-key': 'c80505a411mshf9a4cbe43f00cf2p1e27acjsn08f97303c6f5',
                },
            });
            workouts = response.data; // Get the workouts from the API response
        } catch (error) {
            console.error('Error fetching workouts:', error.message);
        }
    }

    // Render the index.ejs template with the workouts data
    res.render('index.ejs', { target, workouts });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port number: ${port}`);
});
