import store from '../store'
import data from './data'

data.getContexts()
  .then((contexts) => {
    store.dispatch('setContexts', contexts)

    const context = contexts.find((context) => context.current === '*')
    store.dispatch('setContext', context)

    return data.getNamespaces()
  })
  .then((namespaces) => {
    store.dispatch('setNamespaces', namespaces)

    const namespace = namespaces[0]
    store.dispatch('setNamespace', namespace)

    return data.getReleases(namespace.name)
  })
  .then((releases) => {
    store.dispatch('setReleases', releases)
  })
