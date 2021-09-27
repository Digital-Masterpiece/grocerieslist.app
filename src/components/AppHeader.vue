<template>
  <header class="header">
    <div class="header__container">
      <router-link :to="{name: 'Lists'}" class="header__title">GROCERIES LIST</router-link>
      <router-link :to="{name: 'New'}" class="header__link">
        <font-awesome-icon icon="plus-circle" class="header__link__icon"/>
        <span>New List</span>
      </router-link>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  @apply grid place-items-center bg-gl-blue py-6;

  &__container {
    @apply flex justify-between items-center w-full max-w-lg px-6 pb-0;
  }

  &__title {
    font-family: 'Barlow Semi Condensed', sans-serif;
    @apply font-bold text-2xl;
  }

  &__link {
    @apply flex justify-center items-center font-semibold;

    &__icon {
      @apply mr-1 text-lg;
    }
  }
}
</style>
