<template>
  <div id="app">
    <div class="menu">
      <ul>
        <li>
          <router-link to="/releases">
            <img src="~@/assets/releases.svg" class="icon">
            <span class="title">Releases</span>
          </router-link>
        </li>
        <li>
          <router-link to="/history">
            <img src="~@/assets/history.svg" class="icon">
            <span class="title">History</span>
          </router-link>
        </li>
        <li>
          <router-link to="/settings">
            <img src="~@/assets/settings.svg" class="icon">
            <span class="title">Settings</span>
          </router-link>
        </li>
        <li>
          <router-link to="/console">
            <img src="~@/assets/console.svg" class="icon">
            <span class="title">Console</span>
          </router-link>
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
  background-color: #3bacdf;
  position: absolute;
}

.menu ul {
  list-style-type: none;
}

.menu li a {
  width: 80px;
  height: 80px;
  display: block;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  color: #fff;
  padding: 20px 0;
}

.menu li a:hover {
  background-color: #3193c0;
}

.icon {
  width: 20px;
  height: 20px;
}

.title {
  width: 80px;
  display: block;
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
