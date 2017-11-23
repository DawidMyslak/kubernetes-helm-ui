<template>
  <div class="wrapper">
  
    <navigation type="releases"></navigation>
  
    <div class="releases">
      <div class="item" v-for="(item, index) in $store.getters.getReleasesWithExtras" :key="index">
        <div class="item-left">
          <div class="revision">REVISION</div>
          <div class="revision-number">{{ item.release.revision }}</div>
        </div>
        <div class="item-right">
          <div class="info">
            <div class="info-header">
              <div class="title">{{ item.release.name }}</div>
              <div class="status status-orange">{{ item.release.status }}</div>
              <div class="status status-grey" v-if="item.deployment">{{ item.deployment.current }} PODS RUNNING</div>
            </div>
            <div class="time">{{ item.release.updated }}</div>
            <div class="github">
              <img src="~@/assets/github.svg" class="icon">
              <span v-if="item.github" class="repository"><a :href="'https://github.com/' + item.github.repository">{{ item.github.repository }}</a></span>
              <span v-if="item.github" class="commit"><a :href="'https://github.com/' + item.github.repository + '/commit/' + item.github.commit">{{ item.github.shortCommit }}</a></span>
              <span v-else>No repository found</span>
            </div>
          </div>
          <div class="actions">
            <button class="button-green" @click="showHistory(item.release)">History</button>
            <button class="button-red" @click="initRollback(item.release)">Rollback</button>
          </div>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import Navigation from './Navigation'
import helm from '../tools/helm'
import loader from '../utils/loader'

export default {
  components: { Navigation },
  methods: {
    showHistory(release) {
      const promise = () => {
        return this.$store.dispatch('applyRelease', release)
          .then(() => {
            this.$router.push('/history')
            return this.$store.dispatch('loadHistory')
          })
      }
      loader.wrapPromise(promise)
    },
    initRollback(release) {
      const revisionToRollback = release.revision - 1
      const shouldRollback = confirm(`Are you sure you want to rollback ${release.name} to previous revision (${revisionToRollback})?`)

      if (shouldRollback) {
        const promise = () => {
          return helm.rollback(release, revisionToRollback)
            .then(() => this.$store.dispatch('loadReleasesAndDeployments'))
        }
        loader.wrapPromise(promise)
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

.releases {
  flex: 1;
  overflow: scroll;
}

.item {
  margin: 10px;
  display: flex;
  height: 72px;
}

.item-left {
  width: 80px;
  padding-top: 15px;
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
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}

.item-right {
  padding: 8px 15px 0 15px;
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
  color: #fff;
  padding: 2px 4px 0 4px;
  border-radius: 8px;
  font-weight: normal;
  margin: 3px 0 0 5px;
  height: 15px;
}

.status-orange {
  background-color: #c9c458;
}

.status-grey {
  background-color: #bbc5c7;
}

.time {
  font-size: 13px;
  color: #888;
  padding-top: 1px;
}

.github {
  font-size: 12px;
  color: #444;
  padding-top: 2px;
  display: flex;
  align-items: center;
}

.github a {
  color: #444;
  text-decoration: none;
}

.github a:hover {
  text-decoration: underline;
}

.icon {
  width: 16px;
  height: 16px;
  margin-right: 2px;
}

.repository {
  margin-right: 4px;
}

.commit {
  font-family: Menlo, monospace;
  font-size: 11px;
}

.actions {
  padding-top: 12px;
  text-align: right;
  width: 170px;
  display: flex;
}

.button-red {
  margin: 0 0 0 10px;
}
</style>
