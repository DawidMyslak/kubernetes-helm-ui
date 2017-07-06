import { ipcRenderer } from 'electron'
import store from './store'

function logReply(data, logOutput = true) {
  console.log('> ' + data.command)
  if (data.code === 0) {
    if (logOutput) {
      console.log(data.stdout)
    }
  } else {
    console.log(data.stderr)
  }
}

ipcRenderer.send('shell-exec', { command: 'kubectl config current-context', reply: 'shell-kubectl-config-reply' })

ipcRenderer.on('shell-kubectl-config-reply', (event, data) => {
  logReply(data)
  store.dispatch('setContext', data.stdout)
})
