import { ipcRenderer } from 'electron'
import store from './store'
import utils from './utils'

ipcRenderer.send('shell-exec', { command: 'kubectl config current-context', reply: 'shell-kubectl-config-reply' })

ipcRenderer.send('shell-exec', { command: `helm list --tiller-namespace ${store.state.Config.namespace}`, reply: 'shell-helm-list-reply' })

ipcRenderer.on('shell-kubectl-config-reply', (event, data) => {
  utils.logReply(data)
  if (data.code === 1) return

  let context = data.stdout
  store.dispatch('setContext', context)
})

ipcRenderer.on('shell-helm-list-reply', (event, data) => {
  utils.logReply(data)
  if (data.code === 1) return

  let releases = utils.parseData(data.stdout, ['name', 'revision', 'updated', 'status', 'chart', 'namespace'])
  store.dispatch('setReleases', releases)
})
