<template>
  <div class="new-list">
    <form class="new-list__form">

      <div class="new-list__container">
        <label for="name" class="sr-only">List Name</label>
        <input v-model="name"
               class="new-list__input"
               type="text" id="name" placeholder="List Name">

        <button type="submit" class="new-list__button">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: null
    }
  }
}
</script>

<style lang="scss">
.new-list {
  @apply grid place-items-center;

  &__form {
    @apply flex justify-center items-center;
  }

  &__container {
    @apply shadow rounded;
  }

  &__input {
    @apply bg-white px-3 py-2 rounded-l outline-none;
  }

  &__button {
    @apply bg-gray-100 px-3 py-2 rounded-r transition duration-200 ease-in-out;

    &:hover, &:focus {
      @apply bg-green-100;
    }
  }
}
</style>
