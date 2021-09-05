<template>
  <div class="new-list">
    <form class="new-list__form" @submit.prevent="createList">
      <div class="new-list__container">
        <label for="name" class="sr-only">List Name</label>
        <input v-model="name" required
               class="new-list__input"
               type="text" id="name" placeholder="List Name">

        <button type="submit" class="new-list__button">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import List from '@/classes/List.js'

export default {
  data () {
    return {
      name: null
    }
  },
  methods: {
    createList () {
      this.$store.dispatch('createList', new List(this.name, []))
        .then(() => this.$router.push({
          name: 'List',
          params: { id: this.$store.state.lists[this.$store.state.lists.length - 1].id }
        }))
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
    @apply rounded border border-gl-lightblue;
  }

  &__input {
    @apply w-56 bg-white px-3 py-2 rounded-l outline-none;
  }

  &__button {
    @apply bg-gray-100 px-3 py-2 rounded-r transition duration-200 ease-in-out border-l border-gl-lightblue;

    &:hover, &:focus {
      @apply bg-gl-lightblue;
    }
  }
}
</style>
