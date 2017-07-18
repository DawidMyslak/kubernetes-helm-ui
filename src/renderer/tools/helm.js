import shell from '../utils/shell'
import parsers from '../utils/parsers'
import store from '../store'

export default {
  getReleases() {
    return shell.exec(`${store.state.config.helmPath}helm list --kube-context "${store.state.context.name}" --tiller-namespace "${store.state.namespace.name}"`)
      .then((data) => {
        const releases = parsers.parseHelmData(data, ['name', 'revision', 'updated', 'status'])
        return releases
      })
  },
  getHistory() {
    return shell.exec(`${store.state.config.helmPath}helm history ${store.state.release.name} --kube-context "${store.state.context.name}" --tiller-namespace "${store.state.namespace.name}"`)
      .then((data) => {
        const history = parsers.parseHelmData(data, ['revision', 'updated', 'status', 'chart', 'description'])
        return history
      })
  },
  rollback(release, revision) {
    return shell.exec(`${store.state.config.helmPath}helm rollback ${release.name} ${revision} --kube-context "${store.state.context.name}" --tiller-namespace "${store.state.namespace.name}"`)
  }
}
