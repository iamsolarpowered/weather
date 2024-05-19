export default class WeatherForecast {
  constructor(location) {
    this.location = location;
  }

  get url() {
    return `https://f1.weather.gov/MapClick.php?lat=${this.location.lat}&lon=${this.location.lon}&FcstType=digitalJSON`
  }

  async fetchData() {
    return fetch(this.url).then(res => res.json());
  }

  async forChart() {
    let formattedData = {
      cloudAmount: [],
      pop: [],
      relativeHumidity: [],
      temperature: [],
      unixtime: [],
      weather: [],
      windGust: [],
      windSpeed: []
    }

    return this.fetchData().then(data => {
      Object.values(data['PeriodNameList']).forEach(period => {
        Object.keys(formattedData).forEach(key => {
          if(data[period])
            formattedData[key].push(...data[period][key]);
        });
      });

      formattedData.location = data.location;
      formattedData.time = formattedData.unixtime.map(t => parseInt(t) * 1000);

      return formattedData;
    });
  }
}