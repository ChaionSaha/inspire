function index() {
    return (
        <div>
            Enter
        </div>
    );
}

export default index;

export async function getServerSideProps({ req }) {

    return {
        redirect: {
            destination: '/',
            permanent:false,
        }
    }
}