export default {
  data() {
    return {
      query: ''
    }
  },
  mounted() {
    this.currentLocation();
  },
  methods: {
    search() {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${this.query}`;
      fetch(url)
        .then(res => res.json())
        .then(places => places.find(p => p.display_name.endsWith('United States')))
        .then(this.located);
    },
    reverseSearch(location) {
      const url = `https://nominatim.openstreetmap.org/reverse.php?lat=${location.coords.latitude}&lon=${location.coords.longitude}&zoom=13&format=jsonv2`;
      fetch(url)
        .then(res => res.json())
        .then(this.located);
    },
    currentLocation() {
      navigator.geolocation.getCurrentPosition(this.reverseSearch, this.geolocationError);
      this.query = '';
    },
    located(location) {
      this.$emit('result', location);
    },
    geolocationError(error) {
      console.error(error);
      this.located({
        name: 'example location',
        lat: 42.0,
        lon: -83.5
      });
    }
  },
  template: `
    <form @submit.prevent="search" class="search">
      <input v-model="query" type="search" placeholder="Search" />
      &nbsp;
      <input type="submit" value="🔎" />
      <br />
      <a @click.prevent="currentLocation" href="#">
        Current location
      </a>
      <br />
      <small>(Forecasts are limited to The United States for now.)</small>
    </form>
  `
}