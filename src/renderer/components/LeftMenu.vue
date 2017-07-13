<template>
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
</template>

<style scoped>
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
  display: block;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  color: #fff;
  padding: 15px 0;
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
</style>
