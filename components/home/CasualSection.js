import Link from "next/link";

const CasualSection = ({section}) => {
    return (
        <div className="grid lg:grid-cols-2 relative mt-3">
            {
                section.images.map((h, i)=><div key={i} className="relative w-full h-[70vh]" style={{
                    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%), url(${h.img}) lightgray 50% / cover no-repeat`
                }}>
                </div>)
            }
            <div className="absolute w-full lg:bottom-[10%] bottom-[50%] translate-y-[50%] lg:translate-y-0">
                <div className="container px-5 lg:px-0 mx-auto flex flex-col gap-y-10 text-white items-center text-center">
                    <p className="text-5xl font-bold">{section.title}</p>
                    <p className="text-2xl">{section.subTitle}</p>
                    <div className="flex flex-col lg:flex-row gap-y-10 gap-x-20 text-2xl underline font-medium">
                        <Link href={'/category/jeans/male'} >Shop Men Pants</Link>
                        <Link href={'/category/jeans/female'} >Shop Women Men Pants</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CasualSection;