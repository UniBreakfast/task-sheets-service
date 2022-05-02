module.exports = startServer

const { createServer } = require('http')
const port = process.env.PORT || 3000
const apiHandlers = {GET_tasks}

let service = {}


function startServer(sheetService) {
  const server = createServer(handleRequest)

  service = sheetService
  server.listen(port, reportServerStart)
}

async function handleRequest(request, response) {
  const { method, url } = request

  if (url.startsWith('/api/')) {
    const endpoint = method + '_' + url.slice(5)

    handleAPI(endpoint, request, response)

  } else {
    response.statusCode = 404
    response.end(`404 ${method} ${url}    File/path not found`)
  }
}

async function handleAPI(endpoint, request, response) {
  const handle = apiHandlers[endpoint]

  if (handle) {
    handle(request, response)

  } else {
    response.statusCode = 404
    response.end(`404 ${endpoint}    API/endpoint not found`)
  }
}

async function GET_tasks(request, response) {
  const taskData = await service.getAllTaskData()

  expose({taskData})

  response.setHeader('content-type', 'application/json')
  response.end(JSON.stringify(taskData))
}

function reportServerStart() {
  console.log('Server started at http://localhost:' + port)
}
