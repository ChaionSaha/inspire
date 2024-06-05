import AnimateLayout from "@/components/global/AnimateLayout";
import Title from "@/components/global/Title";
import NewArrivalsSection from "@/components/product/NewArrivalsSection";
import ProductDetails from "@/components/product/ProductDetails";
import { getDatabase } from "@/lib/mongoConnection";
import { useState } from "react";

const Index = ({ product, relatedProducts }) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [itemCount, setItemCount] = useState(1);
    const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));

    return (
        <AnimateLayout>
            <Title title={product.name} />
            <ProductDetails product={product} />
            
            <div className="my-20">
                <NewArrivalsSection products={relatedProducts}/>
            </div>
        </AnimateLayout>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {
    const { pid } = ctx.query;
    const db = await getDatabase();
    const product = await db.collection('products').findOne({ id: pid }, { projection: { _id: 0 } });
    const relatedProducts = await db.collection('products').find({ cat: product.cat }).limit(6).project({ _id: 0 }).toArray();

    return {
        props:{
            product,
            relatedProducts
        }
    }
}