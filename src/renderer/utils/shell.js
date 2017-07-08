import { ipcRenderer } from 'electron'
import uuid from 'uuid'

export default {
  exec(command) {
    const reply = uuid.v4()

    const promise = new Promise((resolve, reject) => {
      ipcRenderer.send('shell-exec', { command, reply })

      ipcRenderer.once(reply, (event, data) => {
        const { code, stdout, stderr } = data
        console.log('> ' + command)
        if (code === 0) {
          console.log(stdout)
          resolve(stdout)
        }
        else {
          console.log(stderr)
          reject(stderr)
        }
      })
    })

    return promise
  }
}
