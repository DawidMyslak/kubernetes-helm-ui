<template>
  <div class="menu">
    <ul>
      <li>
        <router-link to="/releases">
          <img src="~@/assets/releases.svg" class="icon">
          <div class="title">Releases</div>
        </router-link>
      </li>
      <li>
        <router-link to="/history">
          <img src="~@/assets/history.svg" class="icon">
          <div class="title">History</div>
        </router-link>
      </li>
      <li>
        <router-link to="/settings">
          <img src="~@/assets/settings.svg" class="icon">
          <div class="title">Settings</div>
        </router-link>
      </li>
      <li>
        <router-link to="/console">
          <img src="~@/assets/console.svg" class="icon">
          <div class="title">Console</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.menu {
  width: 80px;
  height: 100vh;
  background: linear-gradient(#464b63, #2b2f44);
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
  background-color: #21253c;
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
