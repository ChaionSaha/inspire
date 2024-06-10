import { Radio, RadioGroup } from "@nextui-org/react";

const PaymentMethodSelection = ({selectedGateway, setSelectedGateway, paymentMethods}) => {
    return (
        <div className="">
            <p className="text-3xl font-bold">Select Payment Method</p>
            <RadioGroup
                className="mt-10"
                value={selectedGateway}
                onValueChange={setSelectedGateway}
                classNames={{
                    wrapper: 'grid grid-cols-3 gap-5 gap-y-10'
                }}
            >
                {
                    paymentMethods.map((method, index) => (
                        <Radio key={index} value={method.name} >
                            <div className="relative border px-10 py-3 rounded-xl">
                                <img src={method.img} alt={method.name} className={`h-14 duration-300  ${selectedGateway === method.name ? 'grayscale-0' : 'grayscale' }`}/>
                            </div>
                        </Radio>
                    ))
                }
            </RadioGroup>
        </div>
    );
}

export default PaymentMethodSelection;