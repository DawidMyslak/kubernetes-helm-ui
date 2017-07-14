<template>
  <div>
  
    <h1>Kubernetes clusters</h1>
  
    <div>
      <select v-model="context">
        <option v-for="item in $store.state.contexts" v-bind:value="item">
          {{ item.name }}
        </option>
      </select>
    </div>
  
    <div>
      <select v-model="namespace">
        <option v-for="item in $store.state.namespaces" v-bind:value="item">
          {{ item.name }}
        </option>
      </select>
    </div>
  
    <h1>Command line tools</h1>
  
    <div>
      <label>
        kubectl path:
        <input v-model="kube">
      </label>
    </div>
  
    <div>
      <label>
        helm path:
        <input v-model="helm">
      </label>
    </div>
  
    <button @click="saveConfig()">Save</button>
  
  </div>
</template>

<script>
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

      this.$store.dispatch('applyConfig', config)
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
  }
}
</script>
