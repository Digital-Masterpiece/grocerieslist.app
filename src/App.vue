<template>
  <app-header/>
  <main id="main" class="main">
    <router-view/>
  </main>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
  components: { AppHeader }
}
</script>

<style lang="scss">
.main {
  @apply p-6 w-full max-w-sm mx-auto;
}
</style>
