<template>
        <div id="tasksContainer">
            <h2>Your Tasks</h2>
            <div v-for="task in props.list">
                <Task :task="task"
                      :key="task.id"
                      @changeCompletion="toggleCompletion"
                      @deleteTask="performDeletion"
                      @updateTask="$emit('updateTask', $event)">
                </Task>
            </div>
        </div>
</template>


<script setup>
import Task from './Task.vue'
import axios from 'axios'
const props = defineProps(['list'])
const emit = defineEmits(['refreshTasks', 'updateTask'])

const toggleCompletion = (id) => {
    axios.put(`http://localhost:3000/api/tasks/${id}/toggle`)
         .then(res => {
            emit('refreshTasks')
         })
         .catch(err => console.error(err));
}
const performDeletion = (id) => {
        axios.delete(`http://localhost:3000/api/tasks/${id}`)
             .then(res => {
                emit('refreshTasks')
             })
             .catch(err => console.error(err));
}
</script>