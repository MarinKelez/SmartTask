import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import { TaskContext } from "./App";

function NewTaskContainer(props) {
    const [newTitle, setNewTitle] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newPriority, setNewPriority] = useState();

    const { tasks, editingTask, setEditingTask, user, fetchTasks} = useContext(TaskContext);

    useEffect(() => {
    if (editingTask !== "") {
        const task = tasks.find(t => t.id === editingTask);
        if (task) {
            setNewTitle(task.title);
            setNewDate(task.dueDate);
            setNewPriority(task.priority);
        }
    }
    }, [editingTask]);

    const reset = () => {
        setNewTitle('');
        setNewDate('');
        setNewPriority('');
        setEditingTask('');
    }

    const changeNewTitle = (e) => {
        setNewTitle(e.target.value);
    }
    const changeNewDate = (e) => {
        setNewDate(e.target.value);
    }
    const changeNewPriority = (e) => {
        setNewPriority(e.target.value);
    }
    const changeShowContainer = () => {
        props.setShowing(false);
    }

    const addTask = () => {
        const newTask = {
            title: newTitle,
            dueDate: newDate,
            priority: newPriority,
            completed: false
        };

        if(newTask.title === "" || newTask.dueDate === "" || newTask.priority === "") {
            alert("You must enter a value for all the fields!");
            reset();
            return;
        }

        if(editingTask === "") {
            axios.post('http://localhost:3000/api/tasks', {task: newTask, userId: user.id})
             .then(response => {
                fetchTasks();
             })
             .catch(err => console.log(err));
        } else {
            axios.put(`http://localhost:3000/api/tasks/${editingTask}`, {task: newTask})
            .then(res => {
                fetchTasks();
            })
            .catch(err => console.error(err));
        }   

        reset();
    }

    return (
        <div id="newTaskContainer" style={editingTask === '' ? props.showing ? {display:'flex'} : {display:'none'} : {display:'flex'}}>
            <h2 id="tasksContainerTitle">{editingTask === "" ? "New Task" : "Edit Task"}</h2>
            <label htmlFor="newTaskTitle">Title: <input type="text" id="newTaskTitle" value={newTitle} onChange={changeNewTitle} /></label>
            <label htmlFor="newTaskDue">Due: <input type="date" id="newTaskDue" value={newDate} onChange={changeNewDate} /></label>
            <div>
                <label htmlFor="newTaskPriority">Priority: </label>
                <label htmlFor="Low"><input type="radio" value="Low" checked={newPriority === "Low"} onChange={changeNewPriority} /> Low</label>
                <label htmlFor="Mid"><input type="radio" value="Mid" checked={newPriority === "Mid"} onChange={changeNewPriority} /> Mid</label>
                <label htmlFor="High"><input type="radio" value="High" checked={newPriority === "High"} onChange={changeNewPriority} /> High</label>
            </div>
            <div id="buttons" className="flex">
                <button id="submitNewTask" className="boldano" onClick={addTask}>{editingTask === "" ? "Submit" : "Edit"}</button>
                <button id="hideTasksContainer" className="boldano" onClick={changeShowContainer}>Hide</button>
            </div>
        </div>
    )

}

export default NewTaskContainer;