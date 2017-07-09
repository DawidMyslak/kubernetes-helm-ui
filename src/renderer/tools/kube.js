import shell from '../utils/shell'
import parsers from '../utils/parsers'

export default {
  getContexts() {
    return shell.exec('kubectl config get-contexts')
      .then((data) => {
        const contexts = parsers.parseKubeData(data, ['current', 'name', 'cluster'])
        return contexts
      })
  },
  useContext(context) {
    return shell.exec(`kubectl config use-context "${context}"`)
  },
  getNamespaces() {
    return shell.exec('kubectl get namespaces')
      .then((data) => {
        const namespaces = parsers.parseKubeData(data, ['name'])
        return namespaces
      })
  }
}
