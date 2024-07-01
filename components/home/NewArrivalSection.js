import { NextIcon, PrevIcon } from "@/assets/icons/CustomIcon";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import Product from "../category/Product";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    centerPadding: '1px',
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
};

const NewArrivalSection = ({ products }) => {
    const sliderRef = useRef(null);
    const dispacth = useDispatch();

    return (
        <div className="container px-5 lg:px-0 mx-auto my-10">
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
                            <Product key={i} item={c}/>
                        )
                    }
                </Slider>
            </div>
        </div>
    );
}

export default NewArrivalSection;