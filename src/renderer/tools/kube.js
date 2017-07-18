import shell from '../utils/shell'
import parsers from '../utils/parsers'
import store from '../store'

export default {
  getContexts() {
    return shell.exec(`${store.state.config.kubePath}kubectl config get-contexts`)
      .then((data) => {
        const contexts = parsers.parseKubeData(data, ['current', 'name', 'cluster'])
        return contexts
      })
  },
  getNamespaces() {
    return shell.exec(`${store.state.config.kubePath}kubectl get namespaces --context="${store.state.context.name}"`)
      .then((data) => {
        const namespaces = parsers.parseKubeData(data, ['name'])
        return namespaces
      })
  }
}
