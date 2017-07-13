import { ipcRenderer } from 'electron'
import uuid from 'uuid'
import store from '../store'

export default {
  exec(command) {
    store.dispatch('addLog', '➜ ' + command)
    const reply = uuid.v4()

    const promise = new Promise((resolve, reject) => {
      ipcRenderer.send('shell-exec', { command, reply })

      ipcRenderer.once(reply, (event, data) => {
        const { code, stdout, stderr } = data
        if (code === 0) {
          store.dispatch('addLog', stdout)
          resolve(stdout)
        }
        else {
          store.dispatch('addLog', stderr)
          reject(stderr)
        }
      })
    })

    return promise
  }
}
