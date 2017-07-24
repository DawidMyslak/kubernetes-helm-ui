<template>
  <div class="navigation">
    <div class="separator">
      <img src="~@/assets/arrow.svg" class="icon">
    </div>
    <div class="item">
      <div class="label">Current context</div>
      <div class="value">{{ $store.state.context.name }}</div>
    </div>
    <div class="separator">
      <img src="~@/assets/arrow.svg" class="icon">
    </div>
    <div class="item">
      <div class="label">Namespace</div>
      <div class="value">{{ $store.state.namespace.name }}</div>
    </div>
    <div class="extended">
      <div class="click" @click="refresh()" role="button">
        <div class="link">
          <img src="~@/assets/refresh.svg" class="icon">
        </div>
        <div class="link">Refresh</div>
      </div>
    </div>
  </div>
</template>

<script>
import loader from '../utils/loader'

export default {
  props: ['type'],
  methods: {
    refresh() {
      if (this.type === 'releases') {
        const promise = () => {
          return this.$store.dispatch('loadReleases')
        }
        loader.wrapPromise(promise)
      }
      else if (this.type === 'history' && this.$store.state.release.name) {
        const promise = () => {
          return this.$store.dispatch('loadHistory')
        }
        loader.wrapPromise(promise)
      }
    }
  }
}
</script>

<style scoped>
.navigation {
  height: 60px;
  background: linear-gradient(#e8eff1, #dfe3e4);
  border-bottom: 1px solid #cacecf;
  display: flex;
}

.separator {
  height: 60px;
  padding: 20px 0 0 20px;
}

.icon {
  width: 20px;
  height: 20px;
}

.item {
  height: 60px;
  padding: 13px 30px 0 10px;
  border-right: 1px solid #cacecf;
}

.label {
  font-size: 13px;
  color: #666;
}

.value {
  font-size: 18px;
  font-weight: bold;
}

.extended {
  height: 60px;
  margin-left: auto;
}

.click {
  cursor: pointer;
  display: block;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  color: #222;
  padding-top: 12px;
  height: 60px;
}

.click:hover {
  background-color: #cacecf;
}

.link {
  width: 80px;
}
</style>