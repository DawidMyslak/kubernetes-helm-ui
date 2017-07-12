<template>
  <div id="app">
    <div class="menu">
      <ul>
        <li>
          <router-link to="/releases">Releases</router-link>
        </li>
        <li>
          <router-link to="/history">
            <img src="~@/assets/history.svg" width="20" height="20">
            <br>History
          </router-link>
        </li>
        <li>
          <router-link to="/settings">
            <img src="~@/assets/settings.svg" width="20" height="20">
            <br>Settings</router-link>
        </li>
        <li>
          <router-link to="/console">Console</router-link>
        </li>
      </ul>
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

.menu ul {
  list-style-type: none;
}

.menu li a {
  width: 100%;
  display: block;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  color: #fff;
  padding: 10px 0;
}

.menu li a:hover {
  background-color: #aaa;
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
