import logo from './assets/logo.png';
import bell from './assets/bell.png';

import { useDispatch, useSelector } from 'react-redux';
import { portalActions } from './store';

export default function DashboardHeader(){

    const dispatch = useDispatch();
    const userImage = useSelector(state => state.profile.savedImage);

    const isProfileChanged = useSelector(state => state.profile.isProfileChanged);

    function openProfileModalHandler(){
        dispatch(portalActions.openProfileModal())
    }

    const userName = useSelector(state => state.profile.userName);

    return <div className='flex justify-between'>
        <div className='flex'>
            <img src={logo} alt='pic' className='h-4 mr-2 mt-1'/>
            <p className='font-roboto text-[13px] mt-1 font-semibold text-blue-600'>Bingwa Admin</p>
        </div>

        <div className='flex mt-2 mr-8'>
            <img src={bell} className='h-4 mr-3'/>
            <div onClick={openProfileModalHandler} className='flex hover:cursor-pointer'>
                <img src={userImage} className='h-4 mr-1 hover:cursor-pointer'/>
                <p className='font-roboto text-[12px] font-[500]'>{userName}</p>
            </div>
        </div>
    </div>
}