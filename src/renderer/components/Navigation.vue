<template>
  <div class="navigation">
    <div class="separator">
      <img src="~@/assets/arrow.svg" class="icon">
    </div>
    <div class="item">
      <div class="label">Current context</div>
      <div class="value">{{ $store.state.context.name }}</div>
    </div>
    <div class="separator">
      <img src="~@/assets/arrow.svg" class="icon">
    </div>
    <div class="item">
      <div class="label">Namespace</div>
      <div class="value">{{ $store.state.namespace.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.navigation {
  height: 60px;
  background: linear-gradient(#e8eff1, #dfe3e4);
  border-bottom: 1px solid #cacecf;
  display: flex;
}

.separator {
  height: 60px;
  padding: 20px 0 0 20px;
}

.icon {
  width: 20px;
  height: 20px;
}

.item {
  height: 60px;
  padding: 13px 30px 0 10px;
  border-right: 1px solid #cacecf;
}

.label {
  font-size: 13px;
  color: #666;
}

.value {
  font-size: 18px;
  font-weight: bold;
}
</style>