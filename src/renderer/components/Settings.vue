<template>
  <div>
  
    <h1>Settings</h1>
  
    <hr>
  
    <div>
      <label>
        kubectl path:
        <input v-model="kube">
      </label>
    </div>
  
    <div>
      <label>
        helm path:
        <input v-model="helm">
      </label>
    </div>
  
    <button v-on:click="saveConfig()">Save</button>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      kube: this.$store.state.config.kubePath,
      helm: this.$store.state.config.helmPath
    }
  },
  methods: {
    saveConfig() {
      const config = {
        kubePath: this.kube,
        helmPath: this.helm
      }
      
      this.$store.dispatch('applyConfig', config)
    }
  }
}
</script>
