<script setup>
import { ref, computed, onMounted } from 'vue';
import Header from './../Layout/Header.vue';
import TaskContainerToggle from './TaskContainerToggle.vue';
import TaskList from './TaskList.vue';
import Filters from './Filters.vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
const route = useRoute()

let taskList = ref([])
const filterCompletion = ref("All");
const filterPriority = ref("All");
let taskToUpdate = ref({
    id: "",
    title: "",
    dueDate: "",
    priority: "",
    completed: false
})
const fetchTasks = () => {
      axios.get(`http://localhost:3000/api/getTasks`, { params: { id: route.params.id } })
      .then(res => {
        if (res.data.success) {
          taskList.value = (res.data.tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
        }
      })
      .catch(err => {
        console.error(err);
      });
      resetUpdated();
}
onMounted(() => {
    fetchTasks();
})
const usableTasks = computed(() => {
    let filtered  = taskList.value;

    if (filterCompletion.value !== 'All') {
        let completedVal = filterCompletion.value === "true";
        if(completedVal) completedVal = 1;
        else completedVal = 0;
        filtered = filtered.filter(task => task.completed === completedVal)
    }
    if (filterPriority.value !== 'All') {
        filtered = filtered.filter(task => task.priority === filterPriority.value);
    }

    return filtered;
})
const setUpdated = (taskToUpdateSent) => {
    taskToUpdate.value = { ...taskToUpdateSent };
}
const resetUpdated = () => {
    taskToUpdate.value = {
    id: "",
    title: "",
    dueDate: "",
    priority: "",
    completed: false
  }
}
</script>

<template>
    <Header>
            <Filters
                @updateFilterCompletion="filterCompletion=$event" 
                @updateFilterPriority="filterPriority=$event"
            ></Filters>
    </Header>
    <TaskContainerToggle 
            @refreshTasks="fetchTasks"
            :taskToUpdate="taskToUpdate"
            :username="route.params.name">
    </TaskContainerToggle>
    <TaskList 
            :list="usableTasks" 
            @updateTask="setUpdated"
            @refreshTasks="fetchTasks">
    </TaskList>
</template>