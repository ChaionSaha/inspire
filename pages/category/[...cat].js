import Product from "@/components/category/Product";
import AnimateLayout from "@/components/global/AnimateLayout";
import Title from "@/components/global/Title";
import { getDatabase } from "@/lib/mongoConnection";

export default function Index({ products, category }) {

    return (
        <AnimateLayout>
            <Title title={category.name} />
            <div className="grid lg:grid-cols-4 gap-10 container px-5 lg:px-0 mx-auto py-10">
                {
                    products.map((product, i) => (
                        <Product key={i} item={product}/>
                    ))
                }
            </div>
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

    let products;

    if(gender.trim() !== '')
        products = await db.collection('products').find({ cat: category, gender }, { projection: { _id: 0 } }).toArray();
    else
        products = await db.collection('products').find({ cat: category }, { projection: { _id: 0 } }).toArray();
        
    
    const categoryDetails = await db.collection('categories').findOne({ value: category }, { projection: { _id: 0 } });

    return {
        props: {
            products, category: categoryDetails
        }
    }
}