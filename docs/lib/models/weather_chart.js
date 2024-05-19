import WeatherForecast from './weather_forecast.js';

Chart.defaults.datasets.line.pointRadius = 0;
Chart.defaults.datasets.line.tension = 0.1;

export default class WeatherChart {
  constructor(location) {
    this.location = location;
    this.forecast = new WeatherForecast(this.location);
  }

  display(element) {
    this.forecast.forChart().then(data => {
      this._setConfig(data);
      this.chart = new Chart(element, this.config);
    });
  }

  destroy() {
    if(this.chart) this.chart.destroy();
  }

  _setConfig(data) {
    this.config = {
      type: 'line',
      data: {
        labels: data.time,
        datasets: [
          {
            label: 'Temperature',
            data: data.temperature,
            backgroundColor: 'rgb(192, 0, 0)',
            borderColor: 'rgba(192, 0, 0, 0.8)',
            yAxisID: 'temp'
          },
          {
            label: 'Chance of Precip',
            data: data.pop,
            backgroundColor: 'rgba(0, 0, 192, 0.4)',
            borderColor: 'rgba(0, 0, 192, 0.6)',
            fill: 'start'
          },
          // {
          //   label: 'Humidity',
          //   data: data.relativeHumidity,
          //   backgroundColor: 'rgba(0, 0, 192, 0.2)',
          //   borderColor: 'rgba(0, 0, 192, 0.3)'
          // },
          {
            label: 'Wind Speed',
            data: data.windSpeed,
            backgroundColor: 'rgba(255, 128, 128, 0.3)',
            borderColor: 'rgba(255, 128, 128, 0.3)',
            yAxisID: 'wind'
          },
          {
            label: 'Wind Gusts',
            data: data.windGust,
            backgroundColor: 'rgba(255, 128, 128, 0.2)',
            borderColor: 'rgba(255, 128, 128, 0.1)',
            fill: 'stack',
            yAxisID: 'wind'
          },
          {
            label: 'Cloud Cover',
            data: data.cloudAmount,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderColor: 'rgba(0, 0, 0, 0.05)',
            fill: 'start'
          }
        ]
      },
      options: {
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            labels: {
              pointStyle: 'rect',
              usePointStyle: true,
              // filter: l => l.text != 'Wind Gusts'
            }
          },
          title: {
            display: true,
            text: data.location['city-state'] || data.location['areaDescription']
          },
          tooltip: {
            callbacks: {
              afterTitle: x => data.weather[x[0].dataIndex]
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            ticks: {
              align: 'start'
            },
            grid: {
              color: 'rgba(0,0,0,0.3)',
              lineWidth: 3
            },
            time: {
              minUnit: 'day',
              displayFormats: {
                hour: 'ccc h a',
                day: 'cccc'
              }
            }
          },
          y: {
            min: 0,
            max: 100,
            ticks: {
              callback: v => v + '%'
            }
          },
          temp: {
            position: 'right',
            ticks: {
              callback: v => v + '°',
              color: 'rgb(192, 0, 0)'
            },
            grace: 0.5,
            grid: {
              display: false
            }
          },
          wind: {
            position: 'right',
            grid: {
              display: false
            },
            ticks: {
              color: 'rgba(255, 128, 128, 0.6)'
            },
            min: 0,
            suggestedMax: 30
          }
        }
      }
    }
  }
}