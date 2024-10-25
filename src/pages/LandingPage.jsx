import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function LandingPage(){

    const navigate = useNavigate()

    const [enteredEmail, setEnteredEmail] = useState('')
    const [emailFieldIsFocussed, setEmailFieldIsFocussed] = useState(false);

    const [enteredPassword, setEnteredPassword] = useState('')
    const [passwordFieldIsFocussed, setPasswordFieldIsFocussed] = useState(false);

    const [formIsValid, setFormIsValid] = useState(false);

    function enteredEmailHandler(e){
        setEnteredEmail(e.target.value);
        console.log(e.target.value)
    }

    function enteredPasswordHandler(e){
        setEnteredPassword(e.target.value);
        console.log(e.target.value)
    }

    useEffect(() => {
        if(enteredEmail.trim().includes('@gmail.com') && enteredPassword.trim().length > 3){
            console.log('Form is Validated...!')
            setFormIsValid(true)
        }
    }, [enteredEmail, enteredPassword])

    async function submitToDatabaseHandler(e){
        e.preventDefault();

        const VERIFICATION_URL = 'https://bingwahybrid.vercel.app/admin';

        if(formIsValid){

            console.log(`Form is Valid and Ready To be sent to Vercel`)

            const response = await fetch(VERIFICATION_URL, {
                method: 'POST',
                body: JSON.stringify({
                    email : enteredEmail,
                    pin : enteredPassword
                }),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
    
            const data = await response.json();

            if(data['success']){

                setEnteredEmail('')
                setEnteredPassword('')

                navigate('./dashboard')
            }

            // * clear the form it is valid
        }
    }

    return <section>
        <div className="flex justify-center mt-[150px] p-6">
            <div className="mr-20 mt-16">
                <p className='font-barlow text-[35px]'>Monitor and Update <br/>Agent Details at your <br/>comfort</p>
            </div>
            <form className="px-8 py-6 rounded border" onSubmit={submitToDatabaseHandler}>
                <div>
                    <p className="text-[12px] font-inter">Email</p>
                    <input 
                        value={enteredEmail}
                        onChange={enteredEmailHandler}
                        onFocus={() => setEmailFieldIsFocussed(true)}
                        onBlur={() => setEmailFieldIsFocussed(false)}
                        className={`border-2 mt-1 rounded-[8px] px-[16px] py-[8px] text-[13px] ${emailFieldIsFocussed ? 'border-[#425E91] outline-none' : ''}`}
                        placeholder="Value"
                    />
                </div>

                <div className="mt-3">
                    <p className="text-[12px] font-inter">Password</p>
                    <input 
                        type="password"
                        value={enteredPassword}
                        onChange={enteredPasswordHandler}
                        onFocus={() => setPasswordFieldIsFocussed(true)}
                        onBlur={() => setPasswordFieldIsFocussed(false)}
                        className={`border-2 mt-1 rounded-[8px] px-[16px] py-[8px] text-[13px] ${passwordFieldIsFocussed? 'border-[#425E91] outline-none' : ''}`}
                        placeholder="*********"
                    />
                </div>

                
                <button className="bg-black w-full text-white text-[13px] rounded-[8px] py-1 font-inter mt-4">Sign In</button>
                

                <p className="mt-4 text-[12px] font-inter underline hover:cursor-pointer">Forgot password?</p>
            </form>
        </div>
    </section>
}