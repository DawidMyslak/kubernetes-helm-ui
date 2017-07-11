import shell from '../utils/shell'
import parsers from '../utils/parsers'

export default {
  getReleases(namespace) {
    return shell.exec(`helm list --tiller-namespace ${namespace}`)
      .then((data) => {
        const releases = parsers.parseHelmData(data, ['name', 'revision', 'updated', 'status'])
        return releases
      })
  },
  getHistory(release, namespace) {
    return shell.exec(`helm history ${release} --tiller-namespace ${namespace}`)
      .then((data) => {
        const history = parsers.parseHelmData(data, ['revision', 'updated', 'status', 'chart', 'description'])
        return history
      })
  },
  rollback(release, revision, namespace) {
    return shell.exec(`helm rollback ${release} ${revision} --tiller-namespace ${namespace}`)
  }
}
