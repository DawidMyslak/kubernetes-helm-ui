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
      <div class="item">
        <div class="name">Contexts:</div>
        <div>
          <br>
          <ul>
            <li v-for="context in $store.state.contexts">
              {{ context.name }} {{ context.current }} {{ context.cluster }} {{ context.authinfo }} {{ context.namespace }}
            </li>
          </ul>
        </div>
      </div>
      <div class="item">
        <div class="name">Namespaces:</div>
        <br>
        <div>
          <br>
          <ul>
            <li v-for="namespace2 in $store.state.namespaces">
              {{ namespace2.name }} {{ namespace2.status }} {{ namespace2.age }}
            </li>
          </ul>
        </div>
      </div>
    </div>
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
