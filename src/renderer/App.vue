<template>
  <div id="app">
    <div class="menu">
      <router-link to="/releases">Releases</router-link>
      <router-link to="/history">History</router-link>
      <router-link to="/settings">Settings</router-link>
      <router-link to="/console">Console</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'kubernetes-helm-ui'
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
}

#app {
  width: 100vw;
  height: 100vh;
}

.menu {
  width: 80px;
  height: 100vh;
  background-color: #ccc;
  position: absolute;
}

.content {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  padding-left: 80px;
  overflow: scroll;
}

.item {
  padding: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>
