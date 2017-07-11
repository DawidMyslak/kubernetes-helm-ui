<template>
  <div id="app">
    <router-link to="/releases">Releases</router-link>
    <router-link to="/history">History</router-link>
    <router-link to="/console">Console</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'kubernetes-helm-ui'
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

.item {
  padding: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

#console {
  color: #fff;
  background-color: #222;
}

pre {
  font-size: 12px;
  tab-size: 4;
  padding: 2px;
}
</style>
