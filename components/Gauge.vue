<template>
  <!-- Plotly.js Gauge Chart 0-100 scale-->
</template>

<script>
  let Plotly = null
  if (process.browser) { // Run this is browser, no SSR
    Plotly = require('plotly.js/lib/core')

    Plotly.register([
      require('plotly.js/lib/scatter')
    ])
  }

  export default {
    name: 'PlotlyGaugeChart',
    props: ['chart-data', 'layout', 'controls'],
    data () {
      return {
        presetLayout: {
          autoresize: true,
          xaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
          },
          margin: {
            t: 25,
            l: 0,
            b: 0,
            r: 0
          },
          yaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
          }
        },
        presetControls: {
          displayModeBar: false,
          modeBarButtonsToRemove: ['sendDataToCloud'],
          displaylogo: false,
          showTips: false
        }
      }
    },
    mounted () {
      if (!this.chartData) {
        console.error('No chart data was found when rendering a ' + this.name + ' component.')
      }

      let level = this.chartData.value

      let degrees = 100 - level
      let radius = 0.5
      let radians = degrees * Math.PI / 100
      let x = radius * Math.cos(radians)
      let y = radius * Math.sin(radians)

      let mainPath = 'M -.0 -0.025 L .0 0.025 L '
      let pathX = String(x)
      let space = ' '
      let pathY = String(y)
      let pathEnd = ' Z'
      let path = mainPath.concat(pathX, space, pathY, pathEnd)

      let pathLayout = {
        shapes: [{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }]
      }

      let data = [{
        type: 'scatter',
        x: [0],
        y: [0],
        marker: {size: 28, color: '850000'},
        showlegend: false,
        text: level + '%',
        hoverinfo: 'text'
      }, {
        values: [50 / 5, 50 / 5, 50 / 5, 50 / 5, 50 / 5, 50],
        rotation: 90,
        text: ['81-100%', '61-80%', '41-60%', '21-40%', '0-20%'],
        textinfo: 'text',
        textposition: 'inside',
        marker: {
          colors: ['rgba(139,195,74 ,1)', 'rgba(205,220,57 ,1)',
            'rgba(255,235,59 ,1)', 'rgba(255,193,7 ,1)',
            'rgba(255,87,34 ,1)', 'rgba(255, 255, 255, .0)'
          ]
        },
        labels: ['81-100%', '61-80%', '41-60%', '21-40%', '0-20%'],
        hoverinfo: 'label',
        hole: 0.5,
        type: 'pie',
        showlegend: false
      }]

      let layout = Object.assign(this.presetLayout, pathLayout)
      layout = Object.assign(this.presetLayout, this.layout)
      let controls = Object.assign(this.presetControls, this.controls)

      Plotly.plot(this.$el, data, layout, controls)
      // Resize Function
      window.addEventListener('resize', () => {
        Plotly.Plots.resize(this.$el)
      })
    }
  }
</script>
