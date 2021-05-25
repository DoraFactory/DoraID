<template>
  <div class="tx-log" :class="`tx-log-${tx.status.toLowerCase()}`">
    <span class="type">{{ tx.type }}</span>
    <span class="hash">
      TxHash:
      <a target="_blank" :href="`https://etherscan.io/tx/${tx.txHash}`">
        {{ tx.txHash }}
      </a>
    </span>
    <span class="status">
      <img :src="require(`@/assets/logs/${tx.status.toLowerCase()}.svg`)" />
      {{ tx.status }}
    </span>
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
  margin-top 20px
  padding 0 50px
  height 40px
  border-radius 3px
  display flex
  align-items center
  border solid 1px #ffe58f
  background-color #ffe58f
  background-image linear-gradient(to right, rgba(#fff, 0.1), rgba(#fff, 0.7))
  transition background-color .4s, border-color .2s
  .type
    flex 0 0 120px
    font-weight 500
  .hash
    flex 1 1 auto
    a
      color inherit
      text-decoration none
  .status
    flex 0 0 120px
    font-weight 500
    display flex
    align-items center
    color #faad14
    transition color .4s
    >img
      margin-right 14px

.tx-log-success
  background-color #b7eb8f
  border-color #b7eb8f
  .status
    color #52c41a
.tx-log-fail
  background-color #ffe2e0
  border-color #ffe2e0
  .status
    color #f5222d
</style>
