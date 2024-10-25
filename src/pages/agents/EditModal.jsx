import { useEffect, useState } from 'react';
import './styles/tasks.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { portalActions } from '../../store';
import { FaX } from 'react-icons/fa6';


export default function EditModal({isOpen}){

    const foundAgents = useSelector(state => state.portal.foundAgent);
    const [agentToBeEdited, setAgentsToBeEdited] = useState({});

    useEffect(() => {
        setAgentsToBeEdited(foundAgents[0])
        console.log(`Agents Found: ${foundAgents}`)
    }, [foundAgents])

    const [userName, setUserName] = useState('');
    const [isNameFocused, setNameIsFocused] = useState(false);
    const [isNameValid, setNameIsValid] = useState(false);
    
    const [userEmail, setUserEmail] = useState('');
    const [isEmailFocused, setEmailIsFocused] = useState(false);
    const [isEmailValid, setEmailIsValid] = useState(false);

    const [formIsValid, setFormIsValid] = useState(false);

    const dispatch = useDispatch();

    function closeModalHandler(){
        dispatch(portalActions.closeModalHandler())
    }

    // * Function handlers
    function nameHandler(e){
        setUserName(e.target.value);

        if(e.target.value.trim().length > 2){
            console.log('Name is...valid...!')
            setNameIsValid(true)
        }
    }

    function emailHandler(e){
        setUserEmail(e.target.value);

        if(e.target.value.trim().includes('@gmail.com')){
            setEmailIsValid(true)
            console.log(`Email is....valid!`)
        }
    }

    useEffect(() => {
        if(isNameValid && isEmailValid){
            setFormIsValid(true);

            console.log('Form is valid....useeffect verification..!')
        }
    }, [isNameValid, isEmailValid])

    // Todo: Implement a submitHandler to the database
    async function handleSubmissionHandler(e){
        e.preventDefault()
        console.log('clicked..!')

        if(formIsValid){
            console.log('Form is Valid...!')

            console.log({
                name : userName,
                email: userEmail
            })

            setAgentsToBeEdited((prev) => ({...prev, name: userName, email: userEmail}))

            console.log(`Agent to be edited: ${agentToBeEdited.name}`)

            dispatch(portalActions.updateAgentHandler({
                agent: {name: userName, email: userEmail, status: agentToBeEdited.status, type: agentToBeEdited.type},
                id: agentToBeEdited.id
            }))

            // * clear the form after successful update
            setUserName('')
            setUserEmail('')
        }
        // Todo: Implement a functionality to close the new task modal
        closeModalHandler();
    }

    return <dialog open = {isOpen} id="modal">
        <div className='absolute bg-[#EDEDF4] rounded-[4px] p-4 w-[25%] h-[60vh] mt-20 ml-[36%]'>
            <div className='flex justify-end'>
                <FaX size={14} className='mr-1 hover:cursor-pointer' onClick={closeModalHandler}/>
            </div>
            
            <p className='mt-16 font-barlow'>Edit agents details</p>

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
                        className={`mt-2 px-3 py-2 text-[12px] w-full rounded ${isNameFocused? 'outline-none border border-[#425E91]' : ''} ${isNameValid? 'border-green-500' : 'border-red-200'}`}
                    />
                </div>

                <div className='mt-4'>
                    <p className='font-barlow text-[12px]'>Email</p>
                    <input
                        type='text'
                        value={userEmail}
                        onChange={(e) => emailHandler(e)}
                        onFocus={() => setEmailIsFocused(true)}
                        onBlur={() => setEmailIsFocused(false)}
                        placeholder='kamauadrian312@gmail.com'
                        className={`mt-2 px-3 py-2 text-[12px] w-full rounded ${isEmailFocused? 'outline-none border border-[#425E91]' : ''} ${isEmailValid? 'bg-white border-green-500' : 'border-red-200'}`}
                    />
                </div>

                {/* <div className='mt-4'>
                    <p className='font-inter text-[12px]'>Subscription Status</p>
                    <select className={`mt-2 px-3 py-2 text-[12px] w-full rounded ${emailActivatorIsFocused? 'outline-none border border-[#425E91]' : ''} ${isEmailActivatorValid? 'border-green-500' : 'border-red-200'}`} 
                        value={emailActivation} 
                        onChange={emailActivationHandler}
                        onBlur={() => setEmailActivatorIsFocused(false)}
                        onFocus={() => setEmailActivatorIsFocused(true)}>
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                    </select>
                </div>
                
                <div className='mt-4'>
                    <p className='font-inter text-[12px]'>Subscription Type</p>
                    <select className={`mt-2 px-3 py-2 text-[12px] w-full rounded ${subscriptionActivatorIsFocused? 'outline-none border border-[#425E91]' : ''} ${isSubscriptionActivatorValid? 'border-green-500' : 'border-red-200'}`}
                        value={subscriptionActivation} 
                        onChange={subscriptionActivationHandler}
                        onBlur={() => setSubscriptionActivatorIsFocused(false)}
                        onFocus={() => setSubscriptionActivatorIsFocused(true)}>
                        <option value="Basic">Basic</option>
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                    </select>
                </div> */}

                <div className='mt-6 flex justify-end'>
                    <button className='bg-[#425E91] px-4 rounded-full py-1 text-white text-[13px]'>Update</button>
                </div>
            </form>
            
        </div>
    </dialog>
}