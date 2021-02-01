<template>
  <div class="app">
    <app-header/>
    <main class="main" id="main">
      <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath"/>
      </transition>
    </main>
    <footer class="footer">
      <a href="https://www.digital-masterpiece.com/" target="_blank" rel="noopener" class="dm-link">&copy; Digital Masterpiece</a>
    </footer>
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

.app {
  @apply flex flex-col justify-center items-center w-full;
}

.main {
  @apply p-6 w-full max-w-lg mx-auto flex-grow;
}

.footer {
  @apply p-6 w-full max-w-lg mx-auto text-xs text-center flex-shrink-0;
}

.dm-link {
  @apply text-gray-400 font-normal transition;

  &:hover, &:focus {
    @apply underline text-gray-300;
  }
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