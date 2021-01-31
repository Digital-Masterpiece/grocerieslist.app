<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
html {
  font-family: 'Inter', sans-serif;
  @apply bg-green-900 text-white font-light;
}
</style>