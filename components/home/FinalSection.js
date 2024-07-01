
const FinalSection = () => {
    return (
        <div className="relative h-[80vh] w-full flex justify-center items-end text-center text-white mt-24"
            style={{
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.60) 100%), url('https://i.ibb.co/Fw20s00/slider-7.png') lightgray`,
                backgroundPosition: 'center',

            }}
        >
            <div className="flex flex-col py-20 gap-y-5">
                <p className="text-4xl font-bold">The World of Temperly</p>
                <p className="w-[60%] self-center">Delve into our peppering of escapist posts and news from down the rabbit hole. Explore Alice's fantastical wonderland in true Temperley style.</p>
                <button className="btn uppercase font-semibold bg-white w-fit self-center text-black rounded-md px-10 border-white hover:text-white">shop now</button>
            </div>
        </div>
    );
}

export default FinalSection;