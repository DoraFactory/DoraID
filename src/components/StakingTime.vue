<template>
  <div style="display: contents">
    <template v-if="endTime">
      <span>{{ date }}</span>
      <!-- <span class="time-left">距离解锁还有: {{ timeLeft }}</span> -->
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
        this.timeLeft = '0sec'
        return
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
.time-left
  color #ccc
  margin-left 20px
</style>
