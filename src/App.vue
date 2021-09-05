<template>
  <app-header/>
  <main id="main" class="main">
    <router-view/>
  </main>
</template>

<style lang="scss">
.main {
  @apply p-6;
}
</style>
<script>
import AppHeader from '@/components/AppHeader'

export default {
  components: { AppHeader }
}
</script>
