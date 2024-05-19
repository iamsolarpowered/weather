import WeatherChart from 'models/weather_chart.js';

export default {
  props: ['location'],
  data() {
    return {
      chart: null,
      canvas: null,
      canvasID: 'weather-chart'
    }
  },
  mounted() {
    this.canvas = document.getElementById(this.canvasID);
    if(this.location) this.displayChart();
  },
  updated() {
    if(this.chart) this.chart.destroy();
    this.displayChart();
  },
  methods: {
    displayChart() {
      this.chart = new WeatherChart(this.location);
      this.chart.display(this.canvas);
    }
  },
  template: `
    <canvas :id="canvasID" class="weather-chart"></canvas>
  `
}