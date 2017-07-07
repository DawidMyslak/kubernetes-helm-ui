export default {
  parseHelmData(data, keys) {
    let items = []

    let lines = data.split(/\r?\n/)

    for (let i = 1; i < lines.length - 1; i++) {
      let line = lines[i]
      let values = line.split(/\t/)
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
  parseKubeData(data, keys) {
    let items = []

    let lines = data.split(/\r?\n/)
    let headerLine = lines[0]

    let headerIndexes = [0]
    let spaceFound = false

    for (let i = 0; i < headerLine.length; i++) {
      let char = headerLine[i]
      if (char === ' ') spaceFound = true
      if (char !== ' ' && spaceFound) {
        headerIndexes.push(i)
        spaceFound = false
      }
    }
    headerIndexes.push(headerLine.length)

    for (let i = 1; i < lines.length - 1; i++) {
      let line = lines[i]
      let values = []
      let item = {}

      for (let j = 0; j < headerIndexes.length - 1; j++) {
        values.push(line.slice(headerIndexes[j], headerIndexes[j + 1]).trim())
      }

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
