<template>
  <div>
    <h1 class="list-name">{{ list.name }}</h1>
    <new-item-form :parent-index="$route.params.index"/>
    <div v-if="list.items.length" class="list-items">
      <div v-for="(item, index) in list.items" :key="index" class="list-item" :class="{'obtained': item.checked}">
        <button class="list-item__check" @click="toggleCheckedState(index)">
          <font-awesome-icon v-if="item.checked" icon="check-square"/>
          <font-awesome-icon v-else icon="square"/>
        </button>
        <div class="list-item__quantity">{{ item.quantity }}</div>
        <div class="list-item__name">{{ item.name }}</div>
        <button @click="deleteItem(index)" class="list-link__delete">
          <font-awesome-icon icon="times-circle"/>
        </button>
      </div>
    </div>
    <div v-else>This list has no items. Please add one.</div>
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
  },
  methods: {
    deleteItem(index) {
      let list = this.$store.state.lists[this.$route.params.index];
      list.items.splice(index, 1)
      this.$store.dispatch('updateList', {index: this.$route.params.index, list: list})
    },
    toggleCheckedState(index) {
      let list = this.$store.state.lists[this.$route.params.index];
      list.items[index].checked = !list.items[index].checked;
      this.$store.dispatch('updateList', {index: this.$route.params.index, list: list})
    }
  }
}
</script>

<style lang="scss">
.list-name {
  @apply text-xl font-normal mb-2;
}

.list-item {
  @apply relative flex justify-start items-center border border-green-700 rounded bg-green-800 shadow-md transition duration-200 ease-in-out font-normal;

  &.obtained {
    @apply shadow-none opacity-25;
  }

  &s {
    @apply grid gap-4;
  }

  &__quantity {
    @apply w-16 text-center border-r border-green-700 py-2 px-4;
  }

  &__name {
    @apply py-2 px-4;
  }

  &__check {
    @apply flex justify-center items-center text-2xl ml-3;
  }
}
</style>