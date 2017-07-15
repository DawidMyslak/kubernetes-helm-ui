<template>
  <div class="wrapper">
  
    <navigation></navigation>
  
    <div class="history">
      <div>
        Release: {{ $store.state.release.name }}
        <select v-model="release">
          <option v-for="item in $store.state.releases" v-bind:value="item">
            {{ item.name }}
          </option>
        </select>
      </div>
  
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

<style scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.history {
  flex: 1;
  overflow: scroll;
}

.item {
  margin: 10px;
  padding: 10px 15px;
  border-radius: 8px;
  background-color: #edf1f3;
}
</style>
