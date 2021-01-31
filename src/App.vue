<template>
  <div>
    <app-header/>
    <main class="main" id="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
export default {
  components: {AppHeader},
  mounted() {
    this.$store.commit('initListFromLocalStorage')
  }
}
</script>

<style lang="scss">
html {
  font-family: 'Inter', sans-serif;
  @apply bg-green-900 text-white font-light;
}
.main {
  @apply p-6 w-full max-w-lg mx-auto;
}
</style>