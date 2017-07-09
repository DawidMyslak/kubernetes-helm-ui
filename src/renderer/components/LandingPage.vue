<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <span class="title">
          Welcome!
        </span>
        <div>
          <div class="title">Info</div>
          {{ context.name }} {{ namespace.name }}
          <div class="title">Contexts</div>
          <ul>
            <li v-for="item in contexts">
              {{ item.name }} ({{ item.cluster }}) {{ item.current }}
            </li>
          </ul>
          <div class="title">Namespaces</div>
          <ul>
            <li v-for="item in namespaces">
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="right-side">
        <div>
          <div class="title">Releases</div>
          <ol>
            <li v-for="item in releases">
              {{ item.name }} ({{ item.revision }}) {{ item.updated }} {{ item.status }}
            </li>
          </ol>
        </div>
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
    open(link) {
      require('electron').shell.openExternal(link)
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

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main>div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: .8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}

.title {
  color: #888;
  font-size: 18px;
  font-weight: initial;
  letter-spacing: .25px;
  margin-top: 10px;
}

.items {
  margin-top: 8px;
}

.item {
  display: flex;
  margin-bottom: 6px;
}

.item .name {
  color: #6a6a6a;
  margin-right: 6px;
}

.item .value {
  color: #35495e;
  font-weight: bold;
}
</style>
