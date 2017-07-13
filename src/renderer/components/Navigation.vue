<template>
  <div class="navigation">
    <div class="item">
      <div class="label">Current context</div>
      <div class="value">{{ $store.state.context.name }}</div>
    </div>
    <div class="item">
      <div class="label">Namespace</div>
      <div class="value">{{ $store.state.namespace.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    context: {
      get() {
        return this.$store.state.context
      },
      set(context) {
        this.$store.dispatch('applyContext', context)
          .then(() => {
            return this.$store.dispatch('loadNamespaces')
          })
          .then(() => {
            return this.$store.dispatch('loadReleases')
          })
      }
    },
    namespace: {
      get() {
        return this.$store.state.namespace
      },
      set(namespace) {
        this.$store.dispatch('applyNamespace', namespace)
          .then(() => {
            return this.$store.dispatch('loadReleases')
          })
      }
    }
  }
}
</script>

<style scoped>
.navigation {
  height: 60px;
  background-color: #e0e5e6;
  margin-bottom: 20px;
  overflow: hidden;
}

.item {
  height: 60px;
  padding: 13px 30px;
  border-right: 1px solid #cacecf;
  float: left;
}

.label {
  font-size: 13px;
  color: #666;
}

.value {
  font-size: 18px;
  font-weight: bold;
  color: #222;
}
</style>