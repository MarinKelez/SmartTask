import { TaskContext } from './App.jsx';
import Task from './Task.jsx'
import React, {useState, useEffect, useContext} from 'react';

function TaskList() {
    const [usableTasks, setUsableTasks] = useState([]);
    const { tasks, filter } = useContext(TaskContext);

    useEffect(() => {
    let filtered = tasks;
    if (filter.completed !== 'All') {
        let completedVal = filter.completed === "true";
        completedVal = completedVal ? 1 : 0;
        filtered = filtered.filter(task => task.completed === completedVal);
    }
    if (filter.priority !== 'All') {
        filtered = filtered.filter(task => task.priority === filter.priority);
    }
    setUsableTasks(filtered);
    }, [filter, tasks]);

    return (
        <div id="tasksContainer">
            <h2>Your Tasks</h2>
            {usableTasks.map(task => (
                <Task task={task}
                      key={task.id} />
            ))}
        </div>
    );
}

export default TaskList;