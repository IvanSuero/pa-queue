'use server'
import { getDateDifference } from "@/lib/GetDate";
import type { Ride } from "@/types/types";
import { getTranslator } from "@/lib/Translator";

export default async function Ride({ ride }: { ride: Ride }) {

  const { t } = await getTranslator('home')

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="bg-white px-4 pt-4 rounded shadow flex flex-col justify-center items-center w-full gap-3">
        <div className="flex flex-row w-full items-center justify-between">
          <div className="flex justify-start items-center gap-4">
            <span className={`${ride.is_open ? 'bg-green-500' : 'bg-red-500'} w-4 h-4 rounded-full`} />
            <p className="font-bold text-wrap">{ride.name}</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-6">
          {
            ride.is_open && <p className={`flex justify-end font-semibold ${ride.wait_time < 15 ? 'text-green-600' : ride.wait_time < 40 ? 'text-yellow-500' : 'text-red-500'}`}>{ride.wait_time} min</p>
  }
          </div>
        </div>
        <div className="flex flex-row items-end w-full sm:justify-end justify-between pb-2">
          <p className={`sm:hidden block ${ride.park === 'Ferrari Land' ? 'text-red-500' : 'text-blue-500'} font-semibold text-sm`}>{ride.park}</p>
          <p className="text-gray-400 text-sm">{t('updated')} {getDateDifference({last_updated: ride.last_updated})} {t('ago')}</p>
        </div>
      </div>
      {
        !ride.is_open && (
          <Banner message={t('rideIsClosed')} color="bg-red-500"/>
        )
      }
      {
        ride.wait_time >= 40 && (
          <Banner message={t('longWaitTime')} color="bg-yellow-500"/>
        )
      }
    </div>
  )
}

function Banner({message, color}: {message: string, color: string}) {
  return (
    <div className={`${color} text-white w-full text-center`}>
      <p className="font-semibold">{message}</p>
    </div>
  )

}