import shell from './shell'
import parsers from './parsers'

export default {
  getContexts() {
    return shell.exec('kubectl config get-contexts')
      .then((data) => {
        const contexts = parsers.parseKubeData(data, ['current', 'name', 'cluster'])
        return contexts
      })
  },
  getNamespaces() {
    return shell.exec('kubectl get namespaces')
      .then((data) => {
        const namespaces = parsers.parseKubeData(data, ['name'])
        return namespaces
      })
  },
  getReleases(namespace) {
    return shell.exec(`helm list --tiller-namespace ${namespace}`)
      .then((data) => {
        const releases = parsers.parseHelmData(data, ['name', 'revision', 'updated', 'status'])
        return releases
      })
  }
}
