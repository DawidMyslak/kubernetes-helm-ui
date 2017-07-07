<template>
  <div>
    <div class="title">Information</div>
    <div class="items">
      <div class="item">
        <div class="name">Context:</div>
        <div class="value">{{ $store.state.context }}</div>
      </div>
      <div class="item">
        <div class="name">Namespace:</div>
        <div class="value">{{ $store.state.namespace }}</div>
      </div>
    </div>
    <div class="title">Contexts</div>
    <ul>
      <li v-for="item in $store.state.contexts">
        {{ item.name }} ({{ item.cluster }}) {{ item.current }}
      </li>
    </ul>
    <div class="title">Namespaces</div>
    <ul>
      <li v-for="item in $store.state.namespaces">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.title {
  color: #888;
  font-size: 18px;
  font-weight: initial;
  letter-spacing: .25px;
  margin-top: 10px;
}

.items {
  margin-top: 8px;
}

.item {
  display: flex;
  margin-bottom: 6px;
}

.item .name {
  color: #6a6a6a;
  margin-right: 6px;
}

.item .value {
  color: #35495e;
  font-weight: bold;
}
</style>
