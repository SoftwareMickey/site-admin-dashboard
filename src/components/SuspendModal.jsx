import REACTDOM from 'react-dom'
import { FaX } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux'
import { portalActions } from '../store';
import { useState } from 'react';

export default function SuspendModal(){

    const [userName, setUserName] = useState('');
    const [isNameFocused, setNameIsFocused] = useState(false);
    const [isNameValid, setNameIsValid] = useState(false);
    

    const isModalShown = useSelector(state => state.portal.isSuspendModalOpen);

    const dispatch = useDispatch();

    function closeModalHandler(){
        dispatch(portalActions.closeSuspendModal())
    }

    // * Function handlers
    function nameHandler(e){
        setUserName(e.target.value);
    }

    function Backdrop(){
        return <div className='fixed top-0 left-0 h-[100vh] w-full bg-black opacity-80'/>
    }

    function submitHandler(e){
        e.preventDefault()
    }

    function OverLay(){
        return <div className='absolute bg-[#EDEDF4] rounded-[4px] p-4 w-[25%] h-[70vh] mt-20 ml-[36%]'>
            <div className='flex justify-end'>
                <FaX size={14} className='mr-1 hover:cursor-pointer' onClick={closeModalHandler}/>
            </div>
            
            <p className='mt-16 font-barlow'>Would you like to suspend this account</p>

            <form className='mt-4' onSubmit={submitHandler}>
                <div>
                    <p className='font-barlow text-[12px]'>Name</p>
                    <input
                        type='text'
                        value={userName}
                        onChange={(e) => nameHandler(e)}
                        placeholder='Adrian Kamau'
                        className='mt-2 px-3 py-2 text-[12px] w-full rounded'
                    />
                </div>

                <div className='mt-4'>
                    <p className='font-barlow text-[12px]'>Email</p>
                    <input
                        placeholder='kamauadrian312@gmail.com'
                        className='mt-2 px-3 py-2 text-[12px] w-full rounded'
                    />
                </div>

                <div className='mt-4'>
                    <p className='font-barlow text-[12px]'>Suspend until?</p>
                    <input
                        placeholder='kamauadrian312@gmail.com'
                        className='mt-2 px-3 py-2 text-[12px] w-full rounded'
                        type='date'
                    />
                </div>
                
                <div className='mt-6 flex justify-end'>
                    <button className='bg-[#425E91] px-4 rounded-full py-1 text-white text-[13px]'>Confirm Suspension</button>
                </div>

            </form>
        </div>
    }

    return <div>
        {isModalShown && REACTDOM.createPortal(<Backdrop/>, document.getElementById("backdrop"))} 
        {isModalShown && REACTDOM.createPortal(<OverLay/>, document.getElementById("overlay"))} 
    </div>
}