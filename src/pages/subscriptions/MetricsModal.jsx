import { useEffect, useState } from 'react';
import './styles/tasks.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { portalActions } from '../../store';
import { FaX } from 'react-icons/fa6';


export default function MetricsModal({isOpen}){

    const metricName = useSelector(state => state.portal.metricsName);
    const metricPrice = useSelector(state => state.portal.metricsPrice);

    const [amountActivation, setAmountActivation] = useState(0);
    const [isAmountActivatorValid, setAmountActivatorIsValid] = useState(false);
    const [AmountActivatorIsFocused, setAmountActivatorIsFocused] = useState(false);

    useEffect(() => {
        setAmountActivation(metricPrice)
    }, [metricPrice])

    console.log('Metrics Price: ', metricPrice);

    const [formIsValid, setFormIsValid] = useState(false);

    const dispatch = useDispatch();

    function closeModalHandler(){
        dispatch(portalActions.closeMetricsModalHandler())
    }

    function amountActivationHandler(e){
        setAmountActivation(e.target.value)
        
        if(e.target.value.trim() !== ''){
            setAmountActivatorIsValid(true)
            console.log('Amount activator has been validated...!')
        }
    }

    useEffect(() => {
        if(isAmountActivatorValid){
            setFormIsValid(true);

            console.log('Form is valid....useeffect verification..!')
        }
    }, [isAmountActivatorValid])

    // Todo: Implement a submitHandler to the database
    async function handleSubmissionHandler(e){
        e.preventDefault()
        console.log('clicked..!')

        if(formIsValid){
            console.log('Form is Valid...!')

            console.log({
                Amount: amountActivation
            })

            dispatch(portalActions.closeMetricsModalHandler(amountActivation))
        }
        // Todo: Implement a functionality to close the new task modal
        // closeHandler();
    }

    return <dialog open = {isOpen} id="modal">
        <div className='absolute bg-[#EDEDF4] rounded-[4px] p-4 w-[25%] h-[45vh] mt-20 ml-[36%]'>
            <div className='flex justify-end'>
                <FaX size={14} className='mr-1 hover:cursor-pointer' onClick={closeModalHandler}/>
            </div>
            
            <p className='mt-16 font-inter'>Edit Subscription Amount</p>

            <form className='mt-4' onSubmit={handleSubmissionHandler}>

                <div className='mt-4'>
                    <p className='font-inter text-[12px]'>{metricName}</p>
                    <input
                        value={amountActivation} 
                        onChange={amountActivationHandler}
                        onBlur={() => setAmountActivatorIsFocused(false)}
                        onFocus={() => setAmountActivatorIsFocused(true)}
                        className={`mt-2 px-3 py-2 text-[12px] w-full rounded ${AmountActivatorIsFocused? 'outline-none border border-[#425E91]' : ''} ${isAmountActivatorValid? 'border-green-500' : 'border-red-200'}`}
                        placeholder='Enter amount'
                    />
                </div>
                
                <div className='mt-6 flex justify-end'>
                    <button className='bg-[#425E91] px-4 rounded-full py-1 text-white text-[13px]'>Update</button>
                </div>
            </form>
            
        </div>
    </dialog>
}