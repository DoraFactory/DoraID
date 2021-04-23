<template>
  <div class="tx-log" :class="`tx-log-${tx.status.toLowerCase()}`">
    <span class="type">{{ tx.type }}</span>
    <span class="hash">
      TxHash:
      <a target="_blank" :href="`https://etherscan.io/tx/${tx.txHash}`">
        <code>{{ tx.txHash }}</code>
      </a>
    </span>
    <span class="status">{{ tx.status }}</span>
  </div>
</template>

<script>
export default {
  name: 'TxLog',
  props: {
    tx: {
      type: Object,
      default: () => ({
        txHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        type: 'UnDefined',
        status: 'Error',
      }),
    },
  },
}
</script>

<style lang="stylus" scoped>
.tx-log
  margin-bottom 10px
  padding 0 40px
  height 60px
  border-radius 20px
  display flex
  align-items center
  justify-content center
  background-color #e4e9f1
  background-image linear-gradient(135deg, rgba(#f5f7fa, 0.8) 0%, rgba(#c3cfe2, 0) 100%)
  font-size 18px
  color rgba(#000, .8)
  transition background-color 1s
  .type
    flex 0 0 140px
    font-weight 800
  .hash
    flex 1 1 auto
    a
      color inherit
      text-decoration none
  .status
    flex 0 0 100px
    text-align right
    font-weight 800
    transition color .4s

.tx-log-success
  background-color #d6f3ad
  .status
    color #689f38
.tx-log-fail
  background-color #f9dada
  .status
    color #e57373
</style>
