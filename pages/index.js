
import AnimateLayout from '@/components/global/AnimateLayout';
import Title from '@/components/global/Title';
import CasualSection from '@/components/Home/CasualSection';
import FeaturedCategorySection from '@/components/Home/FeaturedCategorySection';
import FinalSection from '@/components/Home/FinalSection';
import HeroSection from '@/components/Home/HeroSection';
import NewArrivalSection from '@/components/Home/NewArrivalSection';
import { getDatabase } from '@/lib/mongoConnection';


export default function Home({hero, heroSection2, categories, products}) {
    return (
        <AnimateLayout>
            <Title title={'Home'}/>
            <HeroSection section={hero}/> 
            <CasualSection section={heroSection2} />
            <FeaturedCategorySection categories={categories} />
            <NewArrivalSection products={products} />
            <FinalSection/>
        </AnimateLayout>
    );
}

export async function getServerSideProps() {
    const db = await getDatabase();
    const homepageHero = await db.collection('homepage').findOne({ id: "hero-img" }, { projection: { _id: 0 } });
    const heroSection2 = await db.collection('homepage').findOne({ id: "hero-section-2" }, { projection: { _id: 0 } });
    const categories = await db.collection('categories').find({ featured: true }).project({ _id: 0 }).toArray();
    const products = await db.collection('products').find({}).project({ _id: 0 }).toArray();

    return {
        props: {
            hero: homepageHero,
            heroSection2,
            categories,
            products
        }
    }
}