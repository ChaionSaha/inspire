import Product from "../category/Product";

const NewArrivalsSection = ({products}) => {
    return (
        <div className="container px-5 lg:px-0 mx-auto">
            <p className="font-bold text-3xl capitalize">more new arrivals You'll Love</p>
            <div className="grid lg:grid-cols-3 gap-10 mt-10">
                {
                    products.map((c, i) =>
                        <Product key={i} item={c}/>
                    )
                }
            </div>
        </div>
    );
}

export default NewArrivalsSection;