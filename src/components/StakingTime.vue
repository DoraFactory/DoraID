<template>
  <div style="display: contents">
    <template v-if="endTime">
      <span>{{ date }}</span>
      <span class="time-left">距离解锁还有: {{ timeLeft }}</span>
    </template>
    <template v-else>
      <span>已解锁</span>
    </template>
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
  },
  computed: {
    date() {
      return new Date(this.endTime).toLocaleString()
    },
  },
  data() {
    return {
      interval: 0,

      timeLeft: '',
    }
  },
  mounted() {
    this.update()
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
        return ''
      }
      const dt = this.endTime - now
      const days = Math.floor(dt / 86400000)
      const hours = Math.floor((dt % 86400000) / 3600000)
      const minutes = Math.floor((dt % 3600000) / 60000)
      const seconds = Math.floor((dt % 60000) / 1000)
      let output = ''
      if (days) {
        output = `${days}天 ${hours}小时`
      } else if (hours) {
        output = `${hours}小时 ${minutes}分钟`
      } else if (minutes) {
        output = `${minutes}分钟 ${seconds}秒`
      } else {
        output = `${seconds}秒`
      }
      this.timeLeft = output
    },
  },
}
</script>

<style lang="stylus" scoped>
.time-left
  color #ccc
  margin-left 20px
</style>
