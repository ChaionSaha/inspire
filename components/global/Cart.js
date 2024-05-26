import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const Cart = ({cartOpen, setCartOpen}) => {
    const {cart} = useSelector(state => state.cart);

    return (
        <div className={`fixed bg-primary h-[100vh] flex flex-col overflow-y-auto w-[25%] z-[1000] top-0 right-0 duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-[100%]'}`}>
            <div className="p-5 py-7 flex justify-between items-center">
                <p className='text-3xl font-medium text-white px-5'>Shopping Bag</p>
                <button onClick={()=>setCartOpen(false)} className='text-white text-4xl'><i className='bi bi-x'></i></button>
            </div>
            <div className="p-5 flex-grow flex flex-col gap-10">
                {
                    cart.length > 0 ?
                        cart.map((c, i) =>
                            <CartItem key={i} item={c}/>
                        ) :
                        <p className='text-lg text-center text-white'>No items in your cart</p>
                }
            </div>
        </div>
    );
}

export default Cart;