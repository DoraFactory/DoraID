<template>
  <div id="activate">
    <div class="activate-button full fc" :opened="opened" :disabled="status.authed" @click="toggle">
      <span>Activate</span>
      <span v-if="status.authed">(Authed)</span>
    </div>
    <div class="border full"></div>
    <div class="activate">
      <div @click="copy">
        <img src="@/assets/share.svg" />
        <span>复制我的链接</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Activate',
  computed: {
    ...mapState(['account', 'route', 'status']),
    opened() {
      return this.route === '#activate'
    },
  },
  methods: {
    activate() {
      if (this.status.authed) {
        return
      }
      this.$toast.info('This feature is coming soon.')
    },
    toggle() {
      if (this.status.authed) {
        return
      }
      if (this.opened) {
        this.$store.commit('UPDATE_ROUTE', '')
      } else {
        this.$store.commit('UPDATE_ROUTE', '#activate')
      }
    },
    copy() {
      this.$store.commit('UPDATE_ROUTE', '#a?t=' + this.account.toLowerCase())

      const input = document.createElement('input')
      document.body.appendChild(input)
      input.value = location.href
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)

      this.$toast.success('Link copied!')
    },
  },
}
</script>

<style lang="stylus" scoped>
#activate
  overflow hidden
  position relative
  background-color #fff
  box-shadow inset 4px 6px 20px #0002
.activate-button
  color #0a707f
  flex-direction column
  background-image linear-gradient(-30deg, #a2faff 0%, #7fdaf1 100%)
  // background-image radial-gradient(circle 400px at center, #a2faff 0%, #7fdaf1 47%, #4cb5ff 100%)
  transition all .5s
  cursor pointer
  z-index 100
  >span:first-child
    font-size 36px
  >p
    margin-top 4px
  &[opened]
    transform translateX(calc(100% - 40px))
  &[disabled]
    color #0a707f80
    filter grayscale(.86) brightness(1.08)
    cursor not-allowed
.border
  background-color #1bd3ea
  transform translateX(calc(100% - 48px))
  transition transform .5s
  z-index 50
.activate
  padding 40px 0
  margin 0 80px 0 40px
  height 100%
  font-size 14px
  position relative
  box-sizing border-box
  display flex
  flex-direction column
  justify-content center
  >div
    cursor pointer
    color #0a707f
  img
    width 100%
</style>
