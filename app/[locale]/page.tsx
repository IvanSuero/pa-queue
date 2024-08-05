import RidesList from '@/components/RidesList';
import SearchForm from '@/components/SearchForm';
import { getFilteredRides } from '@/lib/GetRides';
import { getTranslator } from '@/lib/Translator';

export default async function Home({ searchParams }: { searchParams?: {search?: string, wait_time?: string, ride_status?: string, park?: string} }) {

  const searchTerm = searchParams?.search || ''
  const filter_wait = searchParams?.wait_time || 'all'
  const filter_status = searchParams?.ride_status || 'all'
  const park_filter = searchParams?.park || 'all'

  const { pa_rides, fl_rides, joint_rides } = await getFilteredRides({search: searchTerm, filter_wait, filter_status, park_filter})
  const { t } = await getTranslator('home')

  const parks = [
    {name: "Port Aventura", id: "19", logo: "/pa_logo.jpg"},
    {name: "Ferrari Land", id: "277", logo: "/fl_logo.jpg"}
  ]

  const timeOptions = [
    {name: t('waitTime'), value: "default"},
    {name: t('all'), value: "all"},
    {name: t('short'), value: "short"},
    {name: t('medium'), value: "medium"},
    {name: t('long'), value: "long"}
  ]

  const rideOptions = [
    {name: t('rideStatus'), value: 'default'},
    {name: t('all'), value: 'all'},
    {name: t('open'), value: 'open'},
    {name: t('closed'), value: 'closed'}
  ]

  const parkOptions = [
    {name: t('park'), value: 'default'},
    {name: t('all'), value: 'all'},
    {name: 'Port Aventura', value: 'portaventura'},
    {name: 'Ferrari Land', value: 'ferrariland'},
  ]

  return (
    <main className="p-4 py-6 sm:p-8 flex flex-col items-center justify-between sm:gap-4 sm:px-12 sm:w-4/5 w-11/12">
      <SearchForm parkOptions={parkOptions} rideOptions={rideOptions} timeOptions={timeOptions} searchPlaceHolder={t('searchRide')}/>
      <div className='hidden sm:flex sm:flex-row flex-col gap-24 w-full'>
        {
          parks.map((park, index) => (
            <RidesList rides={park.id === '19' ? pa_rides : fl_rides} park={park} key={index}/>
          ))
        }
      </div>
      <div className='sm:hidden flex flex-col gap-24 w-full'>
        <RidesList rides={joint_rides}/>
      </div>
    </main>
  );
}
