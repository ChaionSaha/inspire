import { SearchIcon, ShoppingbagIcon, UserIcon } from '@/assets/icons/CustomIcon';
import blackLogo from '@/assets/logo-black.png';
import whiteLogo from '@/assets/logo-white.png';
import axios from 'axios';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';

function Navbar() {
    const [categories, setCategories] = useState([]);
    const router = useRouter();
    const [inView, setInview] = useState(true);
    const [cartOpen, setCartOpen] = useState(false);
    const {cart} = useSelector(state => state.cart);
    
    useEffect(() => {
        axios('/api/get-all-categories')
            .then(({ data }) => setCategories(data.categories))
            .catch(err => console.log(err))
    }, [])
    
    useEffect(() => {
        console.log(cart)
    },[cart])
    
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
                            <button className='btn btn-sm btn-ghost'>
                                <UserIcon color={router.asPath === '/' ?'white':'black'}  className='w-6 h-6'/>
                            </button>
                            <button className='btn btn-sm btn-ghost' onClick={()=>setCartOpen(state=>!state)}>
                                <ShoppingbagIcon color={router.asPath === '/' ?'white':'black'} className='w-6 h-6'/>
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
                            <button className='btn btn-sm btn-ghost'>
                                <UserIcon color={'black'}  className='w-6 h-6'/>
                            </button>
                            <button className='btn btn-sm btn-ghost' onClick={()=>setCartOpen(state=>!state)}>
                                <ShoppingbagIcon color={'black'} className='w-6 h-6'/>
                            </button>
                        </div>
                    </div>
                </div>   
            </div>
            
            <div className={`fixed bg-primary h-[100vh] flex flex-col overflow-y-auto w-[25%] z-[1000] top-0 right-0 duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-[100%]'}`}>
                <div className="p-5 py-7 flex justify-between items-center">
                    <p className='text-3xl font-medium text-white px-5'>Shopping Bag</p>
                    <button onClick={()=>setCartOpen(false)} className='text-white text-4xl'><i className='bi bi-x'></i></button>
                </div>
                <div className="p-5 flex-grow">
                    {
                        cart.length > 0 ?
                            cart.map((c, i) =>
                                <div key={i} className='flex gap-x-5 text-white'>
                                    <div className='relative w-20 h-20'>
                                        <Image src={c.images[0].img} fill alt={c.name} />
                                    </div>
                                    <div>
                                        <p className='text-lg font-medium'>{c.name}</p>
                                        <p className='text-lg font-bold'>${c.price}</p>
                                    </div>
                                </div>
                            ) :
                            <p className='text-lg text-center'>No items in your cart</p>
                    }
                </div>
            </div>
        </>
    );
}

export default Navbar;