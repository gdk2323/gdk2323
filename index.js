/*
function initMap() {
  const MyLocation = { lat: -2.9091779728074827, lng: 104.66893718344558 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: MyLocation,
  });

  new google.maps.Marker({
    position: MyLocation,
    map,
    title: "My Location!",
  });


  const masjid = [{ lat: -2.909239182719473, lng: 104.6689150120379 }, { lat: -2.909021157463365, lng: 104.66893170025484 }];

  masjid.forEach(el => new google.maps.Marker({
    position: el,
    map,
  }));

  // Nearby search
  // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-2.9091779728074827%2C104.66893718344558&radius=1500&keyword=mosque&key=AIzaSyAEaiq8B-k8u4L4_nPicFVsScFZykGcpqE
}
*/

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -2.9091779728074827, lng: 104.66893718344558  },
    zoom: 18,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}