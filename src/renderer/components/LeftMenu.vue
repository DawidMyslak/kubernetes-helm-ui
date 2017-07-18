<template>
  <div class="menu">
    <ul>
      <li>
        <router-link to="/releases" exact-active-class="active">
          <div class="link">
            <img src="~@/assets/releases.svg" class="icon">
          </div>
          <div class="link">Releases</div>
        </router-link>
      </li>
      <li>
        <router-link to="/history" exact-active-class="active">
          <div class="link">
            <img src="~@/assets/history.svg" class="icon">
          </div>
          <div class="link">History</div>
        </router-link>
      </li>
      <li>
        <router-link to="/settings" exact-active-class="active">
          <div class="link">
            <img src="~@/assets/settings.svg" class="icon">
          </div>
          <div class="link">Settings</div>
        </router-link>
      </li>
      <li>
        <router-link to="/console" exact-active-class="active">
          <div class="link">
            <img src="~@/assets/console.svg" class="icon">
          </div>
          <div class="link">Console</div>
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

.active {
  border-right: 4px solid #3bacdf;
}

.icon {
  width: 20px;
  height: 20px;
}

.link {
  width: 80px;
}
</style>
