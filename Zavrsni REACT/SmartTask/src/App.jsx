import Header from './Header.jsx'
import TaskContainerToggle from './TaskContainerToggle.jsx'
import TaskList from './TaskList.jsx'
import LogIn from './LogIn.jsx'
import Filters from './Filters.jsx'
import axios from 'axios'
import React, {useState, useEffect, createContext} from 'react'
export const TaskContext = createContext();

function App() {
    const [editingTask, setEditingTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState({completed: 'All', priority: 'All'});
    const [user, setUser] = useState({
      id: "",
      username: ""
    });
    

    const fetchTasks = () => {
      axios.get(`http://localhost:3000/api/getTasks`, { params: { id: user.id } })
      .then(res => {
        if (res.data.success) {
          setTasks(res.data.tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
        }
      })
      .catch(err => {
        console.error(err);
      });
    }
    useEffect(() => fetchTasks(), [user]);

    if(user.id !== "") {
      return (
      <>  
        <Header>
          <Filters setFilter={setFilter}></Filters>
        </Header>
        <TaskContext.Provider value = {{tasks, editingTask, setEditingTask,
                                        user, fetchTasks}}>
          <TaskContainerToggle />
        </TaskContext.Provider>         
        <TaskContext.Provider value = {{tasks, filter, setEditingTask, fetchTasks}}>
          <TaskList />
        </TaskContext.Provider>
      </>
  );
    } else {
      return(
        <>
          <LogIn setUser={setUser}></LogIn>
        </>
      )
    }
}

export default App
