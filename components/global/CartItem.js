import { decrementItem, incrementItem, removeFromCart } from "@/lib/store";
import Image from "next/image";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <div className='flex gap-x-5 text-white'>
            <div className='relative w-[20%]'>
                <Image src={item.images[0].img} fill alt={item.name} className="object-contain"/>
            </div>
            <div className="flex-grow">
                <p className='text-xl font-medium'>{item.name}</p>
                <p className=' font-bold'>${item.price * item.quantity}</p>
                <div className="flex mt-5 justify-between items-center w-full">
                    <div className="flex items-center ">
                        <p className="text-base-300">Quantity: </p>
                        <div className="flex gap-x-2 items-center">
                            <button className="bt bt-ghost btn-xs" onClick={()=> dispatch(decrementItem(item.id))}><i className="bi bi-dash text-lg"></i></button>
                            <p className="text-white px-2" >{item.quantity}</p>
                            <button className="bt bt-ghost btn-xs" onClick={()=>dispatch(incrementItem(item.id))}><i className="bi bi-plus text-lg"></i></button>
                        </div>
                    </div>
                    <button className="underline" onClick={()=> { dispatch(removeFromCart(item.id)) }}>Remove</button>
                </div>
            </div>

            
        </div>
    );
}

export default CartItem;