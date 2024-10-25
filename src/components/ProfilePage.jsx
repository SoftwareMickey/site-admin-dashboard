import { useDispatch, useSelector } from "react-redux";
import { portalActions } from "../store";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoShieldLock } from "react-icons/go";
import { CiUnlock } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { FaX } from 'react-icons/fa6';

export default function ProfilePage(){

    const dispatch = useDispatch();
    const userName = useSelector(state => state.profile.userName);
    
    const userImage = useSelector(state => state.profile.savedImage);

    function closeModalHandler(){
        dispatch(portalActions.closeProfileModal())
    }

    function openProfileHandler(){
        dispatch(portalActions.closeProfileModal())
        dispatch(portalActions.openProfileHandler())
    }

    return <div className='w-full'>
        <div className='flex justify-end'>
            <FaX size={14} className='mr-1 hover:cursor-pointer' onClick={closeModalHandler}/>
        </div>
        
        <p className='mt-4 font-inter text-center mr-4'>Profile</p>

        <div className='mt-4'>
            <div>
                <div className='flex justify-center flex-col items-center mr-4'>
                    <div className=''>
                        <img src={userImage} alt='pic' className='h-20 w-20 flex border rounded-full'/>
                    </div>
                    <p className='font-barlow text-[12px] flex items-center'>{userName}</p>
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