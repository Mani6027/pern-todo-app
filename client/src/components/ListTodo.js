import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const ListTodo = () => {
    const [todos, setTodo] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/todos');
            const data = await response.json();

            setTodo(data.rows);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    const deleteTodo = async id => {
        try {
            await fetch(`http://127.0.0.1:5000/todos/${id}`, {
                method: 'DELETE',
            });

            setTodo(todos.filter(todo => (todo.todo_id !== id)));
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1>List of Todo</h1>
            {" "}
            <table className='table mt-5 text-center'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => {
                        return (
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td><EditTodo todo={todo} /></td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Fragment>
    )
};

export default ListTodo;

