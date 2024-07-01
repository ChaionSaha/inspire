const HeroSection = ({section}) => {
    return (
        <div className="relative w-full h-[95vh]" style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%), url(${section.img}) lightgray 50% / cover no-repeat`
        }}>
            <div className="absolute w-full text-white lg:bottom-[25%] bottom-[50%] translate-y-[50%] lg:translate-y-0">
                <div className="container mx-auto px-5 lg:px-0">
                    <p className="uppercase lg:text-6xl text-4xl font-bold">{section.title}</p>
                    <p className="lg:text-2xl text-xl mt-2">{section.subTitle}</p>
                    <button className="btn mt-10 px-10 rounded text-lg uppercase hover:bg-[rgba(255,255,255,0.2)]">Shop Now</button>
                </div>
            </div>
        </div> 
    );
}

export default HeroSection;