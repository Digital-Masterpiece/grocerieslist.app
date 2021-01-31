<template>
  <header class="header">
    <router-link to="'/" title="View my Lists" class="header__link">
      <font-awesome-icon icon="list-alt" class="header__link__icon"/>
      <span>My Lists</span>
    </router-link>
    <router-link to="/new" title="Create a new List" class="header__link header__link--new-list">
      <font-awesome-icon icon="plus-circle" class="header__link__icon"/>
      <span>New List</span>
    </router-link>
  </header>
</template>

<style lang="scss">
.header {
  @apply flex justify-center items-center p-6 text-xl border-b border-green-700;

  &__link {
    @apply flex justify-center items-center;
    &__icon {
      @apply mr-2 text-2xl;
    }
    &--new-list {
      @apply ml-auto;
    }
  }
}
</style>