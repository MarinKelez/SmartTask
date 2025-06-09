
function Filters(props) {

    const changeFilter = (e) => {
        e.target.id === "completion" ? 
            props.setFilter(f => ({...f, completed: e.target.value})) : 
            props.setFilter(f => ({...f, priority: e.target.value})); 
    }

    return (
        <div id="filter" className="flex">
                <h4>Filters:</h4>
                <select name="completion" id="completion" onChange={changeFilter}>
                    <option value="All">Completion</option>
                    <option value="All">All</option>
                    <option value="true">Completed</option>
                    <option value="false">Active</option>
                </select>
                <select name="priority" id="priority" onChange={changeFilter}>
                    <option value="All">Priority</option>
                    <option value="All">All</option>
                    <option value="Low">Low</option>
                    <option value="Mid">Mid</option>
                    <option value="High">High</option>
                </select>
            </div>
    )
}


export default Filters;