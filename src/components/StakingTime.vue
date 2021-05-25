<template>
  <div class="staking-status">
    <span v-if="locked">{{ timeLeft }}</span>
    <img v-if="locked" src="@/assets/lock/off.svg" />
    <img v-else src="@/assets/lock/on.svg" />
  </div>
</template>

<script>
export default {
  name: 'StakingTime',
  props: {
    endTime: {
      type: Number,
      default: 0,
    },
    locked: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      interval: 0,

      timeLeft: '',
    }
  },
  watch: {
    endTime() {
      this.update()
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.update()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    update() {
      const now = Date.now()
      if (now > this.endTime) {
        this.timeLeft = ''
        this.$emit('update:locked', false)
        return
      } else if (!this.locked) {
        this.$emit('update:locked', true)
      }
      const dt = this.endTime - now
      const days = Math.floor(dt / 86400000)
      const hours = Math.floor((dt % 86400000) / 3600000)
      const minutes = Math.floor((dt % 3600000) / 60000)
      const seconds = Math.floor((dt % 60000) / 1000)
      let output = ''
      if (days) {
        output = `${days}days ${hours}h`
      } else if (hours) {
        output = `${hours}h ${minutes}min`
      } else if (minutes) {
        output = `${minutes}min ${seconds}sec`
      } else {
        output = `${seconds}sec`
      }
      this.timeLeft = output
    },
  },
}
</script>

<style lang="stylus" scoped>
.staking-status
  position relative
  span
    position absolute
    top 50%
    left 50%
    transform translate3d(-50%, -50%, 0)
    white-space nowrap
    font-weight 600
    // text-shadow 2px 2px #fff, -2px 2px #fff, -2px -2px #fff, 2px -2px #fff, 2px 0 #fff, -2px 0 #fff, 0 -2px #fff, 0 2px #fff
    // color #aeb0c1
    display none
  img
    display block
</style>
