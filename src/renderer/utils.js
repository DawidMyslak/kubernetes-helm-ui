export default {
  parseData(data, keys) {
    let items = []

    let lines = data.split(/\r?\n/)

    for (let i = 1; i < lines.length - 1; i++) {
      let values = lines[i].split(/\t/)
      let item = {}

      for (let j = 0; j < keys.length; j++) {
        let key = keys[j]
        let value = values[j].trim()
        item[key] = value
      }

      items.push(item)
    }

    return items
  },
  logReply(data, logOutput = true) {
    console.log('> ' + data.command)

    if (data.code === 0) {
      if (logOutput) console.log(data.stdout)
    } else {
      console.log(data.stderr)
    }
  }
}
