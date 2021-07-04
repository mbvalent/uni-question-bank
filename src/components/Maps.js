import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { Component } from "react";

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    mapCenter: {
      lat: 49.2827291,
      lng: -123.1207375,
    },
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        initialCenter={{
          lat: this.state.mapCenter.lat,
          lng: this.state.mapCenter.lat,
        }}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        {/* <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper((props) => ({
  apiKey: "AIzaSyD4ZOWt4Bevil5fLxOYLIZUb9ztl2gykqA",
}))(MapContainer);
