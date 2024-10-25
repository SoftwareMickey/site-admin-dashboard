import REACTDOM from 'react-dom'
import { FaX } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux'
import { portalActions } from '../store';
import React, { useState } from 'react';


export default function EditModal(){

    const [enteredEmail, setEnteredEmail] = useState('')
    const [emailIsValid, setEmailIsValid] = useState(false)
    const [emailIsFocused, setEmailIsFocused] = useState(false);

    const [enteredName, setEnteredName] = useState('')
    const [nameIsValid, setNameIsValid] = useState(false)
    const [nameIsFocused, setNameFocused] = useState(false);

    const isModalShown = useSelector(state => state.portal.isModalOpen);
    const dispatch = useDispatch();

    function enteredEmailHandler(e){
        console.log('Hello....!')
        setEnteredEmail(e.target.value);
        console.log(e)
    }

    function enteredNameHandler(e){
        console.log('Hello....!')
        setEnteredName(e.target.value);
        console.log(e)
    }

    function closeModalHandler(){
        dispatch(portalActions.closeModalHandler())
    }

    function Backdrop(){
        return <div className='fixed top-0 left-0 h-[100vh] w-full bg-black opacity-80'/>
    }

    function changeSubmissionHandler(e){

        console.log('Hello..this is form submission function')
        e.preventDefault();
    }

    function OverLay(){
        return <section className='absolute bg-[#EDEDF4] rounded-[4px] p-4 w-[25%] h-[85vh] mt-14 ml-[36%]'>
            <div className='flex justify-end'>
                <FaX size={14} className='mr-1 hover:cursor-pointer' onClick={closeModalHandler}/>
            </div>
            
            <p className='mt-16'>Edit agents</p>

            <form className='mt-4' onSubmit={changeSubmissionHandler}>
                <div>
                    <p className='font-inter text-[12px]'>Name</p>
                    <input
                        type='text'
                        value={enteredName}
                        onChange={enteredNameHandler}
                        onFocus={() => setNameFocused(true)}
                        onBlur={() => setNameFocused(false)}
                        className={`mt-2 px-3 py-2 text-[12px] w-full rounded border`}
                        placeholder='Adrian Kamau'
                    />
                </div>

                <div className='mt-4'>
                    <p className='font-inter text-[12px]'>Email</p>
                    <input
                        // value={enteredEmail}
                        onChange={enteredEmailHandler}
                        // onFocus={() => setEmailIsFocused(true)}
                        // onBlur={() => setEmailIsFocused(false)}
                        placeholder='kamauadrian312@gmail.com'
                        className={`mt-2 px-3 py-2 text-[12px] w-full rounded border`}
                    />
                </div>
                
                <div className='mt-4'>
                    <p className='font-inter text-[12px]'>Email</p>
                    <select className='mt-2 px-3 py-2 text-[12px] w-full rounded'>
                        <option>active</option>
                        <option>inactive</option>
                    </select>
                </div>
                
                <div className='mt-4'>
                    <p className='font-inter text-[12px]'>Subscription Type</p>
                    <select className='mt-2 px-3 py-2 text-[12px] w-full rounded'>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Daily</option>
                    </select>
                </div>

                <div className='mt-6 flex justify-end'>
                    <button className='bg-[#425E91] px-4 rounded-full py-1 text-white text-[13px]'>Update</button>
                </div>

            </form>
        </section>
    }

    return <React.Fragment>
        {isModalShown && REACTDOM.createPortal(<Backdrop/>, document.getElementById("backdrop"))} 
        {isModalShown && REACTDOM.createPortal(<OverLay/>, document.getElementById("overlay"))} 
    </React.Fragment>
}