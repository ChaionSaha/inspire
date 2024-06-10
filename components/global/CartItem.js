import { decrementItem, incrementItem, removeFromCart } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <div className='flex gap-x-5 text-white'>
            <div className='relative w-[20%]'>
                <Image src={item.images[0].img} fill alt={item.name} className="object-contain"/>
            </div>
            <div className="flex-grow">
                <Link href={`/product/${item.id}`} className='text-xl font-medium hover:underline duration-150'>{item.name}</Link>
                <p className='font-bold'>${item.price}</p>
                <p className='text-base-200'>Size: {item.selectedSize.name}</p>
                <div className="flex mt-5 justify-between items-center w-full">
                    <div className="flex items-center ">
                        <p className="text-base-300">Quantity: </p>
                        <div className="flex gap-x-2 items-center">
                            <button className="bt bt-ghost btn-xs" onClick={()=> dispatch(decrementItem(item))}><i className="bi bi-dash text-lg"></i></button>
                            <p className="text-white px-2" >{item.quantity}</p>
                            <button className="bt bt-ghost btn-xs" onClick={()=>dispatch(incrementItem(item))}><i className="bi bi-plus text-lg"></i></button>
                        </div>
                    </div>
                    <button className="underline" onClick={()=> { dispatch(removeFromCart(item)) }}>Remove</button>
                </div>
            </div>

            
        </div>
    );
}

export default CartItem;