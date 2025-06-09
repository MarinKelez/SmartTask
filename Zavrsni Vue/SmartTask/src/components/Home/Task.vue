<template>
    <div class="task flex">
        <div id="title" class="flex">
            <input @click="$emit('changeCompletion', currentTask.id)" type="checkbox"
                   :checked="currentTask.completed" />
            <p :style="{color:chosenColor}" class="boldano flex">
                {{ currentTask.title }} ({{ currentTask.dueDate }})
            </p>
        </div>
        <div id="edit" class="flex">
            <button :style="{backgroundColor: chosenColor}" 
                    @click="$emit('updateTask', currentTask)">
                    Edit
            </button>
            <button :style="{backgroundColor: chosenColor}" 
                    @click="$emit('deleteTask', currentTask.id)">
                    Delete
            </button>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref, watch } from 'vue'
    const props = defineProps(['task'])
    const emit = defineEmits(['changeCompletion', 'updateTask', 'deleteTask'])
    const currentTask = ref({
        id: props.task.id,
        title: props.task.title,
        dueDate: props.task.dueDate,
        priority: props.task.priority,
        completed: props.task.completed
    })
    const determineColor = (priority) => {
        switch (priority) {
            case 'Low':
                return '#9CA3AF';
            case 'Mid':
                return '#FACC15';
            case 'High':
                return '#EF4444';
        }
    }
    const chosenColor = computed(() => {
        return currentTask.value.completed ? '#10B981' : determineColor(currentTask.value.priority);
    })

    watch(() => props.task, (newVal) => {
        currentTask.value = { ...newVal }
    }, { deep: true, immediate: true })
</script>