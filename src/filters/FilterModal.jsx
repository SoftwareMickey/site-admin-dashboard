import REACTDOM from 'react-dom'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaX } from 'react-icons/fa6';
import { filterActions } from '../store/filter';


export default function FilterModal({sortByNameHandler, sortByStatusHandler, sortByTypeHandler}){

    const isFilterModalOpen = useSelector(state => state.filter.isFilterModalOpen);
    const dispatch = useDispatch()

    function Backdrop(){
        return <div className='fixed top-0 left-0 h-max bg-black opacity-10'/>
    }

    function closeModalHandler(){
        dispatch(filterActions.closeFilterModal())
    }

    function OverLay(){
        return <section className='absolute bg-[white] rounded border w-[15%] h-[25vh] ml-[80%] mt-[12%]'>
            <div className='flex justify-between'>
                <p className='font-inter text-[14px] ml-2 mt-2 mb-2'>Sort by</p>
                <FaX className='mt-2 mr-2 text-slate-600 hover:cursor-pointer' size={12} onClick={closeModalHandler}/>
            </div>
            <div>
                <button className='mb-1 border-b w-full text-start p-2 text-[13px]' onClick={sortByNameHandler}>Name</button>
                <button className='mb-1 border-b w-full text-start p-2 text-[13px]' onClick={sortByStatusHandler}>Subscription Status</button>
                <button className='mb-1 w-full text-start p-2 text-[13px]' onClick={sortByTypeHandler}>Subscription Type</button>
            </div>
        </section>
    }

    return <React.Fragment>
        {isFilterModalOpen && REACTDOM.createPortal(<Backdrop/>, document.getElementById("backdrop"))} 
        {isFilterModalOpen && REACTDOM.createPortal(<OverLay/>, document.getElementById("overlay"))} 
    </React.Fragment>
}