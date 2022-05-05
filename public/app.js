import api from './api.js'

if (location.hostname != '127.0.0.1') api.getTasks().then(showTasks)

addTaskBtn.onclick = toggleAddTaskModal

addTaskModal.onmousedown = ({target}) => {
  if (target == addTaskModal) toggleAddTaskModal()
}

addTaskForm.onsubmit = submitNewTask

function showTasks(allTaskData) {
  taskList.innerHTML = allTaskData.values.map(taskValues => {
    const [id, task] = taskValues

    return /* html */`
      <li class="task">
        <div class="task-id-place">
          <p class="task-id">${id}</p>
        </div>
        <div class="task-name-place">
          <p class="task-name">${task}</p>
        </div>
      </li>
    `
  }).join('')
}

function toggleAddTaskModal() {
  addTaskModal.hidden = !addTaskModal.hidden
}

function submitNewTask() {

}
