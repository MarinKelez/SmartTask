import axios from 'axios';
import { useContext } from 'react'
import { TaskContext } from './App';

const determineColor = priority => {
        switch (priority) {
                case 'Low':
                    return '#9CA3AF';
                case 'Mid':
                    return '#FACC15';
                case 'High':
                    return '#EF4444';
                default:
                    alert('You have to select a priority value...');
                    return null;
            }
}

function Task(props) {
    const currentTask = props.task
    const { setEditingTask, fetchTasks } = useContext(TaskContext);
    const deleteTask = (e) => {
        axios.delete(`http://localhost:3000/api/tasks/${currentTask.id}`)
             .then(res => {
                fetchTasks();
             })
             .catch(err => console.error(err));
    }
    const startEditing = (e) => {
        setEditingTask(currentTask.id)
    }
    const changeCompletion = () => {
        axios.put(`http://localhost:3000/api/tasks/${currentTask.id}/toggle`)
            .then(res => {
                fetchTasks();
            })
            .catch(err => console.error(err));
    }
    const activeColor = currentTask.completed ? '#10B981' : determineColor(currentTask.priority);

    return (
        <div className="task flex">
            <div id="title" className="flex">
                <input type="checkbox" checked={currentTask.completed} onChange={changeCompletion} />
                <p className="boldano flex" 
                style={{color:activeColor}} >
                    {currentTask.title} ({currentTask.dueDate})
                </p>
            </div>
            <div id="edit" className="flex">
                <button onClick={startEditing} style={{backgroundColor:activeColor}} >Edit</button>
                <button onClick={deleteTask} style={{backgroundColor:activeColor} } >Delete</button>
            </div>
        </div>
    )

}

export default Task;