const submitTask = document.getElementById('submitNewTask');
const newTaskTitle = document.getElementById('newTaskTitle');
const newTaskDue = document.getElementById('newTaskDue');
const tasksContainer = document.getElementById('tasksContainer');
const completionFilter = document.getElementById('completion');
const priorityFilter = document.getElementById('priority');
const showNewTask = document.getElementById('showNewTask');
const newTaskContainer = document.getElementById('newTaskContainer');
const hideTasksContainer = document.getElementById('hideTasksContainer');
const tasksContainerTitle = document.getElementById('tasksContainerTitle');
const welcomeMessage = document.getElementById('welcome-message');
const user = JSON.parse(localStorage.getItem('user'));
let idToEdit = "";
let allTasks = [];

const fetchTasks = () => {
  fetch(`/api/getTasks?id=${user.id}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        allTasks = data.tasks;
        sort();
        filter();
      }
    })
    .catch(err => console.error(err));
}

window.onload = () => {
    welcomeMessage.innerText = `Welcome back, ${user.username}!`;
    fetchTasks();
}

const showHide = () => {
    if(getComputedStyle(newTaskContainer).display === 'none') {
        newTaskContainer.style.display = 'flex';
        showNewTask.style.display = 'none';
    } else {
        newTaskContainer.style.display = 'none';
        showNewTask.style.display = 'block';
    }
}

const reset = () => {
    newTaskTitle.value = "";
    newTaskDue.value = "";
    idToEdit = "";
    [...document.querySelectorAll('input[type="radio"]')].forEach(input => {
        input.checked = false;
    });
}

const sort = () => {
    allTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

const determineColor = priority => {
    switch (priority) {
            case 'Low':
                return '#9CA3AF';
            case 'Mid':
                return '#FACC15';
            case 'High':
                return '#EF4444';
        }
}

const refresh = tasks => {
    tasksContainer.innerHTML = "<h2 id='tasksContainerTitle'>Your Tasks</h2>";
    tasks.forEach(task => {
        const activeColor = task.completed ? '#10B981' : determineColor(task.priority);
        tasksContainer.innerHTML += 
        `
            <div class="task flex">
            <div id="title" class="flex">
                <input onClick="changeActivity('${task.id}')" ${task.completed ? 'checked' : ''} type="checkbox" >
                <p style="color:${activeColor}" class="boldano flex">${task.title} (${task.dueDate})</p>
            </div>
            <div id="edit" class="flex">
                <button onclick="editTask('${task.id}')" style="background-color:${activeColor}">Edit</button>
                <button onclick="deleteTask('${task.id}')" style="background-color:${activeColor}">Delete</button>
            </div>
            </div>
        `
    })
}

const filter = () => {
  let usableTasks = allTasks;

  if (completionFilter.value !== 'All') {
    const completedVal = completionFilter.value === 'true';
    usableTasks = usableTasks.filter(task => task.completed == completedVal);
  }

  if (priorityFilter.value !== 'All') {
    usableTasks = usableTasks.filter(task => task.priority === priorityFilter.value);
  }

  refresh(usableTasks);
}

const deleteTask = id => {
  fetch(`/api/tasks/${id}`, { method: 'DELETE' }).then(response => {
      if (!response.ok) throw new Error('Delete failed');
      return response.json();
    })
    .then(() => fetchTasks())
    .catch(err => console.error(err));
}
const changeActivity = id => {
    fetch(`/api/tasks/${id}/toggle`, { method: 'PUT' })
    .then(response => {
        return response.json();
    })
    .then(() => {
        fetchTasks()
    })
    .catch(err => console.error(err));
}

const editTask = id => {
    if (getComputedStyle(newTaskContainer).display === 'none') showHide();
    const task = allTasks.find(task =>  task.id == id);
    if (task) {
        idToEdit = task.id;
        newTaskTitle.value = task.title;
        newTaskDue.value = task.dueDate;
        document.querySelector(`input[id="${task.priority}"]`).checked = true;
    }
    submitTask.innerText = "Edit"
    tasksContainerTitle.innerText = "Edit Task"
}

submitTask.addEventListener('click', () => {
    const priorityCurrent = document.querySelector('input[name="newTaskPriority"]:checked').value;
    if(priorityCurrent === "" || newTaskTitle.value === "" || newTaskDue.value === "") {
        alert('You have to select a title, due date and priority level for your task!');
        reset();
        return;
    }
    const newTask = {
        title: newTaskTitle.value,
        dueDate: newTaskDue.value,
        priority: priorityCurrent,
        completed: false
    }
    const url = idToEdit ? `/api/tasks/${idToEdit}` : '/api/tasks';
    const method = idToEdit ? 'PUT' : 'POST';
    const body = idToEdit
    ? JSON.stringify({ task: newTask })
    : JSON.stringify({ task: newTask, userId: user.id });

    fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body
    })
    .then(res => res.json())
    .then(() => fetchTasks())
    .catch(err => console.error(err));
    if(tasksContainerTitle.innerText === "Edit Task") {
        tasksContainerTitle.innerText = "New Task";
        submitTask.innerText = "Submit";
        showHide();
    }
    reset();
});

completionFilter.addEventListener('change', () => filter())
priorityFilter.addEventListener('change', () => filter())
showNewTask.addEventListener('click', showHide)
hideTasksContainer.addEventListener('click', showHide)