<template>
  <div class="settings">
  
    <div class="section">
      <div class="title">Kubernetes cluster</div>
      <label>Context</label>
      <select v-model="context">
        <option v-for="item in $store.state.contexts" v-bind:value="item">
          {{ item.name }}
        </option>
      </select>
      <label>Namespace</label>
      <select v-model="namespace">
        <option v-for="item in $store.state.namespaces" v-bind:value="item">
          {{ item.name }}
        </option>
      </select>
    </div>
  
    <div class="section">
      <div class="title">Command line tools</div>
      <div>
        <label>kubectl path</label>
        <input v-model="kube">
      </div>
      <div>
        <label>helm path</label>
        <input v-model="helm">
      </div>
      <button class="button-green save" @click="saveConfig()">Save</button>
    </div>
  
  </div>
</template>

<script>
import loader from '../utils/loader'

export default {
  data() {
    return {
      kube: this.$store.state.config.kubePath,
      helm: this.$store.state.config.helmPath
    }
  },
  methods: {
    saveConfig() {
      const config = {
        kubePath: this.kube,
        helmPath: this.helm
      }
      const promise = () => {
        return this.$store.dispatch('applyConfig', config)
          .then(() => this.$store.dispatch('loadContexts'))
          .then(() => this.$store.dispatch('loadNamespaces'))
          .then(() => this.$store.dispatch('loadReleases'))
      }
      loader.wrapPromise(promise)
    }
  },
  computed: {
    context: {
      get() {
        return this.$store.state.context
      },
      set(context) {
        const promise = () => {
          return this.$store.dispatch('applyContext', context)
            .then(() => this.$store.dispatch('loadNamespaces'))
            .then(() => this.$store.dispatch('loadReleases'))
        }
        loader.wrapPromise(promise)
      }
    },
    namespace: {
      get() {
        return this.$store.state.namespace
      },
      set(namespace) {
        const promise = () => {
          return this.$store.dispatch('applyNamespace', namespace)
            .then(() => this.$store.dispatch('loadReleases'))
        }
        loader.wrapPromise(promise)
      }
    }
  }
}
</script>

<style scoped>
.settings {
  height: 100%;
  overflow: scroll;
}

.section {
  padding: 20px;
  margin: 10px;
  border: 1px solid #e3e6e7;
  border-radius: 8px;
  background-color: #f5f8fa;
}

.section label {
  margin: 10px 0 2px 0;
  color: #666;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.save {
  margin-top: 10px;
}
</style>
