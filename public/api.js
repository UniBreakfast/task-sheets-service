const api = {getTasks}

export default api

async function getTasks() {
  return fetch('api/tasks').then(response => response.json())
}
