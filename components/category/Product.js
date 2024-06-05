import { addToCart } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

const Product = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <div className="px-3">
            <div className="">
                <div className="relative h-[55vh] overflow-hidden group">
                    <Image src={item.images[0].img} fill alt={item.name} className="object-cover object-center" />
                    <Link
                        href={`/product/${item.id}`}
                        className="absolute r top-0 left-0 z-[10] w-full h-full opacity-0 group-hover:opacity-100 duration-500 bg-[rgba(0,0,0,0.5)]">
                        
                        <div className="relative flex justify-center items-center w-full h-full">
                            <p className="text-3xl text-white font-medium">View Item</p>
                            <div className="absolute top-0 left-[50%] translate-x-[-50%] scale-[1.1] group-hover:scale-100 duration-300 border-s border-e h-full w-[70%] border-fade-white"></div>
                            <div className="absolute top-[50%] left-0 translate-y-[-50%] scale-[1.5] group-hover:scale-100 duration-300 border-t border-b h-[50%] w-full border-fade-white"></div>
                        </div>
                    </Link>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <p className="mt-3 font-medium text-xl">{item.name}</p>
                        <p className="text-2xl font-bold">${item.price}</p>
                    </div>
                    <button
                        onClick={() => { 
                            const newItem = { ...item };
                            delete newItem.sizes;
                            newItem.selectedSize = item.sizes[0];
                            dispatch(addToCart({ item: newItem, quantity: 1 }));
                        }}
                        className="px-3 py-2 border rounded-full self-center hover:border-black duration-300 h-fit group/bag">
                        <i className="bi bi-bag text-xl text-gray-400 group-hover/bag:text-black duration-150"></i>
                    </button>
                </div>

                
            </div>
        </div>
    );
}

export default Product;