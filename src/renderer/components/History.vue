<template>
  <div>
  
    <h1>History</h1>
  
    <div id="navigation">
      <div>
        Current context: {{ $store.state.context.name }}
        <select v-model="context">
          <option v-for="item in $store.state.contexts" v-bind:value="item">
            {{ item.name }} ({{ item.cluster }})
          </option>
        </select>
      </div>
      <div>
        Namespace: {{ $store.state.namespace.name }}
        <select v-model="namespace">
          <option v-for="item in $store.state.namespaces" v-bind:value="item">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div>
        Release: {{ $store.state.release.name }}
        <select v-model="release">
          <option v-for="item in $store.state.releases" v-bind:value="item">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
  
    <div id="history">
      <div v-for="item in $store.state.history" class="item">
        ({{ item.revision }}) {{ item.updated }} {{ item.description }}
      </div>
    </div>
  
  </div>
</template>

<script>
export default {
  computed: {
    context: {
      get() {
        return this.$store.state.context
      },
      set(context) {
        this.$store.dispatch('applyContext', context)
          .then(() => {
            return this.$store.dispatch('loadNamespaces')
          })
          .then(() => {
            return this.$store.dispatch('loadReleases')
          })
      }
    },
    namespace: {
      get() {
        return this.$store.state.namespace
      },
      set(namespace) {
        this.$store.dispatch('applyNamespace', namespace)
          .then(() => {
            return this.$store.dispatch('loadReleases')
          })
      }
    },
    release: {
      get() {
        return this.$store.state.release
      },
      set(release) {
        this.$store.dispatch('applyRelease', release)
          .then(() => {
            return this.$store.dispatch('loadHistory')
          })
      }
    }
  }
}
</script>
