<template>
  <div class="wrapper">
  
    <navigation type="history"></navigation>
  
    <div class="release">
      <select v-model="release">
        <option v-for="(item, index) in $store.state.releases" :value="item" :key="index">
          {{ item.name }}
        </option>
      </select>
    </div>
  
    <div class="history">
      <div class="item" v-for="(item, index) in $store.state.history" :key="index">
        <div class="item-left">
          <div class="revision">REVISION</div>
          <div class="revision-number">{{ item.revision }}</div>
        </div>
        <div class="item-right">
          <div class="info">
            <div class="info-header">
              <div class="title">{{ item.description }}</div>
              <div class="status">{{ item.status }}</div>
            </div>
            <div class="time">{{ item.updated }}</div>
          </div>
          <div class="actions">
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
import loader from '../utils/loader'

export default {
  components: { Navigation },
  methods: {
    initRollback(release) {
      const revisionToRollback = release.revision
      const shouldRollback = confirm(`Are you sure you want to rollback ${this.$store.state.release.name} to selected revision (${revisionToRollback})?`)

      if (shouldRollback) {
        const promise = () => {
          return helm.rollback(this.$store.state.release, revisionToRollback)
            .then(() => this.$store.dispatch('loadHistory'))
            .then(() => this.$store.dispatch('syncReleaseWithHistory'))
        }
        loader.wrapPromise(promise)
      }
    }
  },
  computed: {
    release: {
      get() {
        return this.$store.state.release
      },
      set(release) {
        if (this.$store.state.isLoading) return
        
        const promise = () => {
          return this.$store.dispatch('applyRelease', release)
            .then(() => this.$store.dispatch('loadHistory'))
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

.release {
  padding: 10px 0 0 10px;
  height: 50px;
  background-color: #f5f8fa;
  border-bottom: 1px solid #e3e6e7;
}

.history {
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
  font-size: 15px;
  font-weight: bold;
  padding-top: 2px;
}

.status {
  font-size: 10px;
  background-color: #c9c458;
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
  padding-top: 3px;
}

.actions {
  padding-top: 5px;
  text-align: right;
  width: 80px;
  display: flex;
}
</style>
