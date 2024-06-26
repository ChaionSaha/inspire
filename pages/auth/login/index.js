import inspireLogo from '@/assets/logo-black.png';
import Title from '@/components/global/Title';
import CustomInput from '@/components/Shared/CustomInput';
import CustomPasswordInput from '@/components/Shared/CustomPasswordInput';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Button, Spinner } from '@nextui-org/react';
import { getServerSession } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Index =  ({session}) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    

    useEffect(() => {
        signOut({redirect: false});
    }, [session]);

    const handleLogin = async (formData) => {
        setErr('');
        if (formData.email.trim() === '' || !formData.email.includes('@') || formData.password.trim() === '')
        {
            setErr('Please enter valid email and password');
            return;
        }

        setLoading(true);
        const {email, password} = formData;
        const data = await signIn('credentials', { email, password, redirect: false });
        console.log(data);
        setLoading(false);
        if (data.error || data.status !== 200) {
            setErr(data.error);
            return;
        }
        router.push('/profile');
    }


    return (
        <>
            <Title title='Login'/>
            <div className="w-full h-[100vh] flex flex-col justify-center items-center border">
                <Link href={'/'}>
                    <Image src={inspireLogo} alt="Inspire Logo" className='w-40 h-14'/>
                </Link>
                <p className='text-xl mt-3'>Login to your account</p>
                <form onSubmit={handleSubmit(handleLogin)} className='lg:w-[30%] w-full px-5 lg:px-0 mt-10 flex flex-col gap-y-5'>
                    <CustomInput control={control} name={'email'} label={'Email'} type={'email'} />
                    <CustomPasswordInput control={control} name={'password'} />
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
                            {loading ? <Spinner/> : "Login"} 
                        </Button>
                    </div>
                    <Link href='/auth/signup' className='text-center underline'>Create a new account</Link>
                </form>
            </div>
        </>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {
    const session  = await getServerSession(ctx.req, ctx.res, authOptions) 

    return {
        props:{
            session: JSON.stringify(session)
        }
    }
}