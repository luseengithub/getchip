// content of index.js
const http = require('http')
const port = 3000

var wifi = require('node-wifi');

// Initialize wifi module
// Absolutely necessary even to set interface to null
wifi.init({
    iface : null // network interface, choose a random wifi interface if set to null
});

const requestHandler = (request, response) => {
  console.log(request.url)

  // Scan networks
  wifi.scan(function(err, networks) {
      if (err) {
          console.log(err);
      } else {
          console.log(networks);
          console.log ("Connecting to BTHub5-2X67")
          var _ap = {
            ssid: "",
            password: ""
          };
          /*
          // Connect to a network
          wifi.connect(_ap, function(err) {
              if (err) {
                  console.log(err);
              }
              console.log('Connected');
          });
          */

          response.end(JSON.stringify(networks))
      }
  });


}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
