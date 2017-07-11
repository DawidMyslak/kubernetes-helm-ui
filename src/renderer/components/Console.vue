<template>
  <div>
  
    <h1>Console</h1>
  
    <div id="console">
      <pre v-for="item in $store.state.logs">{{item}}</pre>
    </div>
  
  </div>
</template>

