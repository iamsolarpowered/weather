import SearchForm from 'components/search_form.js';
import Chart from 'components/chart.js';

export default {
  components: {
    SearchForm,
    Chart
  },
  data() {
    return {
      title: 'Loading weather...',
      location: null
    }
  },
  methods: {
    searchResult(result) {
      this.title = `Weather for ${result.name}`;
      this.location = result;
    }
  },
  template: `
    <div>
      <h1>{{title}}</h1>
      <SearchForm @result="searchResult" />
      <Chart :location="location" />
    </div>
  `
}