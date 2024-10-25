import { FaX } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { portalActions } from '../store';
import { useState } from 'react';
import { profileActions } from '../store/profile';

export default function ProfilePageHandler(){

    const dispatch = useDispatch();
    const savedUserName = useSelector(state => state.profile.userName);

    const [userName, setUserName] = useState(savedUserName);
    const [userEmail, setUserEmail] = useState('kamauadrian312@gmail.com');

    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    function closeModalHandler(){
        dispatch(portalActions.closeProfileHandler())
        dispatch(portalActions.openProfileModal())
    }

    function userNameHandler(e){
        setUserName(e.target.value)

        console.log(`New User Name: ${e.target.value}`)
    }

    function userEmailHandler(e){
        setUserEmail(e.target.value);

        console.log(`New User Email: ${e.target.value}`)
    }

    // * Updating function
    function updateProfileHandler(e){
        e.preventDefault();

        const data = {
            name: userName,
            email: userEmail
        }

        // * dispatch an action to update user name
        dispatch(profileActions.updateUserProfileHandler(userName))

        // after that close the modal
        closeModalHandler()

        console.log(`User Email: ${data.email}`)
        console.log(`User name: ${data.name}`)
    }

    // * Handle Image selection
    // State to manage the image source
    const userImage = useSelector(state => state.profile.savedImage);
    const defaultImage = useSelector(state => state.profile.defaultImage);

    const [imageSrc, setImageSrc] = useState(userImage); // Set default image path here

    // Handle file input change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            setImageSrc(newImageUrl); 
            
            //* Update the image source
            dispatch(profileActions.updateUserImageHandler(newImageUrl))
        }
    };

    // Handle image delete
    const handleDeleteImage = () => {
        setImageSrc(defaultImage); // Reset to default image (or set to empty)

        dispatch(profileActions.updateUserImageHandler(defaultImage))
    };

    return <div className='w-full'>
            <div className='flex justify-end'>
                <FaX size={14} className='mr-1 hover:cursor-pointer' onClick={closeModalHandler}/>
            </div>
            
            <p className='mt-4 font-inter text-center text-[14px]'>Edit Profile</p>

            <form className='mt-4' onSubmit={updateProfileHandler}>
                {/* <div>
                    <div className='flex flex-col self-center items-center'>
                        <img src={bg} alt='pic' className='h-20 w-20 flex'/>
                        <div className='ml-4 flex flex-col justify-center'>
                            <button className='font-roboto text-[13px] text-[#fff] font-semibold border border-slate-500 px-4 py-1 rounded-full mt-8 bg-[#425E91]'>Change picture</button>
                            <button className='font-roboto text-[13px] text-[#65558F] font-semibold border border-slate-500 px-4 py-1 rounded-full mt-8'>delete picture</button>
                        </div>
                    </div>
                </div> */}

                <div>
                    <div className='flex flex-col self-center items-center'>
                        <div className=''>
                            <img src={imageSrc} alt='pic' className='h-20 w-20 flex border rounded-full'/>
                        </div>
                        <div className='ml-4 flex flex-col justify-center'>
                        {/* Change Picture Button */}
                        <label className='font-roboto text-[13px] text-[#fff] font-semibold border border-slate-500 px-4 py-1 rounded-full mt-8 bg-[#425E91]'>
                            Change picture
                            <input type='file' className='hidden hover:cursor-pointer' accept='image/*' onChange={handleImageChange}/>
                        </label>

                        {/* Delete Picture Button */}
                        <button className='font-roboto text-[13px] text-[#65558F] font-semibold border border-slate-500 px-4 py-1 rounded-full mt-8' onClick={handleDeleteImage}>Delete picture</button>
                        </div>
                    </div>
                </div>

                <div className='mt-8'>
                    <p className='font-barlow text-[12px]'>Name</p>
                    <input
                        value={userName}
                        onChange={userNameHandler}
                        onFocus={() => setIsNameFocused(true)}
                        onBlur={() => setIsNameFocused(false)}
                        placeholder='Tony Mwirigi'
                        className={`mt-2 px-3 py-2 text-[12px] w-full rounded border border-slate-200 ${isNameFocused? 'outline-none border-[#425E91]' : ''}`}
                        type='text'
                    />
                </div>

                <div className='mt-4'>
                    <p className='font-barlow text-[12px]'>Email</p>
                    <input
                        value={userEmail}
                        onChange={userEmailHandler}
                        onFocus={() => setIsEmailFocused(true)}
                        onBlur={() => setIsEmailFocused(false)}
                        placeholder='kamauadrian312@gmail.com'
                        className={`mt-2 px-3 py-2 text-[12px] w-full rounded border border-slate-200 ${isEmailFocused? 'outline-none border-[#425E91]' : ''}`}
                    />
                </div>
                
                <div className='mt-8 flex justify-end'>
                    <button className='bg-[#425E91] px-4 rounded-full py-1 text-white text-[13px] font-[500]'>Update Profile</button>
                </div>
            </form>
    </div>
}