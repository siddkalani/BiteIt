import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Layout/Header'


const Index = () => {
    return (
        <>
            <div className="bg-gray-100 h-screen w-full flex flex-col">
                <div className='h-full w-full'>
                <Header />
                <Outlet />
                </div>
            </div>
        </>
    )
}

export default Index