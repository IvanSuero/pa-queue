import Image from "next/image";
import RideItem from "./RideItem";
import type { Ride, Park } from "@/types/types";
import { getTranslator } from "@/lib/Translator";

export default async function RidesList ({rides, park}: {rides: Ride[], park?: Park}) {
  return (
    <section className="mb-8 w-full items-center justify-start flex flex-col gap-16 pt-8">
      <h2 className={`text-3xl h-1 font-bold text-center hidden sm:flex flex-row gap-4 justify-center items-center ${park?.id==='19' ? 'text-blue-700' : 'text-red-600'}`}>
        <Image src={park?.logo || '/'} alt={park?.name || 'Park name'} width={50} height={50} />
        {park?.name}
      </h2>
      
      <div className="space-y-4 w-full flex flex-col items-center justify-center">
        {rides.map((ride, index) => (
          <RideItem ride={ride} key={index}/>
        ))}
      </div>
    </section>
  )
}