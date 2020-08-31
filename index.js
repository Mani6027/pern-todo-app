// Server file.

const express  = require('express');
const app = express();
const cors  = require('cors');
const pool = require('./db');
const path = require('path');
//process.env.PORT
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// This is not the only way to do it, ther is lot of another ways to do this.
// 1.app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static("client/build"))


if (process.env.NODE_ENV === "production"){
    //server static
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
}

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


// To redirect anything other than perceived routes.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}!!`)
});
