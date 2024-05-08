import AnimateLayout from "@/components/global/AnimateLayout";

export default function index() {
    return (
        <AnimateLayout>
            <div>
            </div>
        </AnimateLayout>
    )
}

export async function getServerSideProps({query}) {
    console.log(query);
    return {
        props:{}
    }
}