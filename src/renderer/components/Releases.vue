<template>
  <div class="wrapper">
  
    <navigation></navigation>
  
    <div class="releases">
      <div v-for="item in $store.state.releases" class="item">
        <div class="item-left">{{ item.revision }}</div>
        <div class="item-right">
          <div class="info">
            <div class="title">{{ item.name }}
              <span class="status">{{ item.status }}</span>
            </div>
            <div class="time">{{ item.updated }}</div>
          </div>
          <div class="actions">
            <button class="button" @click="showHistory(item)">History</button>
            <button class="button" @click="showHistory(item)">Rollback</button>
          </div>
        </div>
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
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.releases {
  flex: 1;
  overflow: scroll;
}

.item {
  margin: 10px;
  display: flex;
  height: 60px;
}

.item-left {
  width: 80px;
  padding-top: 15px;
  color: #fff;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(#66c1eb, #3bacdf);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.item-right {
  padding: 10px 15px 0 15px;
  background: linear-gradient(#fff, #edf1f3);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid #e3e6e7;
  flex: 1;
  display: flex;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.status {
  font-size: 10px;
  background-color: #48bd88;
  color: #fff;
  padding: 3px 5px;
  border-radius: 8px;
  font-weight: normal;
}

.time {
  font-size: 13px;
  color: #888;
}

.info {
  flex: 1;
}

.actions {
  padding-top: 5px;
  text-align: right;
  width: 200px;
}

.button {
  font-size: 13px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 14px;
  display: inline-block;
  color: #fff;
  background-color: #48bd88;
  border: none;
}

.button:hover {
  background-color: #359167;
}
</style>
