import store from '../store'
import data from './data'

data.getContexts()
  .then((contexts) => {
    store.dispatch('setContexts', contexts)
    return data.getNamespaces()
  })
  .then((namespaces) => {
    store.dispatch('setNamespaces', namespaces)
    return data.getReleases('chat')
  })
  .then((releases) => {
    store.dispatch('setReleases', releases)
  })
