import { SearchIcon, ShoppingbagIcon, UserIcon } from '@/assets/icons/CustomIcon';
import blackLogo from '@/assets/logo-black.png';
import whiteLogo from '@/assets/logo-white.png';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import Cart from './Cart';

function Navbar() {
    const [categories, setCategories] = useState([]);
    const router = useRouter();
    const [inView, setInview] = useState(true);
    const [cartOpen, setCartOpen] = useState(false);
    const cart = useSelector(state => state.cart.cart);
    const [session, setSession] = useState(null);

    useEffect(() => {
        getSession().then(session => {
            if (session) {
                setSession(session);
            }
        });
    },[])

    useEffect(() => {
        axios('/api/get-all-categories')
            .then(({ data }) => setCategories(data.categories))
            .catch(err => console.log(err))
    }, [])
    
    return (
        <>
            <InView as='div' rootMargin='20px' onChange={(inView) => setInview(inView)}
                className={`pt-8 pb-5 ${router.asPath === '/' ? 'text-white absolute' : 'text-black'} top-0 left-0 w-full ${router.asPath === '/' ? 'bg-[rgba(255,255,255,0.04)]' : 'bg-white'} z-[100] border-b ${router.asPath === '/' ? 'border-[rgba(255,255,255,0.19)]' : 'border-gray-200'}`}>
                <div className="container mx-auto">
                    <div className="flex items-end justify-between">
                        <Link href={'/'} className="relative w-28 h-10">
                            {
                                router.asPath === '/' ?
                                    <Image src={whiteLogo} fill alt="Inspire Logo" /> :
                                    <Image src={blackLogo} fill alt="Inspire Logo" />
                                    
                            }
                        </Link>
                        <ul className="flex justify-center gap-x-7 text-xl">
                            {
                                categories.map((c, i) =>
                                    <li key={i}>
                                        <Link href={`/category/${c.value}`}
                                            className={`px-5 border-b-3 border-transparent relative after:absolute after:w-0 after:bottom-[-20%] after:left-0 after:h-[2px]  ${(router.asPath.split('/'))[2] === c.value ? 'after:w-full' : 'hover:after:w-full'}  ${router.asPath === '/' ? 'after:bg-white' : 'after:bg-black'} after:duration-300 after:origin-center`}>
                                            {c.name}
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                        
                        <div className="flex gap-x-5">
                            <button className='btn btn-sm btn-ghost'>
                                <SearchIcon color={router.asPath === '/' ?'white':'black'}  className='w-6 h-6'/>
                            </button>
                            <Dropdown>
                                <DropdownTrigger className=' focus:outline-none'>
                                    <button>
                                        <UserIcon color={router.asPath === '/' ? 'white' : 'black'} className='w-6 h-6' />
                                    </button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    {
                                        session && 
                                                <DropdownItem key="profile" onPress={()=>router.push('/profile')} textValue='profile'>
                                                    Profile
                                                </DropdownItem>
                                    }
                                            
                                    
                                    {
                                        session ? 
                                            <DropdownItem key="logout" onPress={()=>signOut()} textValue='login or log out'>
                                                Log Out
                                            </DropdownItem> :
                                            <DropdownItem
                                                key="logout" onPress={() => router.push('/auth/login')} textValue='login or log out'>
                                                Login
                                            </DropdownItem>
                                    }
                                    
                                            
                                </DropdownMenu>
                            </Dropdown>
                            <button className='btn btn-sm btn-ghost' onClick={() => setCartOpen(state => !state)}>
                                <Badge content={cart.length}>
                                    <ShoppingbagIcon color={router.asPath === '/' ?'white':'black'} className='w-6 h-6'/>
                                </Badge>
                            </button>
                        </div>
                    </div>
                </div>
            </InView>
            
            <div className={`sticky ${inView ? 'hidden' : ''} pt-8 pb-5  text-black top-0 left-0 w-full ${inView ? 'bg-[rgba(255,255,255,0.04)]' : 'bg-white'} z-[100] border-b border-gray-200`}>
                <div className="container mx-auto">
                    <div className="flex items-end justify-between">
                        <Link href={'/'} className="relative w-28 h-10 ">        
                            <Image src={blackLogo} fill alt="Inspire Logo" />
                        </Link>
                        <ul className="flex justify-center gap-x-7 text-xl">
                            {
                                categories.map((c, i) =>
                                    <li key={i}>
                                        <Link href={`/category/${c.value}`}
                                            className={`px-5 border-b-3 border-transparent relative after:absolute after:w-0 after:bottom-[-20%] after:left-0 after:h-[2px]  ${(router.asPath.split('/'))[2] === c.value ? 'after:w-full' : 'hover:after:w-full'} after:bg-black after:duration-300 after:origin-center`}>
                                            {c.name}
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                        <div className="flex gap-x-5">
                            <button className='btn btn-sm btn-ghost'>
                                <SearchIcon color={'black'}  className='w-6 h-6'/>
                            </button>
                            <Dropdown>
                                <DropdownTrigger className=' focus:outline-none'>
                                    <button>
                                        <UserIcon color={'black'} className='w-6 h-6' />
                                    </button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    {
                                        session && 
                                                <DropdownItem key="profile" onPress={()=>router.push('/profile')} textValue='profile'>
                                                    Profile
                                                </DropdownItem>
                                    }
                                    {
                                        session ? 
                                            <DropdownItem key="logout" onPress={()=>signOut()} textValue='login or log out'>
                                                Log Out
                                            </DropdownItem> :
                                            <DropdownItem
                                                key="logout" onPress={() => router.push('/auth/login')} textValue='login or log out'>
                                                Login
                                            </DropdownItem>
                                    }    
                                </DropdownMenu>
                            </Dropdown>
                            <button className='btn btn-sm btn-ghost' onClick={() => setCartOpen(state => !state)}>
                                <Badge content={cart.length}>
                                    <ShoppingbagIcon color={'black'} className='w-6 h-6'/>
                                </Badge>
                            </button>
                        </div>
                    </div>
                </div>   
            </div>
            
            <Cart cartOpen={cartOpen} setCartOpen={setCartOpen}/>
        </>
    );
}

export default Navbar;