<template>
  <div class="console">
    <pre v-for="item in $store.state.logs">{{item}}</pre>
  </div>
</template>

<style scoped>
.console {
  height: 100%;
  color: #fff;
  background-color: #000;
  overflow: scroll;
}

.console pre {
  font-family: Menlo, monospace;
  font-size: 11px;
  tab-size: 4;
  padding: 2px;
}
</style>
