import SearchIcon from '@/assets/icons/SearchIcon';
import ShoppingbagIcon from '@/assets/icons/ShoppingbagIcon';
import UserIcon from '@/assets/icons/UserIcon';
import whiteLogo from '@/assets/logo-white.png';
import Image from "next/image";

export default function Layout({children}) {
    return (
        <div className="relative">
            <div className="absolute py-5 text-white top-0 left-0 w-full bg-[rgba(255,255,255,0.04)] z-[100] border-b border-[rgba(255,255,255,0.19)]">
                <div className="container mx-auto">
                    <div className="flex justify-between">
                        <div className="flex gap-x-5">
                            <p>New Arrival</p>
                            <p>Shop</p>
                            <p>Collection</p>
                        </div>
                        <div className="relative w-28 h-10">
                            <Image src={whiteLogo} fill alt="Inspire Logo"/>
                        </div>
                        <div className="flex gap-x-5">
                            <button>
                                <SearchIcon color='white' />
                            </button>
                            <button>
                                <UserIcon color='white' />
                            </button>
                            <button >
                                <ShoppingbagIcon color='white'/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}
