<template>
  <div>
    <h1 class="list-name">{{ list.name }}</h1>
    <new-item-form/>
    <button @click="deleteCheckedItems" class="remove-checked" title="Remove All Checked Items">Remove Checked</button>
    <button @click="filterItems('alpha')" class="filter-button" title="Filter Alphanumerically">A-Z</button>
    <div v-if="list.items.length" class="list-items">
      <div v-for="(item, index) in list.items" :key="index" class="list-item" :class="{'obtained': item.checked}">
        <button class="list-item__check" @click="toggleCheckedState(index)">
          <font-awesome-icon v-if="item.checked" icon="check-square"/>
          <font-awesome-icon v-else icon="square"/>
        </button>
        <div class="list-item__quantity"
             @blur="modifyItemQuantity($event, index)"
             @keypress.enter="modifyItemQuantity($event, index)"
             inputmode="decimal"
             contenteditable>
          {{ item.quantity }}
        </div>
        <div class="list-item__name"
             @blur="modifyItemName($event, index)"
             @keypress.enter="modifyItemName($event, index)"
             contenteditable>
          {{ item.name }}
        </div>
        <button @click="deleteItem(index, item.name)" class="list-link__delete">
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
      return this.$store.getters.getListFromId(this.$route.params.id)
    }
  },
  methods: {
    deleteCheckedItems() {
      const list = this.list
      list.items = list.items.filter(item => !item.checked)
      this.$store.dispatch('updateList', list)
    },
    deleteItem(index, name) {
      if (confirm('Are you sure you want to remove ' + name + ' from this list?')) {
        const list = this.list
        list.items.splice(index, 1)
        this.$store.dispatch('updateList', list)
      }
    },
    modifyItemQuantity(event, index) {
      const list = this.list
      if (event.target.innerText && !isNaN(event.target.innerText)) {
        list.items[index].quantity = event.target.innerText
        this.$store.dispatch('updateList', list)
      } else {
        event.target.innerText = list.items[index].quantity
      }
      event.target.blur()
    },
    modifyItemName(event, index) {
      const list = this.list
      if (event.target.innerText) {
        list.items[index].name = event.target.innerText
        this.$store.dispatch('updateList', list)
      }
      event.target.blur();
    },
    toggleCheckedState(index) {
      const list = this.list
      list.items[index].checked = !list.items[index].checked
      this.$store.dispatch('updateList', list)
    },
    filterItems(type) {
      if (type === 'alpha') {
        const list = this.list;
        list.items.sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0;
        })
        this.$store.dispatch('updateList', list)
      }
    }
  },
  mounted() {
    document.title = this.list.name + ' | grocerieslist.app';
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
    @apply w-16 h-full flex justify-center items-center border-r border-l ml-3 border-green-700 py-2 px-4;
  }

  &__name {
    @apply py-2 px-4 w-full;
  }

  &__check {
    @apply flex justify-center items-center text-2xl ml-3;
  }
}

.remove-checked {
  @apply text-xs bg-red-800 p-2 rounded shadow-md mb-4 border border-red-700 font-light leading-none;
}

.filter-button {
  @apply text-xs bg-yellow-800 p-2 rounded shadow-md mb-4 ml-4 border border-yellow-700 font-light leading-none;
}
</style>