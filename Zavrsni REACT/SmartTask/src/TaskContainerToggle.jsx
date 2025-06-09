import NewTaskContainer from "./NewTaskContainer";
import { useState, useContext } from 'react'
import { TaskContext } from "./App";

function TaskContainerToggle(props) {
    const [showing, setShowing] = useState(false);
    const { user } = useContext(TaskContext);

    const changeShowContainer = () => {
        setShowing(s => !s)
    }

    return (
        <>
            <h1>Welcome back, { user.username }!</h1>

            <button id="showNewTask" className="boldano" onClick={changeShowContainer} 
            style={showing ? {display:'none'} : {display:'block'}}>
            New Task
            </button>
            
            <NewTaskContainer style={showing ? {display:'block'} : {display:'none'}}
                              showing={showing}
                              setShowing={setShowing}  ></NewTaskContainer>
        </>
    );
}

export default TaskContainerToggle;