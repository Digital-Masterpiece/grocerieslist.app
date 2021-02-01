<template>
  <div>
    <h1 class="sr-only">Welcome!</h1>
    <p v-if="lists.length === 0">Create a new list to get started!</p>
    <div v-else class="list-container">
      <div v-for="(list, index) in lists" :key="index" class="list-link__container">
        <router-link :to="{name: 'List', params: {index: index}}" class="list-link">
          <div>{{ list.name }}</div>
        </router-link>
        <button @click="deleteList(index)" class="list-link__delete">
          <font-awesome-icon icon="times-circle"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    lists: state => state.lists
  }),
  methods: {
    deleteList(index) {
      if (confirm('Are you sure you want to delete ' + this.$store.state.lists[0].name + '?')) {
        this.$store.dispatch('deleteList', index)
      }
    }
  },
  mounted() {
    document.title = 'grocerieslist.app';
  }
}
</script>

<style lang="scss">
.list-container {
  @apply grid gap-4
}

.list-link {
  @apply flex justify-between items-center p-4 border border-green-700 rounded bg-green-800 shadow-md transition duration-200 ease-in-out font-normal;

  &__container {
    @apply relative leading-none;
  }

  &:hover, &:focus {
    @apply bg-green-700 border-green-600;
  }

  &__delete {
    @apply flex justify-center items-center text-xl absolute top-0 right-0 -mt-3 -mr-3 rounded-full h-8 w-8 text-gray-300 transition duration-200 ease-in-out;

    &:hover, &:focus {
      @apply text-red-400;
    }
  }
}
</style>