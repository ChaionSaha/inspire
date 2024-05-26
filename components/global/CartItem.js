import Image from "next/image";

const CartItem = ({item}) => {
    return (
        <div className='flex gap-x-5 text-white'>
            <div className='relative w-20 h-20'>
                <Image src={item.images[0].img} fill alt={item.name} className="object-contain"/>
            </div>
            <div>
                <p className='text-lg font-medium'>{item.name}</p>
                <p className='text-lg font-bold'>${item.price}</p>
            </div>
        </div>
    );
}

export default CartItem;