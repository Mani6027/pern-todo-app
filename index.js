// Server file.

const express  = require('express');
const app = express();
const cors  = require('cors');
const pool = require('./db')

//middleware
app.use(cors());
app.use(express.json());

//ROUTUES

//create a todo
app.post('/todos', async(req, res) => {
    try{
        const { description } = req.body;
        if (!description){
            res.status(400);
            res.json({status: 'error', message: 'Please provide any values'}), 400;
        }
        const result = await pool.query('INSERT INTO todo(description) VALUES($1) RETURNING *', [description]);
        const response = {
            rowCount: result.rowCount,
            rows: result.rows,
        }
        res.json(response)
    }catch(err){
        console.error(err.message)
    }
});

//read all rodo
app.get('/todos', async(req, res) => {
    try{
        const result = await pool.query('SELECT * FROM todo');
        const response = {
            rowCount: result.rowCount,
            rows: result.rows,
        };
        res.json(response);
    }catch(err){
        res.json(err.message);
    }

});

//get a todo
app.get('/todos/:id', async(req, res) => {
    try{
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
        const response = {rowCount: result.rowCount,
        rows: result.rows};
        res.json(response);
    }catch(err){
        res.json(err.message);        
    }
});

//update a todo
app.put('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const result = await pool.query(`UPDATE todo SET description = $1 WHERE todo_id=${id} RETURNING *`, [description]);
        const response = {rowCount: result.rowCount,
        rows: result.rows};
        res.json(response);
    } catch (error) {
        res.json(error.message)
    }
});

//delete a todo
app.delete('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query(`DELETE FROM todo WHERE todo_id=${id}`);
        res.status(200).send('Todo was deleted!');
    } catch (error) {
        res.json(error.message);
    }
});


app.listen(5000, () => {
    console.log('Server started at port 5000!!')
});
