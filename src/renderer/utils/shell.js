import { ipcRenderer } from 'electron'
import uuid from 'uuid'
import store from '../store'

const log = (message) => {
  console.log(message)
  store.dispatch('logMessage', message)
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
