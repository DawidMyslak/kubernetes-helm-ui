<template>
  <div>
  
    <h1>History</h1>
  
    <hr>
  
    <navigation></navigation>
  
    <hr>
  
    <div>
      Release: {{ $store.state.release.name }}
      <select v-model="release">
        <option v-for="item in $store.state.releases" v-bind:value="item">
          {{ item.name }}
        </option>
      </select>
    </div>
  
    <div id="history">
      <div v-for="item in $store.state.history" class="item">
        ({{ item.revision }}) {{ item.updated }} {{ item.description }}
      </div>
    </div>
  
  </div>
</template>

<script>
import Navigation from './Navigation'

export default {
  components: { Navigation },
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
