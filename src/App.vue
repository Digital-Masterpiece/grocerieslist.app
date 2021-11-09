<template>
  <div v-if="loaded">
    <app-header/>
    <main id="main" class="main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.fullPath"/>
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
  components: { AppHeader },
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    importList () {

    }
  },
  mounted () {
    this.$store.dispatch('init').then(() => {
      this.loaded = true

      if (this.$route.query.import) {
        const jsonString = atob(this.$route.query.import.toString())
        const newList = JSON.parse(jsonString)

        // If this list already exists we have to run a differential on the items, otherwise just add it.
        const existingList = this.$store.state.lists.find(list => list.id === newList.id)
        if (existingList) {
          newList.items.forEach(newListItem => {
            // If this item already exists on this list, update it appropriately, otherwise just add it.
            const existingListItem = existingList.items.find(existingListItem => existingListItem.id === newListItem.id)
            if (existingListItem) {
              if (existingListItem.deleted || newListItem.deleted) {
                newListItem.deleted = existingListItem.deleted ?? newListItem.deleted
              }
              if (existingListItem.updated >= newListItem.updated) {
                newListItem = existingListItem
              }
            } else {
              existingList.items.push(newListItem)
            }
          })

          this.$store.dispatch('updateList', newList)
        } else {
          this.$store.dispatch('createList', newList)
        }
      }
    })
  }
}
</script>

<style lang="scss">
.main {
  @apply p-6 w-full max-w-lg mx-auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-to {
  transform: translateX(-4rem);
}

.fade-enter-from {
  transform: translateX(4rem);
}
</style>
