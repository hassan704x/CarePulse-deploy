import React from 'react'
import { Button } from './button'
import Image from 'next/image'

interface ButtonProps {
    isLoading: boolean,
    className?: string,
    children: React.ReactNode,
}



const SubmitButton = ({isLoading, className, children}: ButtonProps) => {
  return (
   <Button type="submit" disabled={isLoading} className={className ??'bg-green-500 text-white !important w-full cursor-pointer'} >
    {isLoading ? (
        <div className="flex items-center gap-4">
            <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}            
                height={24}
                className="animate-spin"
            />
            Loading ...
        </div>
    ): children} 
   </Button>
  )
}

export default SubmitButton