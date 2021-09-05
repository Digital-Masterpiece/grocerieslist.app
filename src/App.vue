<template>
  <div v-if="loaded">
    <app-header/>
    <main id="main" class="main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.fullPath"/>
        </transition>
      </router-view>
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-to {
  transform: translateX(-4rem);
}

.fade-enter-from {
  transform: translateX(4rem);
}
</style>
