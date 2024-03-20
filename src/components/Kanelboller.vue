<template>
  <img class="kanelboller-image" :style="componentStyles" src="../assets/img/kanelboller.png" alt="Kanelboller" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Kanelboller',
  props: {
    size: {
      type: String,
      default: '20',
    },
  },
  computed: {
    componentStyles() {
      return {
        '--image-height': this.size + 'px',
      }
    },
  },
})
</script>

<style scoped lang="scss">
.kanelboller-image {
  height: var(--image-height);
}
</style>
