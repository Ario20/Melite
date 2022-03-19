// An ecompassing function "loadMap" was created to contain all 
// javascript actions that shall feature in the webmap

function loadMap() {

// Three basemap layers were inserted to enable users the selection of 
// their preferred map for visualisation the data. The maps were sourced
// from the leaflet github: https://leaflet-extras.github.io/leaflet-providers/preview/ 

	var Thunderforest = L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: 'aea7bd144d6c4590aaac26987d052578',
	maxZoom: 22
	});
		
	var Carto = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png', {
		minZoom: 5,
		maxZoom: 30,
		attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/about-carto/">CARTO</a>',
	});
	
	var Esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	});

// A variable for the map center was defined

	var center = new L.LatLng(55.938952, -3.240917);
	
// A map container is created and approporiate attribution for the tree register data is included

	var map = new L.Map('map', {center: center, zoom: 12, layers: [Carto]});
	map.attributionControl.setPrefix('Data Source: The City of Edinburgh Council, https://data.edinburghcouncilmaps.info/datasets/');

// A variable encompassing all basemaps was created to pass it in the layer control so users 
// can select or deselect the basemaps as necessary

	var baseLayers = {
			"Thunderforest Map": Thunderforest,
			"CartoDB": Carto,
			"Esri World": Esri
		};

// A variable to contain the markers (i.e. style of the point dataset) was created and defined as a Marker Cluster Group
// The Marker Cluster Group enables the interactive rendering of the point data.
// This is especially useful for datasets containing 1000s of points such as in the case of the tree register data (>50,000 points) 

	var markers = new L.MarkerClusterGroup();
	
// pictorial symbology for the main tree types

	var greenIcon = L.icon({
		iconUrl: 'css/images/leaf-green.png',
		shadowUrl: 'css/images/leaf-shadow.png',
		iconSize:     [38, 95],
		shadowSize:   [50, 64],
		iconAnchor:   [22, 94],
		shadowAnchor: [4, 62],
		popupAnchor:  [-3, -76]
	});
	var PearIcon = L.icon({
		iconUrl: 'css/images/leaf-Pear.png',
		shadowUrl: 'css/images/leaf-shadow.png',
		iconSize:     [38, 95],
		shadowSize:   [50, 64],
		iconAnchor:   [22, 94],
		shadowAnchor: [4, 62],
		popupAnchor:  [-3, -76]
	});
	var ChestnutIcon = L.icon({
		iconUrl: 'css/images/leaf-Chestnut.png',
		shadowUrl: 'css/images/leaf-shadow.png',
		iconSize:     [38, 95],
		shadowSize:   [50, 64],
		iconAnchor:   [22, 94],
		shadowAnchor: [4, 62],
		popupAnchor:  [-3, -76]
	});
	var CherryIcon = L.icon({
		iconUrl: 'css/images/leaf-Cherry.png',
		shadowUrl: 'css/images/leaf-shadow.png',
		iconSize:     [38, 95],
		shadowSize:   [50, 64],
		iconAnchor:   [22, 94],
		shadowAnchor: [4, 62],
		popupAnchor:  [-3, -76]
	});
	var AppleIcon = L.icon({
		iconUrl: 'css/images/leaf-Apple.png',
		shadowUrl: 'css/images/leaf-shadow.png',
		iconSize:     [38, 95],
		shadowSize:   [50, 64],
		iconAnchor:   [22, 94],
		shadowAnchor: [4, 62],
		popupAnchor:  [-3, -76]
	});
	var PlumIcon = L.icon({
		iconUrl: 'css/images/leaf-Plum.png',
		shadowUrl: 'css/images/leaf-shadow.png',
		iconSize:     [38, 95],
		shadowSize:   [50, 64],
		iconAnchor:   [22, 94],
		shadowAnchor: [4, 62],
		popupAnchor:  [-3, -76]
	});

// a loop goes through all the data of the .js file and assigns the pictorial symbology according to the tree species

	for (var i = 0; i < TreePoints.length; i++) {
		var a = TreePoints[i];
		if (a[4]=='Pyrus spp.') var TreeIcon = PearIcon;
		else if (a[5]=='Horse Chestnut') var TreeIcon = ChestnutIcon;
		else if (a[5]=='Cherry spp') var TreeIcon = CherryIcon;
		else if (a[4]=='Malus spp.') var TreeIcon = AppleIcon;
		else if (a[5]=='Purple-leaved Plum') var TreeIcon = PlumIcon;
		else var TreeIcon = greenIcon;
		var marker = new L.Marker(new L.LatLng(a[0], a[1]), { icon: TreeIcon });
		
// a popup is created on clicking the marker icon. The popup provides the main info. for the selected tree

		marker.bindPopup("<b> Tree No:</b>"+a[2]+"<br><b> Common name: </b> "+a[5]+"<br><b>Latin Name: </b>"+a[4]+"<br><br><b>Site: </b>"+a[3]+"<br><b>Height: </b>"+a[7]+"<br><b>Spread: </b>"+a[8]+"<br><b>Easting: </b>"+a[9]+"<br><b>Northing: </b>"+a[10]).openPopup();
		markers.addLayer(marker);
	}
	map.addLayer(markers);

// a Leaflet geocoder is assigned to enable users searching for a particular location of interest

	L.Control.geocoder({
		position: 'topleft'
	}).addTo(map);
	
	L.control.locate().addTo(map);
	
// A metric scale is assigned 
	
	L.control.scale({
		maxWidth: 100,
		metric: true,
		imperial: false, 
		position: 'bottomleft'
	}).addTo(map);

// Another popup is created to enable users to click anywhere on the map and get the lat, long coordinates in Web Mercator

	var popup = L.popup();
	function onMapClick(e) {
		popup
		    .setLatLng(e.latlng)
		    .setContent("You clicked the map at " + e.latlng.toString())
		    .openOn(map);
	}
	map.on('click', onMapClick);
	
// A variable for the layer "Trees" is assigned to combine it to L.control along with the basemaps layers
// This enables users to select or deselect the layers according to their needs
	
	var overlayLayer = {
            "Trees": markers
        };
	
	L.control.layers(baseLayers, overlayLayer).addTo(map);
}

