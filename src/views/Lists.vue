<template>
  <div v-if="lists.length" class="lists">
    <div v-for="list in lists" :key="list.id" class="list__container">
      <button :title="'Share your ' + list.name + ' list.'" class="list__icon--share">
        <font-awesome-icon icon="share-alt"/>
      </button>
      <router-link class="list"
                   :to="{name: 'List', params: {id: list.id}}">
        <span>{{ list.name }}</span>
        <button :title="'Delete your ' + list.name + ' list.'"
                @click.prevent="deleteList(list)"
                class="list__icon--delete">
          <font-awesome-icon icon="times-circle"/>
        </button>
      </router-link>
    </div>
  </div>
  <div v-else class="no-lists">
    <span>You have no lists, </span>
    <router-link :to="{name: 'New'}" class="no-lists__link">create one</router-link>
    <span>!</span>
  </div>
</template>

<script>
export default {
  computed: {
    lists () {
      return this.$store.state.lists
    }
  },
  methods: {
    deleteList (list) {
      if (confirm('Are you sure you want to delete your ' + list.name + ' list?')) {
        this.$store.dispatch('deleteList', list.id)
      }
    }
  }
}
</script>

<style lang="scss">
.list {
  @apply flex justify-start items-center px-4 py-3 bg-white rounded border border-gl-lightblue w-full font-bold text-lg transition duration-200 ease-in-out;

  &:hover, &:focus {
    @apply bg-blue-50 border-blue-300 ring-2 ring-blue-300 ring-opacity-50 outline-none;
  }

  &__container {
    @apply flex justify-center items-center;
  }

  &s {
    @apply grid w-full gap-4;
  }

  &__icon {
    &--share {
      @apply flex justify-center items-center bg-white border border-gl-lightblue rounded-full w-12 h-12 mr-4 p-4 transition duration-200 ease-in-out text-lg;

      &:hover, &:focus {
        @apply bg-blue-50 border-blue-300 ring-2 ring-blue-300 ring-opacity-50 outline-none;
      }
    }

    &--delete {
      @apply text-xl ml-auto transition duration-200 ease-in-out;

      &:hover, &:focus {
        @apply text-red-700;
      }
    }
  }
}

.no-lists {
  @apply text-center;

  &__link {
    @apply text-gl-darkblue underline font-medium;
  }
}
</style>
