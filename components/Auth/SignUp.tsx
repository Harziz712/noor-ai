import supabase from '@/lib/supabase';
import React, { useState } from 'react';
// import { LoadIcon } from '../ui/loading';
import {toast} from "sonner";



const SignUp = () => {
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        // const username = formData.get("username") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        if(!email || !password) {
            toast.error("pls provide email and password")
        }

        const {data, error} = await supabase.auth.signUp({
        email,
        password,
        }) 

        if (data){
            toast.success("Signup successful")
        }
        if (error){
            toast.error("Signup failed. pls try again")
        }
        console.log(data, error)

        // setTimeout(() => {
        //     setLoading(false);
        //     router.push('/login'); // Redirect to chat page after successful sign-up
        // }, 2000); // Simulate a 2-second sign-up process

        console.log('Sign-up form submitted');
    }


    return (
        <div className=" flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSignup}>
             
                   <div className="rounded-md shadow-sm space-y-4">
                       <div>
                           <input
                               type="text"
                               name="username"
                               className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Username"
                       
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Email address"
                         
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Password"

                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? "Loading ..." : 'Sign up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;