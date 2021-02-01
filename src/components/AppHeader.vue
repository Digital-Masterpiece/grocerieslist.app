<template>
  <header class="header">
    <nav aria-label="Primary" class="header__nav">
      <router-link to="'/" title="View my Lists" class="header__link">
        <font-awesome-icon icon="list-alt" class="header__link__icon"/>
        <span>My Lists</span>
      </router-link>
      <router-link to="/new" title="Create a new List" class="header__link header__link--new-list">
        <font-awesome-icon icon="plus-circle" class="header__link__icon"/>
        <span>New List</span>
      </router-link>
    </nav>
  </header>
</template>

<style lang="scss">
.header {
  @apply flex justify-center items-center flex-shrink-0 p-6 text-xl w-full bg-gray-800 border-b border-gray-600;

  &__nav {
    @apply flex justify-between items-center w-full max-w-lg;
  }

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