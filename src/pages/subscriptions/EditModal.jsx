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

    const [emailActivation, setEmailActivation] = useState('active');
    const [isEmailActivatorValid, setEmailActivatorIsValid] = useState(false);
    const [emailActivatorIsFocused, setEmailActivatorIsFocused] = useState(false)
    
    const [subscriptionActivation, setSubscriptionActivation] = useState('basic');
    const [isSubscriptionActivatorValid, setSubscriptionActivatorIsValid] = useState(false);
    const [subscriptionActivatorIsFocused, setSubscriptionActivatorIsFocused] = useState(false)

    const [formIsValid, setFormIsValid] = useState(false);

    const dispatch = useDispatch();

    function closeModalHandler(){
        dispatch(portalActions.closeModalHandler())
    }

    function emailActivationHandler(e){
        setEmailActivation(e.target.value)
        
        if(e.target.value.trim() !== ''){
            setEmailActivatorIsValid(true)
            console.log('Email activator has been validated...!')
        }
    }

    function subscriptionActivationHandler(e){
        setSubscriptionActivation(e.target.value)
        
        if(e.target.value.trim() !== ''){
            setSubscriptionActivatorIsValid(true)
            console.log('Subscription activator has been validated...!')
        }
    }

    useEffect(() => {
        if(isEmailActivatorValid && isSubscriptionActivatorValid){
            setFormIsValid(true);

            console.log('Form is valid....useeffect verification..!')
        }
    }, [isEmailActivatorValid, isSubscriptionActivatorValid])

    // Todo: Implement a submitHandler to the database
    async function handleSubmissionHandler(e){
        e.preventDefault()
        console.log('clicked..!')


        console.log({
            isActivated: emailActivation,
            subscription: subscriptionActivation
        })

        setAgentsToBeEdited((prev) => ({...prev, status: emailActivation, type: subscriptionActivation}))

        console.log(`Agent to be edited: ${agentToBeEdited.name}`)

        dispatch(portalActions.updateAgentHandler({
            agent: {
                name: agentToBeEdited.name, 
                email: agentToBeEdited.email, 
                status: emailActivation, 
                type: subscriptionActivation},
            id: agentToBeEdited.id
        }))
        // Todo: Implement a functionality to close the new task modal
        
        closeModalHandler()
    }

    return <dialog open = {isOpen} id="modal">
        <div className='absolute bg-[#EDEDF4] rounded-[4px] p-4 w-[25%] h-[60vh] mt-20 ml-[36%]'>
            <div className='flex justify-end'>
                <FaX size={14} className='mr-1 hover:cursor-pointer' onClick={closeModalHandler}/>
            </div>
            
            <p className='mt-16 font-inter'>Would you like to edit subscription of this account</p>

            <form className='mt-4' onSubmit={handleSubmissionHandler}>

                <div className='mt-4'>
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
                </div>

                <div className='mt-6 flex justify-end'>
                    <button className='bg-[#425E91] px-4 rounded-full py-1 text-white text-[13px]'>Update</button>
                </div>
            </form>
            
        </div>
    </dialog>
}