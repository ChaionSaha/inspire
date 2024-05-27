import Image from "next/image";

const CategoryItem = ({item}) => {
    return (
        <div>
            <div className="relative h-[50vh]">
                <Image src={item.images[0].img} alt="item.name" fill className="object-cover"/>
            </div>
            
        </div>
    );
}

export default CategoryItem;