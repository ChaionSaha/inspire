import AnimateLayout from "@/components/global/AnimateLayout";
import Title from "@/components/global/Title";
import { getDatabase } from '@/lib/mongoConnection';
import Link from "next/link";


export default function Home({hero, heroSection2}) {
    return (
        <AnimateLayout>
            <Title title={'Home'}/>
            <div className="relative w-full h-[95vh]" style={{
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%), url(${hero.img}) lightgray 50% / cover no-repeat`
            }}>
                <div className="absolute w-full text-white bottom-[25%]">
                    <div className="container mx-auto">
                        <p className="uppercase text-6xl font-bold">{hero.title}</p>
                        <p className="text-2xl mt-2">{hero.subTitle}</p>
                        <button className="btn mt-10 px-10 rounded text-lg uppercase hover:bg-[rgba(255,255,255,0.2)]">Shop Now</button>
                    </div>
                </div>
            </div>  
            <div className="grid grid-cols-2 relative mt-3">
                {
                    heroSection2.images.map((h, i)=><div key={i} className="relative w-full h-[70vh]" style={{
                        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%), url(${h.img}) lightgray 50% / cover no-repeat`
                    }}>
                    </div>)
                }
                <div className="absolute w-full bottom-[10%]">
                    <div className="container mx-auto flex flex-col gap-y-10 text-white items-center text-center">
                        <p className="text-5xl font-bold">{heroSection2.title}</p>
                        <p className="text-2xl">{heroSection2.subTitle}</p>
                        <div className="flex gap-x-20 text-2xl underline font-medium">
                            <Link href={'/category/jeans/men'} >Shop Men Pants</Link>
                            <Link href={'/category/jeans/women'} >Shop Women Men Pants</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AnimateLayout>
    );
}

export async function getServerSideProps() {
    const db = await getDatabase();
    const homepageHero = await db.collection('homepage').findOne({ id: "hero-img" }, { projection: { _id: 0 } });
    const heroSection2 = await db.collection('homepage').findOne({ id: "hero-section-2" }, { projection: { _id: 0 } });

    return {
        props: {
            hero: homepageHero,
            heroSection2
        }
    }
}