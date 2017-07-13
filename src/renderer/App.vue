<template>
  <div id="app">
    <left-menu></left-menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/LeftMenu'

export default {
  name: 'kubernetes-helm-ui',
  components: { LeftMenu }
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

.content {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  padding-left: 80px;
  overflow: scroll;
}

.item {
  padding: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>
