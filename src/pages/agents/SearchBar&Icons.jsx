import { useState } from 'react';
import search from './assets/search.png';
import { CiFilter } from "react-icons/ci";
import { LuTrash } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { agentsActions } from '../../store/agents';


export default function SearchBarAndIcons(){

    const data = useSelector(state => state.agents.agents)

    const [searchedAgent, setSearchedAgent] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    function searchHandler(e){
        setSearchedAgent(e.target.value)

        console.log(`Searched Value: ${e.target.value}`)
        searchFunctionality()
    }
    
    function searchFunctionality(){
        console.log(`agent searching has started...!`)

        const filteredItems = data.filter((repo) => repo.name.toLowerCase().includes(searchedAgent.toLowerCase()))
        agentsActions.searchedAgentsHandler(filteredItems)
        console.log(`Searched Agents: ${filteredItems}`)
    }

    return <div className='flex'>
        <div className={`flex border mr-10 ${isSearchFocused? 'border-[midnightblue] rounded' : ''}`}>
            <input
                value={searchedAgent}
                onChange={searchHandler}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="input search text"
                className={`border-r px-4 font-poppins text-[14px] py-1 ${isSearchFocused? 'outline-none border-slate-300 rounded' : ''}`}
            />
            <img src={search} className='h-3 mt-2 px-2' alt='pic'/>
        </div>

        <div className='flex'>
            {/* <div className='bg-blue-500 pl-[10px] pt-1 mr-2 rounded-[2px]'>
                <IoMdAdd className='mr-3 text-white hover:cursor-pointer'/>
            </div> */}
            <CiFilter className='mr-3 hover:cursor-pointer mt-1'/>
            <LuTrash className='mr-3 cursor-pointer mt-1'/>
        </div>
    </div>
}