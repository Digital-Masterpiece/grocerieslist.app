<template>
  <div class="link-copied">
    <div class="link-copied__container">
      <font-awesome-icon icon="clipboard-check" class="link-copied__icon"/>
      <span>Link copied to clipboard!</span>
    </div>
  </div>
</template>

<style lang="scss">
.link-copied {
  @apply flex justify-center items-center fixed bottom-0 right-0 left-0 p-6 pb-0 text-center text-xs font-medium transition-all duration-200 ease-in-out opacity-0 pointer-events-none;

  &.shown {
    @apply opacity-100 pointer-events-auto pb-6;
  }

  &__container {
    @apply flex justify-center items-center bg-blue-800 p-3 rounded shadow;
  }

  &__icon {
    @apply mr-3 text-base;
  }
}
</style>