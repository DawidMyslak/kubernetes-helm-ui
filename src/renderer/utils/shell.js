import { ipcRenderer } from 'electron'
import uuid from 'uuid'

function log(message) {
  console.log(message)
  let consoleElement = document.getElementById('console')
  consoleElement.insertAdjacentHTML('beforeend', '<pre>' + message + '</pre>');
  consoleElement.scrollTop = consoleElement.scrollHeight;
}

export default {
  exec(command) {
    log('> ' + command)
    const reply = uuid.v4()

    const promise = new Promise((resolve, reject) => {
      ipcRenderer.send('shell-exec', { command, reply })

      ipcRenderer.once(reply, (event, data) => {
        const { code, stdout, stderr } = data
        if (code === 0) {
          log(stdout)
          resolve(stdout)
        }
        else {
          log(stderr)
          reject(stderr)
        }
      })
    })

    return promise
  }
}
