const Index = () => {
    return (
        <div>
            
        </div>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {


    return {
        redirect: {
            destination: '/'
        }
    }
}