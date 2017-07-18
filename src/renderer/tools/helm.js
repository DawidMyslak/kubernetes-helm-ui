import shell from '../utils/shell'
import parsers from '../utils/parsers'
import store from '../store'

export default {
  getReleases(namespace) {
    return shell.exec(`${store.state.config.helmPath}helm list --kube-context "${store.state.context.name}" --tiller-namespace "${namespace}"`)
      .then((data) => {
        const releases = parsers.parseHelmData(data, ['name', 'revision', 'updated', 'status'])
        return releases
      })
  },
  getHistory(release, namespace) {
    return shell.exec(`${store.state.config.helmPath}helm history ${release} --kube-context "${store.state.context.name}" --tiller-namespace "${namespace}"`)
      .then((data) => {
        const history = parsers.parseHelmData(data, ['revision', 'updated', 'status', 'chart', 'description'])
        return history
      })
  },
  rollback(release, revision, namespace) {
    return shell.exec(`${store.state.config.helmPath}helm rollback ${release} ${revision} --kube-context "${store.state.context.name}" --tiller-namespace "${namespace}"`)
  }
}
