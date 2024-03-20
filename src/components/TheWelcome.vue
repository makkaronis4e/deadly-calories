<template>
  <div class="wrapper" @click="handleEvent">
    <div class="tag">
      <div class="tag__text">Deadly Calories Version</div>
      <Kanelboller size="40" />
    </div>
  </div>
</template>

<script lang="ts">
import Kanelboller from '@/components/Kanelboller.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { Kanelboller },
  created: function () {
    document.addEventListener('keydown', this.handleEvent)
  },
  unmounted() {
    document.removeEventListener('keydown', this.handleEvent)
  },
  methods: {
    handleEvent() {
      this.$router.push('/about')
    },
  },
})
</script>

<style scoped lang="scss">
.wrapper {
  height: 100vh;
  background: url('../assets/img/welcome_bg.webp') no-repeat center;
  background-size: cover;
  position: relative;
  cursor: pointer;
}

.tag {
  position: fixed;
  right: -6rem;
  top: 5rem;
  display: flex;
  align-items: center;
  background-color: #28a112;
  padding: 4px 5rem;
  transform: rotate(45deg);

  &__text {
    font-family: 'mk2', serif;
    font-weight: 500;
    margin-right: 1rem;
    color: white;
    text-shadow: 2px 2px 2px #181818;
  }
}
</style>
