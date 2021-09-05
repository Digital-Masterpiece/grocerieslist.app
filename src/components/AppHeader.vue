<template>
  <header class="header">
    <div class="header__container">
      <router-link :to="{name: 'Lists'}">My Lists</router-link>
      <router-link :to="{name: 'New'}">New List</router-link>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  @apply grid place-items-center;

  &__container {
    @apply max-w-sm;
  }
}
</style>
