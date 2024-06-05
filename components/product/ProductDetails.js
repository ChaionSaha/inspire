import { addToCart } from "@/lib/store";
import { Accordion, AccordionItem, Radio, RadioGroup } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProductDetails = ({product}) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [itemCount, setItemCount] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(selectedSize);
    },[selectedSize])

    return (
        <div className="container mx-auto py-10">
            <div className="flex gap-x-10">
                <div className="w-[60%] grid grid-cols-2 gap-3">
                    {
                        product.images.map((image, i) => (
                            <div key={i} className="relative h-[65vh]">
                                <Image quality={100} src={image.img} alt={product.name} className="object-cover object-top" fill/>
                            </div>
                        ))
                    }
                </div>
                <div className="w-[40%]">
                    <p className="text-4xl font-bold">{product.name}</p>
                    <p className="text-2xl font-bold mt-5">$ {product.price}</p>
                    <p className="mt-10 text-xl"> <span className="font-semibold">Color:</span> {product.color} </p>
                    <div className="mt-10">
                        <p className="text-2xl font-medium">Select Size</p>
                        <RadioGroup
                            value={[selectedSize]}
                            onValueChange={setSelectedSize}
                            className="mt-3"
                            classNames={{
                                wrapper: 'grid grid-cols-4 gap-x-5 gap-y-7'
                            }}
                        >
                            {
                                product.sizes.map((size, i) => (
                                    <div key={i} className="w-full">
                                        <Radio
                                            key={size.value}
                                            value={size.value}
                                            className="text-center"
                                            classNames={{
                                                wrapper: 'hidden',
                                                base: `border rounded-lg text-center border-[rgba(34,34,34,0.29)] flex justify-center w-full max-w-full ${selectedSize === size.value ? 'bg-[#222] text-white': 'bg-white text-black'}`,
                                                control: 'hidden',
                                                label: `${selectedSize === size.value ? 'text-white': 'text-black'}`
                                            }}
                                        >
                                            {size.name}
                                        </Radio>
                                    </div>
                                ))
                            }
                        </RadioGroup>
                            
                    </div>
                    <div className="mt-10 flex items-center gap-x-10">
                        <div className="flex items-center border rounded-lg border-dark-100">
                            <button onClick={() => {
                                if(itemCount > 1)
                                    setItemCount(itemCount - 1)
                            }
                            }
                            className="btn btn-ghost text-xl"><i className="bi bi-dash"></i></button>
                            <p className="text-lg font-semibold px-5">{itemCount}</p>
                            <button onClick={() => setItemCount(itemCount + 1)} className="btn btn-ghost text-xl"><i className="bi bi-plus"></i></button>
                        </div>
                        <button
                            className="btn bg-dark-100 text-white flex-grow border-dark-100 hover:text-black font-medium"
                            onClick={() => {
                                const newItem = { ...product };
                                delete newItem.sizes;
                                newItem.selectedSize = selectedSize.trim() !== '' ? product.sizes.find(ps => ps.value === selectedSize) : product.sizes[0];
                                dispatch(addToCart({ item: newItem, quantity: itemCount }));
                            }}
                        >
                            Add to Cart - ${+product.price * itemCount}
                        </button>
                    </div>
                    <div className="my-10 text-[#545454]">
                        <p className="text-center">Free worldwide shipping on orders above $650 or equivalent</p>
                        <p className="text-center">We cover duties & taxes for orders to the EU</p>
                    </div>
                    <div className="border-t border-b">
                        <Accordion
                        >
                            <AccordionItem key="1" aria-label="Description" title="Description" indicator={<i className="bi bi-plus text-xl "></i>} classNames={{
                                title:'uppercase font-medium'
                            }}>
                                {
                                    product.description
                                }
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;