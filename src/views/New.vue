<template>
  <div class="new-list">
    <h1>New List</h1>
    <form class="new-list__form" @submit.prevent="createList">
      <div class="new-list__container">
        <label for="name" class="sr-only">New List Name</label>
        <input v-model="name" required
               ref="newListName"
               class="new-list__input"
               type="text" id="name" placeholder="List Name">

        <button type="submit" class="new-list__button">Create</button>
      </div>
    </form>

    <router-link :to="{name: 'Lists'}" class="new-list__cancel">Cancel</router-link>
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
  },
  mounted () {
    this.$refs.newListName.focus()
  }
}
</script>

<style lang="scss">
.new-list {
  @apply grid place-items-center;

  &__form {
    @apply flex justify-center items-center;
  }

  &__input {
    @apply relative w-56 bg-white px-3 py-2 rounded outline-none transition duration-200 ease-in-out border border-gl-gray mr-2;
    @apply dark:border-gray-400 dark:bg-gray-800 dark:text-gray-200;

    &:hover, &:focus {
      @apply ring-4 ring-gl-gray ring-opacity-50 z-10;
      @apply dark:ring-gray-800 dark:ring-opacity-50;
    }
  }

  &__button {
    @apply relative bg-gl-lightgreen px-3 py-2 rounded transition duration-200 ease-in-out border border-gl-green outline-none text-gray-800;
    @apply dark:bg-gl-green dark:border-gl-lightgreen dark:text-gray-200;

    &:hover, &:focus {
      @apply bg-green-300 ring-4 ring-gl-lightgreen ring-opacity-50 z-10;
      @apply dark:ring-gl-green dark:bg-green-800 dark:ring-opacity-30;
    }
  }

  &__cancel {
    @apply mt-6 underline;
  }
}
</style>
