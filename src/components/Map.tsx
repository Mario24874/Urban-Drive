import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface Driver {
  id: string;
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.006, 40.7128], // Default to New York City
      zoom: 12
    });

    // Listen for driver location updates
    const unsubscribe = onSnapshot(collection(db, 'driver_locations'), (snapshot) => {
      const updatedDrivers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Driver[];
      setDrivers(updatedDrivers);
    });

    return () => {
      if (map.current) map.current.remove();
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    const markers = document.getElementsByClassName('mapboxgl-marker');
    while(markers[0]) {
      markers[0].parentNode?.removeChild(markers[0]);
    }

    // Add markers for each driver
    drivers.forEach(driver => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url(https://placekitten.com/g/40/40)';
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';

      new mapboxgl.Marker(el)
        .setLngLat([driver.longitude, driver.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>Driver ID: ${driver.id}</h3>`))
        .addTo(map.current!);
    });
  }, [drivers]);

  return (
    <div>
      <div ref={mapContainer} className="w-full h-[400px]" />
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Available Drivers:</h3>
        <ul>
          {drivers.map(driver => (
            <li key={driver.id} className="mb-2">
              Driver ID: {driver.id} - Location: {driver.latitude.toFixed(4)}, {driver.longitude.toFixed(4)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Map;