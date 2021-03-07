<template>
  <div>
    <h1 class="sr-only">Welcome!</h1>
    <p v-if="lists.length === 0" class="text-center">Create a new list to get started!</p>
    <div v-else class="list-container">
      <div v-for="list in lists" :key="list.id" class="list-link__container">
        <router-link :to="{name: 'List', params: {id: list.id}}" class="list-link">
          <div>{{ list.name }}</div>
        </router-link>
        <button @click="shareList(list.id)" class="list-link__share">
          <font-awesome-icon icon="share-alt-square"/>
        </button>
        <button @click="deleteList(list.id)" class="list-link__delete">
          <font-awesome-icon icon="times-circle"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: mapState({
    lists: state => state.lists
  }),
  methods: {
    deleteList(id) {
      if (confirm('Are you sure you want to delete your ' + this.$store.getters.getListFromId(id).name + ' list?')) {
        this.$store.dispatch('deleteList', id)
      }
    },
    shareList(id) {
      const supportsShareApi = navigator.share;
      const list = this.$store.getters.getListFromId(id)
      if (list) {
        this.$router.push({
          name: 'Home',
          query: {
            import: btoa(JSON.stringify(list))
          }
        }).then(() => {
          if (supportsShareApi) {
            navigator.share({
              title: list.title,
              url: window.location.href,
              text: 'Check out my list on grocerieslist.app!'
            }).catch(error => console.error(error))
          } else {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = window.location.href;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, 99999);
            document.execCommand("copy");
            input.remove();
          }

        }).then(() => {
          this.$router.go(-1);

          if (!supportsShareApi) {
            const notice = document.querySelector('.link-copied');
            notice.classList.add('shown')
            setTimeout(() => {
              notice.classList.remove('shown')
            }, 1000)
          }
        })
      }
    }
  },
  mounted() {
    document.title = 'grocerieslist.app';

    if (this.$route.query.import) {
      let list = JSON.parse(atob(this.$route.query.import));
      this.$store.dispatch('updateList', list).then(() => {
        this.$router.push('/' + list.id)
      })
    }
  }
}
</script>

<style lang="scss">
.list-container {
  @apply grid gap-4
}

.list-link {
  @apply flex justify-between items-center p-4 pl-14 border border-green-700 rounded bg-green-800 shadow-md transition duration-200 ease-in-out font-normal;

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

  &__share {
    @apply absolute top-0 left-0 mt-2 ml-4 text-2xl;
  }
}
</style>