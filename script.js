function calculateDistance() {
    // Kullanıcıdan birinci noktanın enlemini alıp float'a çevirip lat1 değişkenine atıyor
    const lat1 = parseFloat(document.getElementById("lat1").value);
    // Kullanıcıdan birinci noktanın boylamını alıp float'a çevirip lon1 değişkenine atıyor
    const lon1 = parseFloat(document.getElementById("lon1").value);
    // Kullanıcıdan ikinci noktanın enlemini alıp float'a çevirip lat2 değişkenine atıyor
    const lat2 = parseFloat(document.getElementById("lat2").value);
    // Kullanıcıdan ikinci noktanın boylamını  alıp float'a çevirip lon2 değişkenine atıyor
    const lon2 = parseFloat(document.getElementById("lon2").value);

    // lat1, lon1, lat2, lon2 değerlerinden herhangi biri sayı değil ise mesaj verip boş haritaya döndürüyor
    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
        alert("Lütfen geçerli sayısal değerler girin.");
        return;
    }

    //lat1 ve lon1 değerlerini coord1 değişkenine atıyor
    const coord1 = { lat: lat1, lon: lon1 };
    //lat2 ve lon2 değerlerini coord2 değişkenine atıyor
    const coord2 = { lat: lat2, lon: lon2 };
    
    //Bulduğu sonucu result değişkenine atıyor
    const result = haversineDistance(coord1, coord2);
    
    const mesafe = document.getElementById("empty-span");
    console.log(mesafe.innerHTML);
    mesafe.innerText = `${result.toFixed(2)} km`

    // Bulduğu uzaklık sonucunu km cinsinden konsola yazıyor
    console.log(`İki nokta arasındaki doğrudan uzaklık: ${result.toFixed(2)} km`);

    const map = L.map('map').setView([lat1, lon1], 13);

    // OpenStreetMap katmanını ekleyin
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat1, lon1]).addTo(map)
        .bindPopup('Birinci nokta');

    L.marker([lat2, lon2]).addTo(map)
        .bindPopup('İkinci nokta');

    const line = L.polyline([[lat1, lon1], [lat2, lon2]], {color: 'red'}).addTo(map);
    map.fitBounds(line.getBounds());
}

function haversineDistance(coord1, coord2) {
    const R = 6371; // Yeryüzünün ortalama yarıçapı (km)
    const dLat = deg2rad(coord2.lat - coord1.lat);
    const dLon = deg2rad(coord2.lon - coord1.lon);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(coord1.lat)) * Math.cos(deg2rad(coord2.lat)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}



