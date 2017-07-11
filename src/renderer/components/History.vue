<template>
  <div>
  
    <h1>History</h1>
  
    <div id="navigation">
      <div>Current context: {{ $store.state.context.name }}</div>
      <div>Namespace: {{ $store.state.namespace.name }}</div>
      <div>
        Release: {{ $store.state.release.name }}
        <select v-model="release">
          <option v-for="item in $store.state.releases" v-bind:value="item">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
  
    <div id="history">
      <div v-for="item in $store.state.history" class="item">
        ({{ item.revision }}) {{ item.updated }} {{ item.description }}
      </div>
    </div>
  
  </div>
</template>

<script>
export default {
  computed: {
    release: {
      get() {
        return this.$store.state.release
      },
      set(release) {
        this.$store.dispatch('applyRelease', release)
          .then(() => {
            return this.$store.dispatch('loadHistory')
          })
      }
    }
  }
}
</script>
