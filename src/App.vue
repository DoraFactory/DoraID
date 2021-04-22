<template>
  <div id="app">
    <div class="dora-account">
      <div class="icon"><span>已认证</span></div>
      <div class="account">{{ account }}</div>
    </div>
    <div>
      <p>Dorayaki Balance: 20 DORA</p>
      <p>质押数量: 100 DORA</p>
      <p>质押时间: 2021/5/16 (7天3小时)</p>
    </div>
    <div class="dora-console">
      <div>质押</div>
      <div>
        <p>取回</p>
        <p>(7天3小时)</p>
      </div>
      <div>
        <p>激活</p>
      </div>
    </div>
    <div class="dora-logs">
      <div>
        <span>Approve交易</span>
        <span>TxHash: 0x73b981676e6de7cbee7d8efc930651c9a5760755c25ed9eaa34cf99d8c462ef9</span>
        <span>Pending</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['account', 'network']),
  },
  mounted() {
    this.$store.dispatch('CONNECT')
  },
  methods: {
    logOut() {
      this.$store.dispatch('DISCONNECT')
    },
  },
}
</script>

<style lang="stylus">
body, p
  margin 0

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  margin auto
  max-width 1200px

.dora-account
  margin-top 100px
  display flex
  .icon
    margin-right 20px
    width 80px
    height 80px
    border-radius 40px
    background-color #cddc39
    position relative
    span
      position absolute
      font-size 12px
      font-weight 800
      white-space nowrap
      opacity .4
      bottom 6px
      left 50%
      transform translateX(-50%)
  .account
    padding 0 50px
    height 80px
    flex 1 1 auto
    border-radius 40px
    background-color #ffd54f
    font-size 24px
    font-family monospace
    display flex
    align-items center

.dora-console
  margin 80px 0
  display grid
  grid-gap 40px
  grid-template-columns repeat(5, 1fr)
  >div
    height 300px
    display flex
    flex-direction column
    justify-content center
    align-items center
    font-size 36px
    background-color #e0e0e0
    border-radius 40px
    cursor pointer
  >div:nth-child(1)
    grid-column 1/3
  >div:nth-child(2)
    grid-column 3/5
</style>
