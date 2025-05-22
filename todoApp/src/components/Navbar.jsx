import React from 'react'

const Navbar = () => {
    return (
        <nav>
            <ul className='flex gap-5 p-5 bg-green-300 text-blue-900 text-xl font-semibold'>
                <li><a href="">Home</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Contact Us</a></li>
            </ul>
        </nav>
    )
}

export default Navbar