import store from '../store'
import kube from '../tools/kube'
import helm from '../tools/helm'

kube.getContexts()
  .then((contexts) => {
    store.dispatch('setContexts', contexts)

    const context = contexts.find((context) => context.current === '*')
    store.dispatch('setContext', context)

    return kube.getNamespaces()
  })
  .then((namespaces) => {
    store.dispatch('setNamespaces', namespaces)

    const namespace = namespaces[0]
    store.dispatch('setNamespace', namespace)

    return helm.getReleases(namespace.name)
  })
  .then((releases) => {
    store.dispatch('setReleases', releases)
  })
