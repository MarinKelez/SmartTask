<template>
    <h1>Welcome Back, {{ props.username }}!</h1>
    <button v-show="!showing" @click="changeShowing" 
            id="showNewTask" class="boldano">
            New Task
    </button>
    <NewTaskContainer 
                      v-show="showing" 
                      :taskToUpdate="taskToUpdate" 
                      @refreshTasks="$emit('refreshTasks')"
                      @stopShowing="showing = !showing"
                      @startShowing="showing = true">
    </NewTaskContainer>
</template>

<script setup>
    import NewTaskContainer from './NewTaskContainer.vue'
    import { ref } from  "vue"
    const showing  = ref(false);
    const props = defineProps(['taskToUpdate', 'username'])
    defineEmits(['refreshTasks'])

    const changeShowing = () => {
        showing.value = !showing.value;
    }
</script>