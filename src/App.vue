<template>
  <div v-if="loaded">
    <app-header/>
    <main id="main" class="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
  components: { AppHeader },
  data () {
    return {
      loaded: false
    }
  },
  mounted () {
    this.$store.dispatch('init').then(() => {
      this.loaded = true
    })
  }
}
</script>

<style lang="scss">
.main {
  @apply p-6 w-full max-w-lg mx-auto;
}
</style>
