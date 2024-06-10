import AnimateLayout from "@/components/global/AnimateLayout";
import Title from "@/components/global/Title";
import CustomInput from "@/components/Shared/CustomInput";
import { isValidUser } from "@/lib/auth";
import { addBillingInfo } from "@/lib/store";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            phone: ''
        }
    });
    const cart = useSelector(state => state.cart.cart);
    const router = useRouter();
    const dispatch = useDispatch();
    const [err, setErr] = useState('');

    useEffect(() => {
        if (cart.length <= 0)
            router.push('/');
    },[cart, router])

    const handleInfoSubmit = (formData) => {
        setErr('');
        const { firstName, address, email, phone } = formData;
        
        if(firstName.trim() === '' || address.trim() === '' || email.trim() === '' || !email.includes('@') || phone.trim() === ''){
            setErr('Please fill all the fields');
            return;
        }

        dispatch(addBillingInfo({ ...formData }));
        router.push('/checkout/payment-info');
    }

    return (
        <AnimateLayout>
            <Title title='Billing Information'/>
            <div className="container flex justify-between mx-auto my-16">
                <div className="w-[55%]">
                    <p className="text-4xl font-bold">Billing Information</p>
                    <form onSubmit={handleSubmit(handleInfoSubmit)} className="my-10 flex flex-col gap-5">
                        <div className="grid grid-cols-2 gap-5">
                            <CustomInput control={control} name={'firstName'} label={'First Name'} />
                            <CustomInput control={control} name={'lastName'} label={'Last Name'} />
                        </div>
                        <CustomInput control={control} name={'address'} label={'Address'} />
                        <CustomInput control={control} name={'email'} label={'Email Address'} type='email'/>
                        <CustomInput control={control} name={'phone'} label={'Phone Number'} type='tel' />
                        <div className="">
                            {
                                err && <p className="text-red-500">{err}</p>
                            }
                            <Button type="submit" className="w-full bg-black text-white rounded">Save & Continue</Button>
                        </div>
                    </form>
                </div>
                <div className="w-[35%]">
                    <p className="text-4xl font-bold">Order Summary</p>
                    <div className="my-10 flex flex-col gap-5">
                        {
                            cart.map((c, i) =>
                                <div key={i} className="flex justify-between items-center">
                                    <div className="flex gap-x-2">
                                        <div className="relative size-24">
                                            <Image src={c.images[0].img} alt={ c.name} fill className="object-contain"/>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-lg"><span className="font-bold"> {c.name}</span> (x{c.quantity})</p>
                                            <p className="font-semibold">$ {c.price}</p>
                                            <p>Size: {c.selectedSize.name}</p>
                                        </div>
                                    </div>
                                    <p className="text-lg self-start font-bold">${c.price * c.quantity}</p>
                                </div>
                            )
                        }
                    </div>
                    <div className="w-full border"></div>
                    <div className="my-5 text-xl flex justify-between">
                        <p className=" font-bold">Total</p>
                        <p className=" font-bold">${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)}</p>
                    </div>
                </div>
            </div>
        
        </AnimateLayout>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {
    const validUser = await isValidUser(ctx.req, ctx.res);

    if (!validUser) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }

    return {
        props:{
            data:null
        }
    }
}