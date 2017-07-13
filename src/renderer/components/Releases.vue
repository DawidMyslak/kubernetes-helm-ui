<template>
  <div>
  
    <h1>Releases</h1>
  
    <hr>
  
    <navigation></navigation>
  
    <hr>
  
    <div id="releases">
      <div v-for="item in $store.state.releases" class="item">
        {{ item.name }} ({{ item.revision }}) {{ item.updated }} {{ item.status }}
        <button @click="showHistory(item)">History</button>
      </div>
    </div>
  
  </div>
</template>

<script>
import Navigation from './Navigation'

export default {
  components: { Navigation },
  methods: {
    showHistory(release) {
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
