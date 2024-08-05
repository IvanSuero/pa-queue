import type { Ride } from '@/types/types'

export async function GetPARides() {
  const data = await fetch('https://queue-times.com/parks/19/queue_times.json', { cache: 'no-store' })
  const res = await data.json()
  const rides: Ride[] = res.rides
  rides.sort((a, b) => b.wait_time - a.wait_time)
  rides.forEach((ride) => ride.park = 'Port Aventura')

  return rides
}

export async function GetFLRides() {
  const data = await fetch('https://queue-times.com/parks/277/queue_times.json', { cache: 'no-store' })
  const res = await data.json()
  const rides: Ride[] = res.rides
  rides.sort((a, b) => b.wait_time - a.wait_time)
  rides.forEach((ride) => ride.park = 'Ferrari Land')

  return rides
}

export async function getFilteredRides({ search, filter_wait, filter_status, park_filter }: { search: string, filter_wait: string, filter_status: string, park_filter: string }) {
  const [pa_rides, fl_rides] = await Promise.all([GetPARides(), GetFLRides()])

  const filterRidesByCriteria = (rides: Ride[]) => {
    return rides.filter((ride) => {
      const waitTime = Number(ride.wait_time) || 0;
      const matchesSearchTerm = ride.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter_wait === 'all' ||
        (filter_wait === 'short' && waitTime <= 15) ||
        (filter_wait === 'medium' && waitTime > 15 && waitTime <= 30) ||
        (filter_wait === 'long' && waitTime > 30);
      const matchesStatus = filter_status === 'all' || (filter_status === 'open' && ride.is_open) || (filter_status === 'closed' && !ride.is_open);

      return matchesSearchTerm && matchesFilter && matchesStatus;
    });
  };

  const p_rides = park_filter === 'ferrariland' ? [] : filterRidesByCriteria(pa_rides)
  const f_rides = park_filter === 'portaventura' ? [] : filterRidesByCriteria(fl_rides)

  return {
    pa_rides: p_rides,
    fl_rides: f_rides,
    joint_rides: [...p_rides, ...f_rides]
  };
}