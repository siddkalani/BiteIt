import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Layout/Header'


const Index = () => {
    return (
        <>
            <div className="bg-gray-100 min-h-screen flex flex-col">
                <Header />
                <Outlet />
            </div>
        </>
    )
}

export default Index