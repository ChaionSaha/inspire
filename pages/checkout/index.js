

const Index = () => {
    return (
        <div>
            Enter
        </div>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {
    return {
        redirect: {
            destination: '/checkout/billing-info',
        }
    }
}