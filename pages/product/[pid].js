import AnimateLayout from "@/components/global/AnimateLayout";
import Title from "@/components/global/Title";
import { getDatabase } from "@/lib/mongoConnection";
import Image from "next/image";

const Index = ({product, relatedProducts}) => {
    return (
        <AnimateLayout>
            <Title title={product.name} />
            <div className="container mx-auto py-10">
                <div className="flex gap-x-10">
                    <div className="w-[60%] grid grid-cols-2 gap-3">
                        {
                            product.images.map((image, i) => (
                                <div key={i} className="relative h-[65vh]">
                                    <Image quality={100} src={image.img} alt={product.name} className="object-cover object-top" fill/>
                                </div>
                            ))
                        }
                    </div>
                    <div className="w-[40%]">
                        <p className="text-4xl font-bold">{product.name}</p>
                        <p className="text-2xl font-bold mt-5">$ {product.price}</p>
                        <p className="mt-10 text-xl"> <span className="font-semibold">Color:</span> {product.color} </p>
                        <div className="mt-10">
                            <p className="text-2xl font-medium">Select Size</p>
                            
                        </div>
                    </div>
                </div>
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