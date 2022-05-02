globalThis.expose = expose

process.on('uncaughtException', console.log)

const connectToTaskSheet = require('./sheetService')
const startServer = require('./server')

connectToTaskSheet().then(startServer)

setTimeout(setTimeout, 1e7)

function expose(...objects) {
  objects.forEach(obj =>
    Object.entries(obj).forEach(([key, value]) =>
      globalThis[key] = expose[key] = value))

  console.dir(Object.fromEntries(Object.entries(expose)))
}
