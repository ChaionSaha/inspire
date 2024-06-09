import inspireLogo from '@/assets/logo-black.png';
import Title from "@/components/global/Title";
import CustomInput from "@/components/Shared/CustomInput";
import CustomPasswordInput from "@/components/Shared/CustomPasswordInput";
import { Button, Spinner } from "@nextui-org/react";
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Index = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async (formData) => {
        setErr('')
        const { firstName, lastName, email, password, confirmPassword } = formData;   
        
        if(firstName.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            setErr('Please fill all fields');
            return;
        }

        if (!email.includes('@')) {
            setErr('Invalid email');
            return;
        }

        if(password.trim().length < 7) {
            setErr('Password should be at least 7 characters long');
            return;
        }

        if(password !== confirmPassword) {
            setErr('Passwords do not match');
            return;
        }

        setLoading(true);
        axios.post('/api/auth/signup', {...formData})
            .then(async() => {
                const data = await signIn('credentials', {  email, password, redirect: false});
                if (data.error || data.status !== 200) {
                    setErr("Your account has been created successfully. Please login to continue.");
                    return;
                }
                router.push('/profile');
            })
            .catch(err => {
                setErr(err.response.data.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }


    return (
        <>
            <Title title='Login'/>
            <div className="w-full h-[100vh] flex flex-col justify-center items-center border">
                <Link href={'/'}>
                    <Image src={inspireLogo} alt="Inspire Logo" className='w-40 h-14'/>
                </Link>
                <p className='text-xl mt-3'>Create a new account</p>
                <form onSubmit={handleSubmit(handleSignUp)} className='w-[40%] mt-10 flex flex-col gap-y-5'>
                    <div className="grid grid-cols-2 gap-x-5">
                        <CustomInput control={control} name={'firstName'} label={'First Name'} type={'text'} />
                        <CustomInput control={control} name={'lastName'} label={'Last Name'} type={'text'} />
                    </div>
                    <CustomInput control={control} name={'email'} label={'Email'} type={'email'} />
                    <CustomPasswordInput control={control} name={'password'} />
                    <CustomPasswordInput control={control} name={'confirmPassword'} label='Confirm Password'/>
                    <div className="flex flex-col">
                        {
                            err && <p className='text-red-500'>{err}</p>
                        
                        }
                        <Button
                            disabled={loading}
                            variant='bordered'
                            radius='none'
                            size='lg'
                            type='submit'>
                            {loading ? <Spinner/> : "Create Account"} 
                        </Button>
                    </div>
                    <p className='flex gap-x-2 items-center justify-center'>
                        Already have an account?

                        <Link href='/auth/login' className='text-center underline'>
                        Login
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default Index;