import React from 'react'
import Link from 'next/link'
import { FaBug } from "react-icons/fa";

const NavBar = () => {

    const links = [
        {
            label : 'Dashboard',
            href : '/'
        },
        {
            label : 'Issues',
            href : '/issues'
        }
    ]
  return (
    <>
    <nav className='flex space-x-8 border-b mb-5 px-6 h-16 items-center'>
        <Link href=''> <FaBug/> </Link>
        <ul className='flex space-x-6 '>
            {links.map((link)=>(<>
                <li key={link.href}> <Link href={link.href} className='text-zinc-500 hover:text-zinc-900 transition-colors'>{link.label}</Link> </li>
            
            </>))}
        </ul>
    </nav>
    </>
  )
}

export default NavBar