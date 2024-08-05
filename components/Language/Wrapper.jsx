"use client"
import { useRef } from 'react'
import { useEffect, useState } from 'react'

function LangWrapper({ children, localeList }) {
    const [isOpen, setOpen] = useState(false)
    const butRef = useRef(null)
    const openCss = !isOpen ? 'opacity-0 translate-y-2 transition ease duration-300 transform pointer-events-none' : 'opacity-100 translate-y-0 transition ease duration-300 transform pointer-events-auto'

    useEffect(() => {
        const handleClick = (e) => {
            if (!butRef.current)
                return
            if (!butRef?.current?.contains(e.target)) {
                setOpen(false)
                return
            }
            setOpen(!isOpen)
        }
        document.addEventListener('click', handleClick, true)
        return () => document.removeEventListener('click', handleClick)
    }, [isOpen])
    
    return (
        <button ref={butRef} className="flex text-gray-400 rounded shadow-lg py-1 pr-3 pl-5 focus:outline-none justify-center items-center relative">

            {children}
            < div className={`bg-gray-900 bgh-gray-700 shadow-md rounded text-sm absolute mt-12 top-0 right-0 min-w-full w-48 z-30 $ ${openCss}`} >
                <span className="absolute top-0 right-0 w-3 h-3 bg-gray-900 transform rotate-45 -mt-1 mr-3"></span>
                <div className="bg-gray-900 overflow-auto rounded w-full relative z-10">
                    <ul className="list-reset">
                        {localeList}
                    </ul>
                </div>
            </div>
        </button>
    )
}

export default LangWrapper