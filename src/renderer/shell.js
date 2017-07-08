import { ipcRenderer } from 'electron'
import uuid from 'uuid'

export default {
  exec(command) {
    const reply = uuid.v4()

    const promise = new Promise((resolve, reject) => {
      ipcRenderer.send('shell-exec', { command, reply })

      ipcRenderer.once(reply, (event, data) => {
        const { code, stdout, stderr } = data
        if (code === 0) {
          resolve(stdout)
        }
        else {
          reject(stderr)
        }
      })
    })

    return promise
  }
}
