<template>
  <div id="activate">
    <div class="activate-button full fc" :disabled="status.authed" @click="activate">
      <span>Activate</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Activate',
  computed: {
    ...mapState(['status']),
  },
  methods: {
    activate() {
      if (this.status.authed) {
        return
      }
      this.$toast.info('This feature is coming soon.')
    },
  },
}
</script>

<style lang="stylus" scoped>
#activate
  overflow hidden
  position relative
.activate-button
  color #0a707f
  flex-direction column
  background-image radial-gradient(circle 400px at center, #a2faff 0%, #7fdaf1 47%, #4cb5ff 100%)
  transition transform .5s, filter .5s
  cursor pointer
  z-index 100
  >span
    font-size 36px
  >p
    margin-top 4px
  &[disabled]
    filter grayscale(.9) brightness(1.1)
    cursor not-allowed
</style>
