import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const Cart = ({cartOpen, setCartOpen}) => {
    const { cart } = useSelector(state => state.cart);
    const [total, setTotal] = useState(0);
    const router = useRouter();

    useEffect(() => {
        setCartOpen(false);
    },[router.asPath])

    useEffect(() => {
        let temp = 0;
        cart.forEach(item => {
            temp += item.price * item.quantity;
        });
        setTotal(temp);
    },[cart])

    return (
        <div className={`fixed bg-primary h-[100vh] flex flex-col  w-[25%] z-[1000] top-0 right-0 duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-[100%]'}`}>
            <div className="px-5 py-7 flex justify-between items-center">
                <p className='text-3xl font-medium text-white px-5'>Shopping Bag</p>
                <button onClick={()=>setCartOpen(false)} className='text-white text-4xl'><i className='bi bi-x'></i></button>
            </div>
            

            <div className="p-5 me-3 flex-grow flex flex-col gap-10 overflow-y-auto">
                {
                    cart.length > 0 ?
                        cart.map((c, i) =>
                            <CartItem key={i} item={c}/>
                        ) :
                        <p className='text-lg text-center text-white'>No items in your cart</p>
                }
            </div>

            {
                cart.length > 0 &&
                <div className="border-t py-5">
                    <div className="flex items-center justify-between text-white px-5">
                        <div className="flex gap-x-5">
                            <p>Subtotal</p>
                            <p className="text-base-300">({cart.length} item)</p>
                        </div>
                        <p>${total}</p>
                    </div>
                    <div className="px-5 w-full mt-5">
                        <button
                            onClick={()=>router.push('/checkout/billing-info')}
                            className="btn w-full bg-white text-black hover:text-white">
                                Review + Checkout
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Cart;