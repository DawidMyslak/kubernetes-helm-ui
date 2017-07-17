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
  cursor: default;
  font-size: 14px;
}

button {
  width: 80px;
  height: 30px;
  font-size: 13px;
  cursor: pointer;
  outline: none;
  border-radius: 14px;
  color: #fff;
  border: none;
}

label {
  display: block;
}

select {
  padding: 6px 8px;
  width: 280px;
  border: 1px solid #e3e6e7;
  border-radius: 4px;
  outline: none;
  color: #222;
  font-size: 13px;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#222'><polygon points='0,0 100,0 50,50'/></svg>") no-repeat;
  background-size: 8px;
  background-position: calc(100% - 10px) 12px;
  background-repeat: no-repeat;
  background-color: #fff;
  -webkit-appearance: none;
}

input {
  padding: 6px 8px;
  width: 280px;
  border: 1px solid #e3e6e7;
  border-radius: 4px;
  outline: none;
  color: #222;
  font-size: 13px;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.content {
  height: 100vh;
  background-color: #fff;
  color: #222;
  flex: 1;
}

.button-green {
  background-color: #48bd88;
}

.button-green:hover {
  background-color: #34966a;
}

.button-red {
  background-color: #cc4b5f;
  margin: 0 0 0 10px;
}

.button-red:hover {
  background-color: #a83749;
}
</style>
