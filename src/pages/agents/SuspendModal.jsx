import { useEffect, useState } from 'react';
import './styles/tasks.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { portalActions } from '../../store';
import { FaX } from 'react-icons/fa6';


export default function SuspendModal({isOpen}){

    const [userName, setUserName] = useState('');
    const [isNameFocused, setNameIsFocused] = useState(false);
    const [isNameValid, setNameIsValid] = useState(false);
    
    const [userEmail, setUserEmail] = useState('');
    const [isEmailFocused, setEmailIsFocused] = useState(false);
    const [isEmailValid, setEmailIsValid] = useState(false);

    const [formDate, setFormDate] = useState('');
    const [dateIsValid, setDateIsValid] = useState(false);

    const [formIsValid, setFormIsValid] = useState(false);

    const dispatch = useDispatch();

    function closeModalHandler(){
        dispatch(portalActions.closeSuspendModal())
    }

    // * Function handlers
    function nameHandler(e){
        setUserName(e.target.value);

        if(e.target.value.trim().length > 5){
            console.log('Name is...valid...!')
            setNameIsValid(true)
        }
    }

    function emailHandler(e){
        setUserEmail(e.target.value);

        if(e.target.value.trim().includes('@gmail.com')){
            console.log(`Email is....valid!`)
            setEmailIsValid(true)
        }
    }

    function dateHandler(e){
        setFormDate(e.target.value)
        
        if(e.target.value.trim() !== ''){
            setDateIsValid(true)
            console.log('Date has been validated...!')
        }
    }

    useEffect(() => {
        if(isNameValid && isEmailValid && dateIsValid){
            setFormIsValid(true);

            console.log('Form is valid....useeffect verification..!')
        }
    }, [isNameValid, isEmailValid, dateIsValid])

    // Todo: Implement a submitHandler to the database
    async function handleSubmissionHandler(e){
        e.preventDefault()
        console.log('clicked..!')

        if(formIsValid){
            console.log('Form is Valid...!')
        }
        // Todo: Implement a functionality to close the new task modal
        // closeHandler();
    }

    return <dialog open = {isOpen} id="modal">
        <div className='absolute bg-[#EDEDF4] rounded-[4px] p-4 w-[25%] h-[70vh] mt-20 ml-[36%]'>
            <div className='flex justify-end'>
                <FaX size={14} className='mr-1 hover:cursor-pointer' onClick={closeModalHandler}/>
            </div>
            
            <p className='mt-16 font-barlow'>Would you like to suspend this account</p>

            <form className='mt-4' onSubmit={handleSubmissionHandler}>
                <div>
                    <p className='font-barlow text-[12px]'>Name</p>
                    <input
                        type='text'
                        value={userName}
                        onChange={(e) => nameHandler(e)}
                        onFocus={() => setNameIsFocused(true)}
                        onBlur={() => setNameIsFocused(false)}
                        placeholder='Adrian Kamau'
                        className={`mt-2 px-3 py-2 text-[12px] w-full rounded ${isNameFocused? 'outline-none border border-[#425E91]' : ''}`}
                    />
                </div>

                <div className='mt-4'>
                    <p className='font-barlow text-[12px]'>Email</p>
                    <input
                        type='email'
                        value={userEmail}
                        onChange={(e) => emailHandler(e)}
                        onFocus={() => setEmailIsFocused(true)}
                        onBlur={() => setEmailIsFocused(false)}
                        placeholder='kamauadrian312@gmail.com'
                        className={`mt-2 px-3 py-2 text-[12px] w-full rounded ${isEmailFocused? 'outline-none border border-[#425E91]' : ''}`}
                    />
                </div>

                <div className='mt-4'>
                    <p className='font-barlow text-[12px]'>Suspend until?</p>
                    <input
                        value={formDate}
                        onChange={dateHandler}
                        className='mt-2 px-3 py-2 text-[12px] w-full rounded'
                        type='date'
                    />
                </div>
                
                <div className='mt-6 flex justify-end'>
                    <button className='bg-[#425E91] px-4 rounded-full py-1 text-white text-[13px]'>Confirm Suspension</button>
                </div>
            </form>
            
        </div>
    </dialog>
}