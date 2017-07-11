<template>
  <div>
  
    <h1>Settings</h1>
  
    <div id="navigation">
      <div>
        <div>Current context: {{ $store.state.context.name }}</div>
        <select v-model="context">
          <option v-for="item in $store.state.contexts" v-bind:value="item">
            {{ item.name }} ({{ item.cluster }})
          </option>
        </select>
      </div>
      <div>
        <div>Namespace: {{ $store.state.namespace.name }}</div>
        <select v-model="namespace">
          <option v-for="item in $store.state.namespaces" v-bind:value="item">
            {{ item.name }}
          </option>
        </select>
      </div>
  
    </div>
  </div>
</template>

<script>
export default {
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
