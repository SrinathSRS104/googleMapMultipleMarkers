import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import "./App2.css";
import markers from "./SampleData.json";

const mapStyles = {
  width: "400px",
  height: "100vh"
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    stores: [
      { latitude: 6.9271, longitude: 79.8612, name: 'Loacation 1' },
      { latitude: 6.9253, longitude: 79.8615, name: 'Loacation 2' },
      { latitude: 6.9288, longitude: 79.8618, name: 'Loacation 3' },
      { latitude: 6.938, longitude: 79.862, name: 'Loacation 4' },
      { latitude: 6.9285, longitude: 79.855, name: 'Loacation 5'}
    ]
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
            onClick={this.onMarkerClick}
            name={store.name}
            key={index}
            id={index}
            position={{
                lat: store.latitude,
                lng: store.longitude
            }}
        />
      );
    });
  };

  render() {
    return (
      <div class="container">
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 6.9271,
            lng: 79.8612
          }}
          
        >
          {this.displayMarkers()}
          <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4> Hey there, You are at {this.state.selectedPlace.name} </h4>
          </div>
        </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDZgOrUcyMMy55PtNNWmJd_R6BMlzauM7g"
})(MapContainer);
