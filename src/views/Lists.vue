<template>
  <div v-if="$store.state.lists.length" class="lists">
    <router-link v-for="list in $store.state.lists" :key="list.id" class="list"
                 :to="{name: 'List', params: {id: list.id}}">{{ list.name }}
    </router-link>
  </div>
  <div v-else class="no-lists">
    <span>You have no lists, </span>
    <router-link :to="{name: 'New'}" class="no-lists__link">create one</router-link>
    <span>!</span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.list {
  @apply px-4 py-3 bg-white rounded border border-gl-lightblue w-full font-bold text-lg;

  &s {
    @apply grid w-full gap-4;
  }
}

.no-lists {
  @apply text-center;

  &__link {
    @apply text-gl-darkblue underline font-medium;
  }
}
</style>
