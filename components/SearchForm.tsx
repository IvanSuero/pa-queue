'use client'

import { useDebouncedCallback } from "use-debounce"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function SearchForm({timeOptions, rideOptions, parkOptions, searchPlaceHolder}: {timeOptions: {name: string, value: string}[], rideOptions: {name: string, value: string}[], parkOptions: {name: string, value: string}[], searchPlaceHolder: string}) {

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)

    if(term) params.set('search', term)
    else params.delete('search')

    replace(`${pathname}?${params.toString()}`)
  }, 300)

  const handleSelect = (value: string, select: string) => {
    const params = new URLSearchParams(searchParams)

    if(value === 'all') params.delete(select)
    else params.set(select, value)

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='w-full flex'>
        <form action="/" method='get' className='w-full flex gap-4'>
          <input type='text' placeholder={searchPlaceHolder} defaultValue={searchParams.get('search')?.toString()} className='w-full p-2 rounded-lg border border-gray-300' onChange={(e) => {
            handleSearch(e.target.value)
          }}/>
          <select className="hidden sm:flex space-x-2 w-2/3" defaultValue={searchParams.get('wait_time')?.toString() || 'default'} onChange={(e) => {
            handleSelect(e.target.value, 'wait_time')
          }}>
            {
              timeOptions.map((option, index) => (
                <option key={index} value={option.value} disabled={option.value==='default'}>{option.name}</option>
              ))
            }
          </select>
          <select className="hidden sm:flex space-x-2 w-2/3" defaultValue={searchParams.get('ride_status')?.toString() || 'default'} onChange={(e) => {
            handleSelect(e.target.value, 'ride_status')
          }}>
            {
              rideOptions.map((option, index) => (
                <option key={index} value={option.value} disabled={option.value==='default'}>{option.name}</option>
              ))
            }
          </select>
          <select className="flex space-x-2 w-2/3" defaultValue={searchParams.get('park')?.toString() || 'default'} onChange={(e) => {
            handleSelect(e.target.value, 'park')
          }}>
            {
              parkOptions.map((option, index) => (
                <option key={index} value={option.value} disabled={option.value==='default'}>{option.name}</option>
              ))
            }
          </select>
        </form>
    </div>
    
  )
}