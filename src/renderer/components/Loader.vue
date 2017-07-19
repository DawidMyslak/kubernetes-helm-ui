<template>
  <div v-if="$store.state.isLoading" class="loader">
    <img src="~@/assets/spinner.svg" class="spinner">
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

.spinner {
  width: 60px;
  height: 60px;
  animation: spinner 1s infinite linear;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>