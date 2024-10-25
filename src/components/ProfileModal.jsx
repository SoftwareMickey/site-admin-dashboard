import REACTDOM from 'react-dom'
import { FaX } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux'
import { portalActions } from '../store';
import { FaUser } from 'react-icons/fa';

import { MdKeyboardArrowRight } from "react-icons/md";
import { GoShieldLock } from "react-icons/go";
import { CiUnlock } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";

export default function ProfileModal(){

    const isModalShown = useSelector(state => state.portal.isProfileModalOpen);

    const dispatch = useDispatch();

    function closeModalHandler(){
        dispatch(portalActions.closeProfileModal())
    }

    function openProfileHandler(){
        dispatch(portalActions.closeProfileModal())
        dispatch(portalActions.openProfileHandler())
    }

    function Backdrop(){
        return <div className='fixed top-0 left-0 h-[100vh] w-full bg-black opacity-80'/>
    }

    function OverLay(){
        return <div className='absolute bg-[#EDEDF4] rounded-[4px] p-4 w-[25%] h-[70vh] mt-20 ml-[36%]'>
            <div className='flex'>
                <FaX size={14} className='mr-1 hover:cursor-pointer' onClick={closeModalHandler}/>
            </div>
            
            <p className='mt-4 font-barlow'>Profile</p>

            <div className='mt-4'>
                <div>
                    <div className='flex justify-center flex-col items-center mr-4'>
                        <div className='border px-8 py-8 rounded-full border-slate-500 w-[20%] bg-[#D9D9D9]'>
                            <FaUser className='hidden'/>
                        </div>
                        <p className='font-barlow text-[12px] flex items-center'>Tony Mwirigi</p>
                    </div>
                    <div className='flex justify-center'>
                        <button className='font-roboto text-[13px] text-[#65558F] font-semibold border border-slate-500 px-4 py-1 rounded-full mt-8' onClick={openProfileHandler}>Edit Profile</button>
                    </div>
                </div>

                <div className='mt-4'>
                    <div className='flex justify-between hover:cursor-pointer'>
                        <div className='flex'>
                            <GoShieldLock className='text-[#65558F]'/>
                            <p className='font-inter text-[13px] ml-2'>Manage Subscriptions</p>
                        </div>
                        <MdKeyboardArrowRight className='flex justify-end text-[#65558F]'/>
                    </div>
                    <hr className='border mt-2'/>
                </div>

                <div className='mt-6'>
                    <div className='flex justify-between hover:cursor-pointer'>
                        <div className='flex'>
                            <CiUnlock className='text-[#65558F]'/>
                            <p className='font-inter text-[13px] ml-2'>Change password</p>
                        </div>
                        <MdKeyboardArrowRight className='text-[#65558F]'/>
                    </div>
                    <hr className='border mt-2'/>
                </div>

                <div className='mt-6'>
                    <div className='flex justify-between hover:cursor-pointer'>
                        <div className='flex'>
                            <AiOutlineLogout className='text-[#65558F]'/>
                            <p className='font-inter text-[13px] ml-2'>Logout</p>
                        </div>
                        <MdKeyboardArrowRight className='text-[#65558F]'/>
                    </div>
                    <hr className='border mt-2'/>
                </div>
            </div>
        </div>
    }

    return <div>
        {isModalShown && REACTDOM.createPortal(<Backdrop/>, document.getElementById("backdrop"))} 
        {isModalShown && REACTDOM.createPortal(<OverLay/>, document.getElementById("overlay"))} 
    </div>
}