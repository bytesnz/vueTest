<template>
  <gauge-chart class="chart-center gauge" :chart-data="battery.data" :layout="battery.layout"
               :controls="battery.controls"></gauge-chart>
</template>

<script>
  import GaugeChart from '~/components/Gauge'

  export default {
    name: 'Health',
    components: {
      GaugeChart
    },
    data () {
      return {
        battery: {
          data: {
            value: 65
          },
          layout: {
            //
          },
          controls: {
            //
          }
        }
      }
    },
    head () {
      // Set Meta Tags for this Page
      return {
        title: 'Test',
      }
    }
    // and more functionality to discover
  }
</script>

<style scoped>
</style>
