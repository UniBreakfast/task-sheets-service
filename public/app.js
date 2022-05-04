import api from './api.js'

api.getTasks().then(showTasks)

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
