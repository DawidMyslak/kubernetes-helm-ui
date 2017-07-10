<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <div class="title">Info</div>
        {{ context.name }} | {{ namespace.name }}
        <div class="title">Contexts</div>
        <select v-model="context" v-on:change="onContextChange">
          <option v-for="item in contexts" v-bind:value="item">
            {{ item.name }} ({{ item.cluster }})
          </option>
        </select>
        <div class="title">Namespaces</div>
        <select v-model="namespace" v-on:change="onNamespaceChange">
          <option v-for="item in namespaces" v-bind:value="item">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="right-side">
        <div class="title">Releases</div>
        <ul>
          <li v-for="item in releases">
            {{ item.name }} ({{ item.revision }}) {{ item.updated }} {{ item.status }}
          </li>
        </ul>
      </div>
    </main>
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
      contexts: [],
      namespaces: [],
      releases: []
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
    loadData() {
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
  },
  mounted() {
    this.loadData()
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
  background: radial-gradient( ellipse at top left,
  rgba(255, 255, 255, 1) 40%,
  rgba(229, 229, 229, .9) 100%);
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

main {
  display: flex;
  justify-content: space-between;
}

main>div {
  flex-basis: 50%;
}

.left-side,
.right-side {
  display: flex;
  flex-direction: column;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

ul {
  font-size: 14px;
}
</style>
