import Image from "next/image";
import Link from "next/link";

const FeaturedCategorySection = ({categories}) => {
    return (
        <div className="container mx-auto px-5 lg:px-0 my-10">
            <p className="font-bold text-3xl">Featured Categories</p>
            <div className="mt-5 grid lg:grid-cols-4 grid-cols-2 lg:gap-10 gap-5">
                {
                    categories.map((c, i) =>
                        <Link href={`/category/${c.value}`} key={i} className="group">
                            <div className="relative h-[40vh] overflow-hidden">
                                <Image src={c.img} fill alt={c.name} className="object-cover group-hover:scale-110 duration-300"/>
                            </div>
                            <p className="mt-3 font-medium text-xl">{c.name}</p>
                        </Link>)
                }
            </div>
        </div>
    );
}

export default FeaturedCategorySection;