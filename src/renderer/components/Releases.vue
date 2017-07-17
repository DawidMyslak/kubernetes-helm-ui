<template>
  <div class="wrapper">
  
    <navigation></navigation>
  
    <div class="releases">
      <div v-for="item in $store.state.releases" class="item">
        <div class="item-left">
          <div class="revision">REVISION</div>
          <div class="revision-number">{{ item.revision }}</div>
        </div>
        <div class="item-right">
          <div class="info">
            <div class="info-header">
              <div class="title">{{ item.name }}</div>
              <div class="status">{{ item.status }}</div>
            </div>
            <div class="time">{{ item.updated }}</div>
          </div>
          <div class="actions">
            <button class="button-grey" @click="showHistory(item)">History</button>
            <button class="button-red" @click="showHistory(item)">Rollback</button>
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
  padding-top: 11px;
  color: #fff;
  background: linear-gradient(#66c1eb, #3bacdf);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.revision-number {
  font-size: 26px;
  font-weight: bold;
  text-align: center;
}

.revision {
  color: #d5edf8;
  text-align: center;
  font-size: 10px;
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

.info {
  flex: 1;
}

.info-header {
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
  padding: 2px 4px 0 4px;
  border-radius: 8px;
  font-weight: normal;
  margin: 3px 0 0 5px;
  height: 15px;
}

.time {
  font-size: 13px;
  color: #888;
}

.actions {
  padding-top: 5px;
  text-align: right;
  width: 180px;
  display: flex;
}

.button-red {
  background-color: #cc4b5f;
  margin: 0 0 0 10px;
}

.button-grey {
  background-color: #a6abad;
  margin: 0 0 0 10px;
}

.button-red:hover {
  background-color: #a83749;
}

.button-grey:hover {
  background-color: #82898b;
}
</style>
