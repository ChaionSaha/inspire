const HeroSection = ({section}) => {
    return (
        <div className="relative w-full h-[95vh]" style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%), url(${section.img}) lightgray 50% / cover no-repeat`
        }}>
            <div className="absolute w-full text-white bottom-[25%]">
                <div className="container mx-auto">
                    <p className="uppercase text-6xl font-bold">{section.title}</p>
                    <p className="text-2xl mt-2">{section.subTitle}</p>
                    <button className="btn mt-10 px-10 rounded text-lg uppercase hover:bg-[rgba(255,255,255,0.2)]">Shop Now</button>
                </div>
            </div>
        </div> 
    );
}

export default HeroSection;