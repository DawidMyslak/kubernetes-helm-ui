<template>
  <div>
    <div class="title">Releases</div>
    <ol>
      <li v-for="release in $store.state.releases">
        {{ release.name }} ({{ release.revision }}) {{ release.updated }} {{ release.status }}
      </li>
    </ol>
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
</style>
