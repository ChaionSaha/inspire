import logoWhite from '@/assets/logo-white.png';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Footer = () => {
    const [date, setDate] = useState(new Date());
   

    return (
        <div className="bg-black py-20 relative text-white">
            <div className="absolute top-0 right-[50%] translate-x-[50%] w-full h-full container mx-auto border-s border-e border-base-300"></div>
            <div className="mx-auto border-t border-b border-base-300 ">
                <div className="container p-5 py-10 lg:p-16 lg:py-16 grid lg:grid-cols-2 mx-auto">
                    <div className="grid lg:grid-cols-3 grid-cols-2 gap-y-10">
                        <div>
                            <p className="text-lg font-bold">Discover</p>
                            <ul className="mt-3">
                                <li className="mt-2">Cara Cara Story</li>
                                <li className="mt-2">The diary of a Traveler</li>
                                <li className="mt-2">Stockists</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-lg font-bold">Help</p>
                            <ul className="mt-3">
                                <li className="mt-2">Contact</li>
                                <li className="mt-2">Orders</li>
                                <li className="mt-2">Shipping & Handling</li>
                                <li className="mt-2">Returns & Exchanges</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-lg font-bold">Social</p>
                            <ul className="mt-3">
                                <li className="mt-2">Facebook</li>
                                <li className="mt-2">Instagram</li>
                                <li className="mt-2">Twitter</li>
                            </ul>
                        </div>
                        <div className="lg:col-span-3 lg:mt-20 order-first lg:order-last">
                            <div>
                                <Link href='/' className='w-fit'>
                                    <Image src={logoWhite} alt='Inspire Logo' className='cursor-pointer'/>
                                </Link>
                            </div>
                            <div className="mt-5 flex flex-col lg:flex-row gap-y-3 gap-x-10">
                                <p>@inspire{date.getFullYear()}</p>
                                <p>Privacy Policy</p>
                                <p>Terms & Condition</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex lg:justify-end mt-10">
                        <div className="flex flex-col lg:w-[80%]">
                            <p className='text-4xl font-bold'>Newsletter</p>
                            <p className='mt-3'>Join us as we galavant around the planet sending back news, ideas and adventures. Subscribe to receive 10% off your first full-priced purchase.</p>
                            <div className="flex border-b z-[100] mt-10">
                                <input className='input rounded-none bg-transparent  focus:outline-none focus:border-transparent flex-grow ps-0' type='email' placeholder='Email' />
                                <button className='btn btn-ghost'><i className='bi bi-arrow-right'></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;