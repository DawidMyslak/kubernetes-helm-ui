<template>
  <div class="console">
    <pre v-for="item in $store.state.logs">{{item}}</pre>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$el.scrollTop = this.$el.scrollHeight;
  }
}
</script>

<style scoped>
.console {
  height: 100%;
  color: #eee;
  background-color: #111;
  overflow: scroll;
}

.console pre {
  font-family: Menlo, monospace;
  font-size: 11px;
  tab-size: 4;
  padding: 2px 4px;
}
</style>
