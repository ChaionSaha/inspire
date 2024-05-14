import AnimateLayout from "@/components/global/AnimateLayout";

const Index = ({pid}) => {
    return (
        <AnimateLayout>
            <div>
            Showing {pid}
            </div>
        </AnimateLayout>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {
    const { pid } = ctx.query;

    return {
        props:{
            pid
        }
    }
}