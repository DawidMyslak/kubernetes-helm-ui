<template>
  <div>
  
    <h1>Releases</h1>
  
    <div id="navigation">
      <div>Current context: {{ $store.state.context.name }}</div>
      <div>Namespace: {{ $store.state.namespace.name }}</div>
    </div>
  
    <div id="releases">
      <div v-for="item in $store.state.releases" class="item">
        {{ item.name }} ({{ item.revision }}) {{ item.updated }} {{ item.status }}
        <button v-on:click="onHistoryRequested(item)">History</button>
      </div>
    </div>
  
  </div>
</template>

<script>
export default {
  methods: {
    onHistoryRequested(release) {
      this.$store.dispatch('applyRelease', release)
        .then(() => {
          this.$router.push('/history')
          return this.$store.dispatch('loadHistory')
        })
    }
  },
  mounted() {
    if (!this.$store.state.contexts.length) {
      this.$store.dispatch('loadContexts')
        .then(() => {
          return this.$store.dispatch('loadNamespaces')
        })
        .then(() => {
          return this.$store.dispatch('loadReleases')
        })
    }
  }
}
</script>
