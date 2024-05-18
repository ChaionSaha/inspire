import { NextIcon, PrevIcon } from "@/assets/icons/CustomIcon";
import { addToCart } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    centerPadding: '1px'
};

const NewArrivalSection = ({ products }) => {
    const sliderRef = useRef(null);
    const dispacth = useDispatch();

    return (
        <div className="container mx-auto my-10">
            <p className="font-bold text-3xl capitalize">more new arrivals You'll Love</p>
            <div className="mt-5 slider-container relative">
                <button
                    className="absolute top-[50%] translate-y-[-50%] left-[-2%]"
                    onClick={()=>sliderRef.current.slickPrev()}
                >
                    <PrevIcon className='w-5 h-5'/>
                </button>
                <button
                    className="absolute top-[50%] translate-y-[-50%] right-[-2%]"
                    onClick={()=>sliderRef.current.slickNext()}
                >
                    <NextIcon className='w-5 h-5'/>
                </button>
                <Slider {...settings} ref={sliderRef} >
                    {
                        products.map((c, i) =>
                            <div key={i} className="px-3">
                                <div className="group">
                                    <div className="relative h-[55vh] overflow-hidden">
                                        <Image src={c.images[0].img} fill alt={c.name} className="object-cover opacity-1 group-hover:opacity-0 duration-300 object-right-top"/>
                                        <Image src={c.images[1].img} fill alt={c.name} className="object-cover opacity-0 group-hover:opacity-[1]  duration-300 object-right-top"/>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <Link href={`/product/${c.id}`} className="mt-3 font-medium text-xl hover:underline">{c.name}</Link>
                                            <p className="text-2xl font-bold">${c.price}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                dispacth(addToCart({ item: c, quantity: 1 }));
                                            }}
                                            className="px-3 py-2 border rounded-full self-center hover:border-black duration-300 h-fit group/bag">
                                            <i className="bi bi-bag text-xl text-gray-400 group-hover/bag:text-black duration-150"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Slider>
            </div>
        </div>
    );
}

export default NewArrivalSection;