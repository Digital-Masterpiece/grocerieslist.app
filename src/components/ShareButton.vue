<template>
  <button @click="shareList(list.id)" class="share-button" title="Share this List.">
    <font-awesome-icon v-if="this.type === 'icon'" icon="share-alt-square"/>
    <span v-if="this.type === 'text'">Share</span>
  </button>
</template>

<script>
export default {
  props: {
    list: Object,
    type: {
      type: String,
      default: 'icon'
    }
  },
  methods: {
    shareList(id) {
      const supportsShareApi = navigator.share;
      const list = this.$store.getters.getListFromId(id)
      if (list) {
        const url = window.location.origin + '?import=' + btoa(JSON.stringify(list));

        if (supportsShareApi) {
          navigator.share({
            title: list.name,
            url: url,
            text: 'Check out my ' + list.name + ' list on grocerieslist.app!'
          }).catch(error => console.error(error))
        } else {
          const input = document.createElement('input');
          input.type = 'text';
          input.value = url;
          document.body.appendChild(input);
          input.select();
          input.setSelectionRange(0, 99999);
          document.execCommand("copy");
          input.remove();

          const notice = document.querySelector('.link-copied');
          notice.classList.add('shown')
          setTimeout(() => {
            notice.classList.remove('shown')
          }, 1000)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.share-button {
  @apply text-2xl;
}
</style>