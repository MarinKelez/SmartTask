<template>
    <div id="newTaskContainer" class="flex">
            <h2 id="tasksContainerTitle">{{ updating ? 'Edit Task' : 'New Task' }}</h2>
            <label for="newTaskTitle">Title: 
                <input type="text" v-model="newTask.title" id="newTaskTitle">
            </label>
            <label for="newTaskDue">Due: 
                <input type="date" v-model="newTask.dueDate" id="newTaskDue">
            </label>
            <div>
                <label for="newTaskPriority">Priority: </label>
                <label for="Low">
                    <input type="radio" 
                            v-model="newTask.priority" 
                            name="newTaskPriority" 
                            id="Low" 
                            value="Low"> 
                            Low
                    </label>
                <label for="Mid">
                    <input type="radio" 
                            v-model="newTask.priority" 
                            name="newTaskPriority" 
                            id="Mid" 
                            value="Mid"> 
                            Mid
                </label>
                <label for="High">
                    <input type="radio" 
                            v-model="newTask.priority" 
                            name="newTaskPriority" 
                            id="High" 
                            value="High"> 
                            High
                </label>
            </div>
            <div id="buttons" class="flex">
                <button 
                    @click="addTask" 
                    id="submitNewTask" 
                    class="boldano">
                        {{ updating ? 'Edit' : 'Submit' }}
                </button>
                <button 
                    @click="$emit('stopShowing')" 
                    id="hideTasksContainer" 
                    class="boldano">
                        Hide
                </button>
            </div>
        </div>
</template>

<script setup>
    import { reactive, watch, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import axios from 'axios';
    const route = useRoute();

    const props = defineProps(['taskToUpdate']);
    const emit = defineEmits(['refreshTasks', 'startShowing', 'stopShowing'])

    const updating = computed(() => {
        return props.taskToUpdate.id !== "" ? true : false;
    })

    const newTask = reactive({
        id: "",
        title: "",
        dueDate: "",
        priority: "",
        completed: false
    })
    const addTask = () => {
        if(newTask.id === "") {
            axios.post('http://localhost:3000/api/tasks', {task: newTask, userId: Number(route.params.id)})
             .then(res => {    
                emit('refreshTasks');
             })
             .catch(err => console.error(err));
        } else {
            axios.put(`http://localhost:3000/api/tasks/${newTask.id}`, {task: newTask})
                 .then(res => {
                 emit('refreshTasks');
                 emit('stopShowing');
                 })
                 .catch(err => console.error(err));
        }
        newTask.id = "";
        newTask.title = "";
        newTask.dueDate = "";
        newTask.priority = "";
        newTask.completed = false;
    }

    watch(() => props.taskToUpdate, (newVal) => {
    if (newVal.id !== "") {
        emit('startShowing');
        newTask.id = newVal.id;
        newTask.title = newVal.title;
        newTask.dueDate = newVal.dueDate;
        newTask.priority = newVal.priority;
        newTask.completed = newVal.completed;
    }
    });

</script>