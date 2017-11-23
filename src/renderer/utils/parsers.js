export default {
  parseHelmData(data, keys) {
    const items = []

    const lines = data.split(/\r?\n/)

    for (let i = 1; i < lines.length - 1; i++) {
      const line = lines[i]
      const values = line.split(/\t/)
      const item = {}

      for (let j = 0; j < keys.length; j++) {
        const key = keys[j]
        const value = values[j].trim()
        item[key] = value
      }

      items.push(item)
    }

    return items
  },
  parseKubeData(data, keys) {
    const items = []

    const lines = data.split(/\r?\n/)
    const headerLine = lines[0]

    let longestLine = headerLine
    for (let i = 1; i < lines.length - 1; i++) {
      const line = lines[i]
      if (line.length > longestLine.length) longestLine = line
    }

    const headerIndexes = [0]
    let spaceFound = false

    for (let i = 0; i < headerLine.length; i++) {
      const char = headerLine[i]
      if (char === ' ') spaceFound = true
      if (char !== ' ' && spaceFound) {
        headerIndexes.push(i)
        spaceFound = false
      }
    }
    headerIndexes.push(longestLine.length)

    for (let i = 1; i < lines.length - 1; i++) {
      const line = lines[i]
      const values = []
      const item = {}

      for (let j = 0; j < headerIndexes.length - 1; j++) {
        values.push(line.slice(headerIndexes[j], headerIndexes[j + 1]).trim())
      }

      for (let j = 0; j < keys.length; j++) {
        const key = keys[j]
        const value = values[j].trim()
        item[key] = value
      }

      items.push(item)
    }

    return items
  }
}
