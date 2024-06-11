import { TickIcon } from "@/assets/icons/CustomIcon";
import CustomInput from "@/components/Shared/CustomInput";
import { clearCart } from "@/lib/store";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const PaymentMethodDetails = ({ paymentMethods, selectedPaymentMethod }) => {
    const [selectedMethodDetails, setSelectedMethodDetails] = useState(paymentMethods.find(method => method.name === selectedPaymentMethod));
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const {isOpen, onOpenChange, onOpen}=useDisclosure()
    
    const cart = useSelector(state => state.cart.cart);
    const billingInfo = useSelector(state => state.cart.billingInfo);
    const dispatch = useDispatch();
    
    const { control, handleSubmit } = useForm({
        defaultValues: {
            accountNumber: '',
            trxId:''
        }
    })

    useEffect(() => {
        setSelectedMethodDetails(paymentMethods.find(method => method.name === selectedPaymentMethod));
    }, [selectedPaymentMethod, paymentMethods]);

    const handlePaymentSubmit = (formData) => {
        setErr('');
        const { accountNumber, trxId } = formData;
        if (accountNumber.trim() === '' || trxId.trim() === '') { 
            setErr('Please fill all the fields');
            return;
        }
            
        setLoading(true);
        axios.post('/api/place-order', {
            ...formData,
            cart,
            billingInfo,
            selectedMethodDetails
        }).then(() => {
            onOpen();
        }).catch(err => { setErr(err.response.data.message) })
            .finally(() => setLoading(false));
    }


    return (
        <div>
            <p className="text-2xl font-bold">{selectedMethodDetails.name} Details</p>
            <ol className="list-decimal flex flex-col text-lg gap-y-5 mt-5 ms-4 text-[#7b7b78]">
                <li>Open up the {selectedMethodDetails.name} app and choose "Send Money".</li>
                <li>Enter the {selectedMethodDetails.name} account number which is given below.</li>
                <li>Enter the amount ${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)} and confirm transaction.</li>
                <li>After sending money, you will receive {selectedMethodDetails.name} transaction ID or TRX ID.</li>
            </ol>
            <div className="mt-5 flex flex-col gap-y-5 text-lg text-[#7b7b78]">
                <p>Account Type: <span className="font-medium">{selectedMethodDetails.type}</span></p>
                <p>Account Number: <span className="font-medium">{selectedMethodDetails.number}</span></p>
            </div>
            <form
                onSubmit={handleSubmit(handlePaymentSubmit)}
                className="mt-10 flex flex-col gap-y-5">
                <CustomInput
                    control={control}
                    name={'accountNumber'}
                    label={'Account Number'}
                    type='tel' />
                <CustomInput
                    control={control}
                    name={'trxId'}
                    label={'Transaction ID'}
                    type='text' 
                />
                <div className="w-full">
                    <Button
                        disabled={loading}
                        size="lg"
                        type="submit"
                        className="bg-black text-white w-full rounded">
                        {loading ? <Spinner /> : 'Place Order'}
                    </Button>
                </div>
            </form>
            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                hideCloseButton={true}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader></ModalHeader>
                            <ModalBody className="flex flex-col items-center">
                                <TickIcon className='w-20 h-20 fill-success' />
                                <p className="mt-5 text-2xl font-semibold">Your order has been placed!</p>
                            </ModalBody>
                            <ModalFooter className="flex mt-5 justify-center">
                                <Button
                                    color="primary"
                                    variant="bordered"
                                    className="rounded text-base border font-medium"
                                    onPress={() => {
                                        onClose();
                                        router.push('/');
                                        dispatch(clearCart());
                                    }
                                    }>
                                    Back to home
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default PaymentMethodDetails;