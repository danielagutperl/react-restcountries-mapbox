
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './scss/style.scss'

import Map from './components/Map'

class App extends React.Component {
  constructor() {
    super()

    this.state = { countries: null }
  }

  componentDidMount() {
    this.getCountryPointsFromRESTCoutries()
  }

  getCountryPointsFromRESTCoutries() {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(({ data }) => {
        const countries = data.map(country => ({
          name: country.name,
          flag: country.flag,
          latlng: country.latlng
        }))

        this.setState({ countries })
        // console.log(data)
        // console.log(typeof(data))
        //
        // console.log(result)
        // console.log(this.points)
      })
      .catch(err => console.log(err))
  }



  render() {
    if (!this.state.countries) return null
    return (
      <Map
        markers={this.state.countries}
      />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
