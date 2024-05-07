import slider1 from '@/assets/slider-1.png';
import slider2 from '@/assets/slider-2.png';
import slider3 from '@/assets/slider-3.png';
import AnimateLayout from "@/components/global/AnimateLayout";
import Title from "@/components/global/Title";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false
};

export default function Home() {
  
    return (
        <AnimateLayout>
            <Title title={'Home'}/>
            <Slider {...settings} >
                <div className="relative w-full h-[95vh] border" >
                    <Image src={slider1} alt="slider-1" fill className=' object-cover' quality={100}/>
                </div>
                <div className="relative w-full h-[95vh]">
                    <Image src={slider2} alt="slider-1" fill className=' object-cover' quality={100}/>
                </div>
                <div className="relative w-full h-[95vh]">
                    <Image src={slider3} alt="slider-1" fill className=' object-cover' quality={100}/>
                </div>
            </Slider>
        </AnimateLayout>
    );
}
