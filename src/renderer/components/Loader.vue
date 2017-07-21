<template>
  <div v-if="$store.state.isLoading" class="loader">
    <div class="spinner-container">
      <img src="~@/assets/spinner-1.svg" class="spinner-1">
      <img src="~@/assets/spinner-2.svg" class="spinner-2">
    </div>
  </div>
</template>

<style scoped>
.loader {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  background-color: rgba(0, 0, 0, 0.8);
  align-items: center;
  justify-content: center;
}

.spinner-container {
  width: 80px;
  height: 80px;
}

.spinner-1 {
  width: 50px;
  height: 50px;
  margin: 15px;
  animation: spinner-1 1s infinite linear;
  position: absolute;
}

.spinner-2 {
  width: 80px;
  height: 80px;
  animation: spinner-2 1s infinite linear;
  position: absolute;
}

@keyframes spinner-1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}

@keyframes spinner-2 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-359deg);
  }
}
</style>