import { ipcRenderer } from 'electron'
import shell from './shell'
import store from '../store'
import parsers from './parsers'

shell.exec('kubectl config get-contexts')
  .then((data) => {
    let contexts = parsers.parseKubeData(data, ['current', 'name', 'cluster'])
    store.dispatch('setContexts', contexts)

    return shell.exec('kubectl get namespaces')
  })
  .then((data) => {
    let namespaces = parsers.parseKubeData(data, ['name'])
    store.dispatch('setNamespaces', namespaces)

    return shell.exec('kubectl config current-context')
  })
  .then((data) => {
    let context = data.trim()
    store.dispatch('setContext', context)

    return shell.exec(`helm list --tiller-namespace ${store.state.namespace}`)
  })
  .then((data) => {
    let releases = parsers.parseHelmData(data, ['name', 'revision', 'updated', 'status'])
    store.dispatch('setReleases', releases)
  })
