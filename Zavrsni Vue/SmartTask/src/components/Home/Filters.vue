<template>
    <div id="filter" class="flex">
        <h4>Filters:</h4>
        <select @change="$emit('updateFilterCompletion', $event?.target.value)"  
                        name="completion" id="completion">
            <option value="All">Completion</option>
            <option value="All">All</option>
            <option value="true">Completed</option>
            <option value="false">Active</option>
        </select>
        <select @change="$emit('updateFilterPriority', $event.target.value)"  
                        name="priority" id="priority">
            <option value="All">Priority</option>
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Mid">Mid</option>
            <option value="High">High</option>
        </select>
    </div>
</template>