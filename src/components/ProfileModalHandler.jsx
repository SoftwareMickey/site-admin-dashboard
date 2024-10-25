import REACTDOM from 'react-dom'
import { FaX } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux'
import { portalActions } from '../store';

import bg from './assets/bg.png'

export default function ProfileModalHandler(){

    const isModalShown = useSelector(state => state.portal.isProfileHandlerOpen);

    const dispatch = useDispatch();

    function closeModalHandler(){
        dispatch(portalActions.closeProfileHandler())
        dispatch(portalActions.openProfileModal())
    }

    function Backdrop(){
        return <div className='fixed top-0 left-0 h-[100vh] w-full bg-black opacity-80'/>
    }

    function OverLay(){
        return <div className='absolute bg-[#EDEDF4] rounded-[4px] p-4 w-[30%] h-[68vh] mt-20 ml-[36%]'>
            <div className='flex'>
                <FaX size={14} className='mr-1 hover:cursor-pointer' onClick={closeModalHandler}/>
            </div>
            
            <p className='mt-4 font-barlow'>Edit Profile</p>

            <form className='mt-4'>
                <div>
                    <div className='flex'>
                        <img src={bg} alt='pic' className='h-20'/>
                        <div className='ml-4'>
                            <button className='font-roboto text-[13px] text-[#fff] font-semibold border border-slate-500 px-4 py-1 rounded-full mt-8 bg-[#425E91]'>Change picture</button>
                            <button className='font-roboto text-[13px] text-[#65558F] font-semibold border border-slate-500 px-4 py-1 rounded-full mt-8 ml-4'>delete picture</button>
                        </div>
                    </div>
                </div>

                <div className='mt-4'>
                    <p className='font-barlow text-[12px]'>Name</p>
                    <input
                        placeholder='Tony Mwirigi'
                        className='mt-2 px-3 py-2 text-[12px] w-full rounded'
                        type='text'
                    />
                </div>

                <div className='mt-4'>
                    <p className='font-barlow text-[12px]'>Email</p>
                    <input
                        placeholder='kamauadrian312@gmail.com'
                        className='mt-2 px-3 py-2 text-[12px] w-full rounded'
                    />
                </div>
                
                <div className='mt-6 flex'>
                    <button className='bg-[#425E91] px-4 rounded-full py-1 text-white text-[13px] font-[500]'>Update Profile</button>
                </div>
            </form>
        </div>
    }

    return <div>
        {isModalShown && REACTDOM.createPortal(<Backdrop/>, document.getElementById("backdrop"))} 
        {isModalShown && REACTDOM.createPortal(<OverLay/>, document.getElementById("overlay"))} 
    </div>
}