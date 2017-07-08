import { ipcRenderer } from 'electron'
import store from './store'
import utils from './utils'

// kubectl config get-contexts'

ipcRenderer.send('shell-exec', {
  command: 'kubectl config get-contexts',
  reply: 'shell-kubectl-get-contexts-reply'
})

ipcRenderer.on('shell-kubectl-get-contexts-reply', (event, data) => {
  utils.logReply(data)
  if (data.code === 1) return

  let contexts = utils.parseKubeData(data.stdout, ['current', 'name', 'cluster'])
  store.dispatch('setContexts', contexts)
})

// kubectl get namespaces

ipcRenderer.send('shell-exec', {
  command: 'kubectl get namespaces',
  reply: 'shell-kubectl-get-namespaces-reply'
})

ipcRenderer.on('shell-kubectl-get-namespaces-reply', (event, data) => {
  utils.logReply(data)
  if (data.code === 1) return

  let namespaces = utils.parseKubeData(data.stdout, ['name'])
  store.dispatch('setNamespaces', namespaces)
})

// kubectl config current-context

ipcRenderer.send('shell-exec', {
  command: 'kubectl config current-context',
  reply: 'shell-kubectl-current-context-reply'
})

ipcRenderer.on('shell-kubectl-current-context-reply', (event, data) => {
  utils.logReply(data)
  if (data.code === 1) return

  let context = data.stdout.trim()
  store.dispatch('setContext', context)
})

// helm list --tiller-namespace ${namespace}

ipcRenderer.send('shell-exec', {
  command: `helm list --tiller-namespace ${store.state.namespace}`,
  reply: 'shell-helm-list-reply'
})

ipcRenderer.on('shell-helm-list-reply', (event, data) => {
  utils.logReply(data)
  if (data.code === 1) return

  let releases = utils.parseHelmData(data.stdout, ['name', 'revision', 'updated', 'status'])
  store.dispatch('setReleases', releases)
})
