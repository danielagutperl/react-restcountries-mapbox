import React from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN

class Map extends React.Component {
  constructor() {
    super()
    this.markers = []
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapDiv,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 1
    })

    this.addFlags()
  }

  addFlags() {
    this.markers = this.props.markers
      .filter(country => country.latlng[0] != null && country.latlng[1] != null)
      .map(country => {
        // create a DOM element for the marker - // we'll need to create flag divs using document.createElement
        const el = document.createElement('div')
        el.style.backgroundImage = `url('${country.flag}')`
        el.style.backgroundSize = 'contain'
        el.style.backgroundRepeat = 'no-repeat'
        el.style.width = '30px'
        el.style.height = '15px'

        el.addEventListener('click', function() {
          window.alert(`${country.name}`)
        })

        return new mapboxgl.Marker(el)
          .setLngLat([country.latlng[1], country.latlng[0]])
          .addTo(this.map)
      })
  }

  render() {
    return (
      <div className="map" ref={el => this.mapDiv = el}/>
    )
  }
}

export default Map
