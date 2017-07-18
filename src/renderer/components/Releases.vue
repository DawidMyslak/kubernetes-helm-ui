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
            <button class="button-green" @click="showHistory(item)">History</button>
            <button class="button-red" @click="initRollback(item)">Rollback</button>
          </div>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import Navigation from './Navigation'
import helm from '../tools/helm'

export default {
  components: { Navigation },
  methods: {
    showHistory(release) {
      this.$store.dispatch('applyRelease', release)
        .then(() => {
          this.$router.push('/history')
          return this.$store.dispatch('loadHistory')
        })
    },
    initRollback(release) {
      const revisionToRollback = release.revision - 1
      const shouldRollback = confirm(`Are you sure you want to rollback ${release.name} to previous revision (${revisionToRollback})?`)

      if (shouldRollback) {
        helm.rollback(release, revisionToRollback)
          .then(() => this.$store.dispatch('loadReleases'))
      }
    }
  },
  mounted() {
    if (!this.$store.state.contexts.length) {
      this.$store.dispatch('loadContexts')
        .then(() => this.$store.dispatch('loadNamespaces'))
        .then(() => this.$store.dispatch('loadReleases'))
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

.revision {
  color: #d5edf8;
  text-align: center;
  font-size: 10px;
}

.revision-number {
  font-size: 26px;
  font-weight: bold;
  text-align: center;
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
  padding-top: 1px;
}

.actions {
  padding-top: 5px;
  text-align: right;
  width: 170px;
  display: flex;
}

.button-red {
  margin: 0 0 0 10px;
}
</style>
