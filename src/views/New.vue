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

  &__container {
    @apply rounded border border-gl-lightblue;
  }

  &__input {
    @apply relative w-56 bg-white px-3 py-2 rounded-l outline-none transition duration-200 ease-in-out;

    &:focus {
      @apply border-blue-300 ring-4 ring-blue-300 ring-opacity-50 z-10;
    }
  }

  &__button {
    @apply relative bg-gray-100 px-3 py-2 rounded-r transition duration-200 ease-in-out border-l border-gl-lightblue outline-none;

    &:hover {
      @apply bg-blue-50;
    }

    &:focus {
      @apply border-blue-300 ring-4 ring-blue-300 ring-opacity-50 z-10;
    }
  }
}
</style>
