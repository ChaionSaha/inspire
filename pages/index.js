import AnimateLayout from "@/components/global/AnimateLayout";
import Title from "@/components/global/Title";
import { getDatabase } from '@/lib/mongoConnection';
import Image from "next/image";


export default function Home({hero}) {
    return (
        <AnimateLayout>
            <Title title={'Home'}/>
            <div className="relative w-full h-[95vh]" >
                <Image src={hero.img} alt={hero.title} fill className=' object-cover' quality={100}/>
            </div>   
        </AnimateLayout>
    );
}

export async function getServerSideProps() {
    const db = await getDatabase();
    const homepageHero = await db.collection('homepage').find().project({ _id: 0 }).toArray();

    return {
        props: {
            hero:homepageHero[0]
        }
    }
}