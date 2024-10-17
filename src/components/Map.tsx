import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

// Configura el token de acceso de Mapbox desde las variables de entorno
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// Interfaz para el conductor
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
    if (map.current) return; // Inicializa el mapa solo una vez
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.006, 40.7128], // Predeterminado a Nueva York
      zoom: 12
    });

    // Escucha las actualizaciones de ubicación de los conductores
    const unsubscribe = onSnapshot(collection(db, 'driver_locations'), (snapshot) => {
      const updatedDrivers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Driver[];
      setDrivers(updatedDrivers);
    });

    return () => {
      if (map.current) map.current.remove(); // Limpia el mapa al desmontar el componente
      unsubscribe(); // Detiene la escucha de actualizaciones de Firestore
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Limpia los marcadores existentes
    const markers = document.getElementsByClassName('mapboxgl-marker');
    while (markers[0]) {
      markers[0].parentNode?.removeChild(markers[0]);
    }

    // Añade marcadores para cada conductor
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