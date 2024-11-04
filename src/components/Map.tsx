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
    if (!mapContainer.current) return;

    if (map.current) return; // Inicializa el mapa solo una vez
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mariomoreno24874/cm2e3oshc002n01pbdfmv1qtj', // Nuevo Style URL
      center: [-69.3348, 10.0636], // Cambiado a Barquisimeto, Venezuela
      zoom: 12,
      pitch: 60, // Añade un ángulo de inclinación para ver objetos 3D
      bearing: 0, // Añade un ángulo de rotación
    });

    // Añade controles al mapa
    map.current.addControl(new mapboxgl.NavigationControl());

    // Añade un control para mostrar la ubicación actual del usuario
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }));

    // Escucha las actualizaciones de ubicación de los conductores
    const unsubscribe = onSnapshot(collection(db, 'driver_locations'), (snapshot) => {
      const updatedDrivers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Driver[];
      setDrivers(updatedDrivers);
    });

    // Obtén la ubicación actual del usuario
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (map.current) {
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 15,
              essential: true
            });
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }

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
      el.style.backgroundImage = 'url(https://placekitten.com/g/40/40)'; // Imagen de fondo del marcador
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.backgroundSize = 'cover'; // Asegura que la imagen cubra el marcador
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';

      new mapboxgl.Marker(el)
        .setLngLat([driver.longitude, driver.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>Driver ID: ${driver.id}</h3>`))
        .addTo(map.current!);
    });
  }, [drivers]);

  return (
    <div className="relative">
      <div ref={mapContainer} className="w-full h-[400px]" />
      <div className="mt-4 p-4 bg-slate-900 bg-opacity-50 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-gray-300 mb-2">Available Drivers:</h3>
        <ul className="space-y-2">
          {drivers.map(driver => (
            <li key={driver.id} className="text-gray-300">
              Driver ID: {driver.id} - Location: {driver.latitude.toFixed(4)}, {driver.longitude.toFixed(4)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Map;