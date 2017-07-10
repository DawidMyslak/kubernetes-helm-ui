<template>
  <div id="wrapper">
  
    <div id="navigation">
      <div>
        Current context: {{ context.name }}
        <select v-model="context" v-on:change="onContextChange">
          <option v-for="item in contexts" v-bind:value="item">
            {{ item.name }} ({{ item.cluster }})
          </option>
        </select>
      </div>
      <div>
        Namespace: {{ namespace.name }}
        <select v-model="namespace" v-on:change="onNamespaceChange">
          <option v-for="item in namespaces" v-bind:value="item">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
  
    <div id="releases">
      <div v-for="item in releases" class="release">
        {{ item.name }} ({{ item.revision }}) {{ item.updated }} {{ item.status }}
        <button v-on:click="onHistoryRequested(item)">History</button>

        <div v-if="item === release" v-for="subitem in history">
          ({{ subitem.revision }}) {{ subitem.updated }} {{ subitem.status }} {{ subitem.description }}
        </div>
      </div>
    </div>
  
    <div id="console"></div>
  
  </div>
</template>

<script>
import kube from '../tools/kube'
import helm from '../tools/helm'

export default {
  name: 'landing-page',
  data() {
    return {
      context: { name: null },
      namespace: { name: null },
      release: { name: null },
      contexts: [],
      namespaces: [],
      releases: [],
      history: []
    }
  },
  methods: {
    onContextChange() {
      this.namespaces = []
      this.namespace.name = null
      this.releases = []

      kube.useContext(this.context.name)
        .then(() => {
          return kube.getNamespaces()
        })
        .then((namespaces) => {
          this.namespaces = namespaces
          this.namespace = namespaces[0]

          return helm.getReleases(this.namespace.name)
        })
        .then((releases) => {
          this.releases = releases
        })
    },
    onNamespaceChange() {
      this.releases = []

      helm.getReleases(this.namespace.name)
        .then((releases) => {
          this.releases = releases
        })
    },
    onHistoryRequested(release) {
      this.history = []
      this.release = release

      helm.getHistory(release.name, this.namespace.name)
        .then((history) => {
          this.history = history
        })
    }
  },
  mounted() {
    kube.getContexts()
      .then((contexts) => {
        this.contexts = contexts
        this.context = contexts.find((context) => context.current === '*')

        return kube.getNamespaces()
      })
      .then((namespaces) => {
        this.namespaces = namespaces
        this.namespace = namespaces[0]

        return helm.getReleases(this.namespace.name)
      })
      .then((releases) => {
        this.releases = releases
      })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
  width: 100vw;
  height: 100vh;
  padding: 20px;
}

.release {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

#console {
  color: #fff;
  background-color: #222;
  position: absolute;
  width: 100%;
  height: 300px;
  bottom: 0;
  left: 0px;
  overflow-y: scroll;
  display: none;
}

pre {
  font-size: 12px;
  tab-size: 4;
  padding: 2px;
}
</style>
