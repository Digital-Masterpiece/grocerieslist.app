<template>
  <div v-if="$store.state.lists.length" class="lists">
    <router-link v-for="list in $store.state.lists" :key="list.id" class="list"
                 :to="{name: 'List', params: {id: list.id}}">
      <button :title="'Share your ' + list.name + ' list.'" class="list__icon--share">
        <font-awesome-icon icon="share-alt-square"/>
      </button>
      <span>{{ list.name }}</span>
      <button :title="'Delete your ' + list.name + ' list.'"
              @click.prevent="deleteList(list.id)"
              class="list__icon--delete">
        <font-awesome-icon icon="times-circle"/>
      </button>
    </router-link>
  </div>
  <div v-else class="no-lists">
    <span>You have no lists, </span>
    <router-link :to="{name: 'New'}" class="no-lists__link">create one</router-link>
    <span>!</span>
  </div>
</template>

<script>
export default {
  methods: {
    deleteList (id) {
      this.$store.dispatch('deleteList', id)
    }
  }
}
</script>

<style lang="scss">
.list {
  @apply flex justify-start items-center px-4 py-3 bg-white rounded border border-gl-lightblue w-full font-bold text-lg;

  &s {
    @apply grid w-full gap-4;
  }

  &__icon {
    &--share {
      @apply text-3xl mr-3;
    }

    &--delete {
      @apply text-xl ml-auto;

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
