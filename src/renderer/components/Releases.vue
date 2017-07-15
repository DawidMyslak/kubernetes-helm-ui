<template>
  <div>

    <navigation></navigation>
  
    <div class="releases">
      <div v-for="item in $store.state.releases" class="item">
        <div class="title"> {{ item.name }}</div> ({{ item.revision }}) {{ item.updated }} {{ item.status }}
        <button class="button" @click="showHistory(item)">History</button>
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

<style scoped>
.item {
  margin: 10px;
  padding: 10px 15px;
  border-radius: 8px;
  background-color: #ebeff0;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

 .button {
  font-size: 13px;
  cursor: pointer;
  outline: none;
  padding: 5px 10px;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #48bd88;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #48bd88;
} 
</style>
