<template>
  <div>
    <h1 class="list-name">{{ list.name }}</h1>
    <new-item-form :parent-index="$route.params.index" />
    <div class="list-items">
      <div v-for="(item, index) in list.items" :key="index" class="list-item">
        <div class="list-item__quantity">{{ item.quantity }}</div>
        <div class="list-item__name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import NewItemForm from "@/components/NewItemForm";
export default {
  components: {NewItemForm},
  computed: {
    list() {
      return this.$store.state.lists[this.$route.params.index]
    }
  }
}
</script>

<style lang="scss">
.list-name {
  @apply text-xl font-normal;
}
.list-item {
  @apply flex justify-start items-center border border-green-700 rounded bg-green-800 shadow-md transition duration-200 ease-in-out font-normal;

  &s {
    @apply grid gap-2;
  }

  &__quantity {
    @apply w-16 text-center border-r border-green-700 py-2 px-4;
  }

  &__name {
    @apply py-2 px-4;
  }
}
</style>