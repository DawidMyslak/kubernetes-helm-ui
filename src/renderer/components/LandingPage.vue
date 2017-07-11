<template>
  <div id="wrapper">
  
    <div id="navigation">
      <div>
        Current context: {{ $store.state.context.name }}
        <select v-model="context">
          <option v-for="item in $store.state.contexts" v-bind:value="item">
            {{ item.name }} ({{ item.cluster }})
          </option>
        </select>
      </div>
      <div>
        Namespace: {{ $store.state.namespace.name }}
        <select v-model="namespace">
          <option v-for="item in $store.state.namespaces" v-bind:value="item">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
  
    <div id="releases">
      <div v-for="item in $store.state.releases" class="release">
        {{ item.name }} ({{ item.revision }}) {{ item.updated }} {{ item.status }}
        <button v-on:click="onHistoryRequested(item)">History</button>
  
        <!--<div v-if="item === release" v-for="subitem in history">
                          ({{ subitem.revision }}) {{ subitem.updated }} {{ subitem.status }} {{ subitem.description }}
                        </div>-->
      </div>
    </div>
  
    <div id="console"></div>
  
  </div>
</template>

<script>
export default {
  name: 'landing-page',
  methods: {
    onHistoryRequested(release) {
      // this.history = []
      // this.release = release

      // helm.getHistory(release.name, this.namespace.name)
      //   .then((history) => {
      //     this.history = history
      //   })
    }
  },
  computed: {
    context: {
      get() {
        return this.$store.state.context
      },
      set(context) {
        this.$store.dispatch('applyContext', context)
          .then(() => {
            return this.$store.dispatch('loadNamespaces')
          })
          .then(() => {
            return this.$store.dispatch('loadReleases')
          })
      }
    },
    namespace: {
      get() {
        return this.$store.state.namespace
      },
      set(namespace) {
        this.$store.dispatch('applyNamespace', namespace)
          .then(() => {
            return this.$store.dispatch('loadReleases')
          })
      }
    }
  },
  mounted() {
    this.$store.dispatch('loadContexts')
      .then(() => {
        return this.$store.dispatch('loadNamespaces')
      })
      .then(() => {
        return this.$store.dispatch('loadReleases')
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
