DONE Filtro por tiempo espera, abierta/cerrada
DONE Barra de busqueda

- Notificaciones en tiempo real (marcar favorito en localstorage y recibir news de estas atracciones)
DONE Estado del tiempo
DONE Traducciones
DONE Responsive

const requestNotificationPermission = async () => {
    if ('Notification' in window && navigator.serviceWorker) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    }
  };

  const checkRideStatus = async (favoriteRides: []) => {
    const getRideStatus = async (rideId: number) => {
      return {
        id: rideId,
        waitingTime: ride.wait_time,
        isOpen: ride.is_open,
      };
    };

    for (const rideId of favoriteRides) {
      const rideStatus = await getRideStatus(rideId);
      const previousStatus = getPreviousRideStatus(rideId);
      if (rideStatus.waitingTime !== previousStatus.waitingTime || rideStatus.isOpen !== previousStatus.isOpen) {
        sendNotification(`Ride Update: ${rideStatus.id}`,
          `Waiting time: ${rideStatus.waitingTime} minutes, Status: ${rideStatus.isOpen ? 'Open' : 'Closed'}`);
        updatePreviousRideStatus(rideId, rideStatus);
      }
    }
  };

  const sendNotification = (title: string, body: string) => {
    if (Notification.permission === 'granted' && navigator.serviceWorker) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, {
          body: body,
          icon: '/path/to/icon.png',
        });
      });
    }
  };

  const getPreviousRideStatus = (rideId: number) => {
    const rideStatus = localStorage.getItem(`rideStatus_${rideId}`);
    return rideStatus ? JSON.parse(rideStatus) : {};
  };
  
  const updatePreviousRideStatus = (rideId: number, status: {id: number, waitingTime: number, isOpen: boolean}) => {
    localStorage.setItem(`rideStatus_${rideId}`, JSON.stringify(status));
  };

  useEffect(() => {
    requestNotificationPermission();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(err => {
        console.log('Service Worker registration failed:', err);
      });
    }

    const favoriteRides = JSON.parse(localStorage.getItem('favRides') || '[]');
    const intervalId = setInterval(() => checkRideStatus(favoriteRides), 60000);
    return () => clearInterval(intervalId);
  }, []);