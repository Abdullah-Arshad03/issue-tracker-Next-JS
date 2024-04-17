'use client'

import React from 'react'
import Link from 'next/link'
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation'; // this only works with the client component so we have to use the ' use client' above at the top
import classNames from 'classnames';

const NavBar = () => {

    const currentPath = usePathname()
    console.log(currentPath)
    
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
                <li key={link.href}> <Link href={link.href} className={classNames({
                    'text-zinc-900' : link.href === currentPath,
                    'text-zinc-500' : link.href !== currentPath,
                    'hover:text-zinc-900 transition-colors' : true

                })}>{link.label}</Link> </li>
            </>))}
        </ul>
    </nav>
    </>
  )
}

export default NavBar