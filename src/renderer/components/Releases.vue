<template>
  <div>
  
    <h1>Releases</h1>
  
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
    </div>
  
    <div id="releases">
      <div v-for="item in $store.state.releases" class="item">
        {{ item.name }} ({{ item.revision }}) {{ item.updated }} {{ item.status }}
        <button v-on:click="onHistoryRequested(item)">History</button>
      </div>
    </div>
  
  </div>
</template>

<script>
export default {
  methods: {
    onHistoryRequested(release) {
      this.$store.dispatch('applyRelease', release)
        .then(() => {
          this.$router.push('/history')
          return this.$store.dispatch('loadHistory')
        })
    }
  },
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
    }
  },
  mounted() {
    if (!this.$store.state.contexts.length) {
      this.$store.dispatch('loadContexts')
        .then(() => {
          return this.$store.dispatch('loadNamespaces')
        })
        .then(() => {
          return this.$store.dispatch('loadReleases')
        })
    }
  }
}
</script>
