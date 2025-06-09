const submitTask = $('#submitNewTask');
const newTaskTitle = $('#newTaskTitle');
const newTaskDue = $('#newTaskDue');
const tasksContainer = $('#tasksContainer');
const completionFilter = $('#completion');
const priorityFilter = $('#priority');
const showNewTask = $('#showNewTask');
const newTaskContainer = $('#newTaskContainer');
const hideTasksContainer = $('#hideTasksContainer');
const tasksContainerTitle = $('#tasksContainerTitle');
const welcomeMessage = $('#welcome-message');

const user = JSON.parse(localStorage.getItem('user'));
let idToEdit = "";
let allTasks = [];

const fetchTasks = () => {
  $.getJSON(`/api/getTasks?id=${user.id}`)
    .done(data => {
      if(data.success){
        allTasks = data.tasks;
        sort();
        filter();
      }
    })
    .fail(err => console.error(err));
}

$(window).on('load', () => {
  welcomeMessage.text(`Welcome back, ${user.username}!`);
  fetchTasks();
});

const showHide = () => {
  if(newTaskContainer.css('display') === 'none'){
    newTaskContainer.css('display', 'flex');
    showNewTask.hide();
  } else {
    newTaskContainer.hide();
    showNewTask.show();
  }
}

const reset = () => {
  newTaskTitle.val('');
  newTaskDue.val('');
  idToEdit = "";
  $('input[type="radio"]').prop('checked', false);
}

const sort = () => {
  allTasks.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
}

const determineColor = priority => {
  switch(priority){
    case 'Low': return '#9CA3AF';
    case 'Mid': return '#FACC15';
    case 'High': return '#EF4444';
    default:
      alert('You have to select a priority value...');
      return null;
  }
}

const refresh = tasks => {
  tasksContainer.html("<h2 id='tasksContainerTitle'>Your Tasks</h2>");
  tasks.forEach(task => {
    const activeColor = task.completed ? '#10B981' : determineColor(task.priority);
    tasksContainer.append(`
      <div class="task flex">
        <div id="title" class="flex">
          <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="changeActivity('${task.id}')">
          <p style="color:${activeColor}" class="boldano flex">${task.title} (${task.dueDate})</p>
        </div>
        <div id="edit" class="flex">
          <button onclick="editTask('${task.id}')" style="background-color:${activeColor}">Edit</button>
          <button onclick="deleteTask('${task.id}')" style="background-color:${activeColor}">Delete</button>
        </div>
      </div>
    `);
  });
}

const filter = () => {
  let usableTasks = allTasks;

  if(completionFilter.val() !== 'All'){
    const completedVal = completionFilter.val() === 'true';
    usableTasks = usableTasks.filter(task => task.completed == completedVal);
  }

  if(priorityFilter.val() !== 'All'){
    usableTasks = usableTasks.filter(task => task.priority === priorityFilter.val());
  }

  refresh(usableTasks);
}

const deleteTask = id => {
  $.ajax({
    url: `/api/tasks/${id}`,
    method: 'DELETE'
  }).done(() => fetchTasks())
    .fail(err => console.error(err));
}

const changeActivity = id => {
  $.ajax({
    url: `/api/tasks/${id}/toggle`,
    method: 'PUT'
  }).done(() => {
    fetchTasks();
  }).fail(err => console.error(err));
}

const editTask = id => {
  if(newTaskContainer.css('display') === 'none') showHide();
  const task = allTasks.find(t => t.id == id);
  if(task){
    idToEdit = task.id;
    newTaskTitle.val(task.title);
    newTaskDue.val(task.dueDate);
    $(`input[id="${task.priority}"]`).prop('checked', true);
  }
  submitTask.text("Edit");
  tasksContainerTitle.text("Edit Task");
}

submitTask.on('click', () => {
  const priorityCurrent = $('input[name="newTaskPriority"]:checked').val();
  if(!priorityCurrent || !newTaskTitle.val() || !newTaskDue.val()){
    alert('You have to select a title, due date and priority level for your task!');
    reset();
    return;
  }

  const newTask = {
    title: newTaskTitle.val(),
    dueDate: newTaskDue.val(),
    priority: priorityCurrent,
    completed: false
  };

  const url = idToEdit ? `/api/tasks/${idToEdit}` : '/api/tasks';
  const method = idToEdit ? 'PUT' : 'POST';
  const body = idToEdit
    ? JSON.stringify({ task: newTask })
    : JSON.stringify({ task: newTask, userId: user.id });

  $.ajax({
    url,
    method,
    contentType: 'application/json',
    data: body
  }).done(() => fetchTasks())
    .fail(err => console.error(err));

  if(tasksContainerTitle.text() === "Edit Task"){
    tasksContainerTitle.text("New Task");
    submitTask.text("Submit");
    showHide();
  }
  reset();
});

completionFilter.on('change', filter);
priorityFilter.on('change', filter);
showNewTask.on('click', showHide);
hideTasksContainer.on('click', showHide);
