<template>
  <header class="header">
    <div class="header__container">
      <router-link :to="{name: 'Lists'}">My Lists</router-link>
      <router-link :to="{name: 'New'}">
        <font-awesome-icon icon="plus-circle"/>
        <span>New List</span>
      </router-link>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  @apply grid place-items-center bg-gl-blue py-6;

  &__container {
    @apply flex justify-between w-full max-w-lg px-6 pb-0;
  }
}
</style>
