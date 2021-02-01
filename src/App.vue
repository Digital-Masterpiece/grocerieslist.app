<template>
  <div>
    <app-header/>
    <main class="main" id="main">
      <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath"/>
      </transition>
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
  @apply bg-gray-900 text-white font-light;
}
.main {
  @apply p-6 w-full max-w-lg mx-auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-2rem);
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(2rem);
}

</style>