import AnimateLayout from "@/components/global/AnimateLayout";
import Title from "@/components/global/Title";
import { getDatabase } from "@/lib/mongoConnection";

export default function index({products, category}) {
    return (
        <AnimateLayout>
            <Title title={category.name}/>
        </AnimateLayout>
    )
}

export async function getServerSideProps({query}) {
    const { cat } = query;
    const db = await getDatabase();
    const category = cat[0];
    let gender='';
    if (cat.length === 2)
        gender = cat[1];

    const products = await db.collection('products').find({ cat: category, gender }, { projection: { _id: 0 } }).toArray();
    const categoryDetails = await db.collection('categories').findOne({ value: category }, { projection: { _id: 0 } });

    return {
        props: {
            products, category: categoryDetails
        }
    }
}