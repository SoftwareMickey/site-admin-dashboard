import { useDispatch, useSelector } from "react-redux";
import { portalActions } from "../../store";
import { useEffect, useState } from "react";

import search from './assets/search.png';
import { CiFilter } from "react-icons/ci";
import { LuTrash } from "react-icons/lu";
import { filterActions } from "../../store/filter";
import FilterModal from "../../filters/FilterModal";

export default function AgentsTable(){
 const dispatch = useDispatch();
      // Sample data for the table
 const agentsData = useSelector(state => state.portal.agents)
 const [data, setData] = useState([]);

 useEffect(() => {
  setData(agentsData)
 }, [agentsData])

 const [searchedAgent, setSearchedAgent] = useState('');
 const [isSearchFocused, setIsSearchFocused] = useState(false);

 const [selectedRows, setSelectedRows] = useState([])

 function searchHandler(e){
     setSearchedAgent(e.target.value)

     console.log(`Searched Value: ${e.target.value}`)
     searchFunctionality()

     if(e.target.value.trim() === ''){
      setData(agentsData)
     }
 }
 
 function searchFunctionality(){
     console.log(`agent searching has started...!`)

     const filteredItems = data.filter((repo) => repo.name.toLowerCase().includes(searchedAgent.toLowerCase()))
     setData(filteredItems)
     console.log(`Searched Agents: ${filteredItems}`)
 }

  function openModal(id){

    dispatch(portalActions.openModalHandler(id))
  }

  function openSuspendModal(){
    dispatch(portalActions.openSuspendModal())
  }

  // * Dispatch filter options
  function filterActionsHandler(){
    dispatch(filterActions.openFilterModal())
  }

  // * Sort functions
  function sortByNameHandler(){
    const sortedAgents = [...agentsData].sort((a, b) => a.name.localeCompare(b.name));

    console.log(`Sorted Data: ${sortedAgents}`)
    for(const val of sortedAgents){
        console.log(val)
    }

    setData(sortedAgents)
    dispatch(portalActions.sortHandler(sortedAgents))
    dispatch(filterActions.closeFilterModal())
  }

  function sortBySubscriptionStatus(){
    const sortedAgents = [...agentsData].sort((a, b) => a.status.localeCompare(b.status));

    console.log(`Sorted Data: ${sortedAgents}`)
    for(const val of sortedAgents){
        console.log(val)
    }

    setData(sortedAgents)
    dispatch(portalActions.sortHandler(sortedAgents))
    dispatch(filterActions.closeFilterModal())
  }

  function sortBySubscriptionType(){
    const sortedAgents = [...agentsData].sort((a, b) => a.type.localeCompare(b.type));

    console.log(`Sorted Data: ${sortedAgents}`)
    for(const val of sortedAgents){
        console.log(val)
    }

    setData(sortedAgents)
    dispatch(portalActions.sortHandler(sortedAgents))
    dispatch(filterActions.closeFilterModal())
  }

  // * Implement deletion feature
  function addSelectedRowHandler(id){
    console.log(`Received ID: ${id}`);

    console.log(selectedRows)
    // ! check if row index already exist
    const isIdExisting = selectedRows.find(agentID => agentID === id);

    if(isIdExisting){
      const toDeleteItems = selectedRows.filter(agentID => agentID !== id);
      setSelectedRows(toDeleteItems)
    }else{
      setSelectedRows(prevSelectedRows => [...prevSelectedRows, id]);
    }
  }

  // * Handling delete sequence
  function deleteAgentHandler(){
    const remainingAgentsAfterDeletion = agentsData.filter((agent) => !selectedRows.includes(agent.id))
    setData(remainingAgentsAfterDeletion)

    dispatch(portalActions.sortHandler(remainingAgentsAfterDeletion))
  }

  console.log(selectedRows)

    return <section className="mt-10 w-[100%] ml-6">
      <FilterModal 
        sortByNameHandler={sortByNameHandler} 
        sortByStatusHandler={sortBySubscriptionStatus}
        sortByTypeHandler={sortBySubscriptionType}
      />
      <div className="flex ml-2 mt-16 justify-between w-full mb-14">
          <p className="font-poppins text-[16px] font-[500]">Agents</p>
          <div className='flex'>
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
                <CiFilter className='mr-3 hover:cursor-pointer mt-1' onClick={filterActionsHandler}/>
                <LuTrash className='mr-3 cursor-pointer mt-1' onClick={deleteAgentHandler}/>
            </div>
        </div>
      </div>

        <table className="w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-slate-100">
            <tr className="font-poppins text-[13px] font-[500]">
                <th className="border border-gray-300 px-4 py-2">
                <input type="checkbox"/>
                </th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Subscription Status</th>
                <th className="border border-gray-300 px-4 py-2">Subscription Type</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
            </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100 font-poppins text-[12px]">
                <td className="border border-gray-300 px-4 py-2 text-center">
                    <input 
                      type="checkbox"
                      onChange={() => addSelectedRowHandler(item.id)}
                    />
                </td>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                <td className="border border-gray-300 px-4 py-2">{item.status}</td>
                <td className="border border-gray-300 px-4 py-2">{item.type}</td>
                <td className="border border-gray-300 px-4 py-2 font-poppins text-[12px]">
                    <button className="text-blue-500 px-3 py-1 rounded mr-2" onClick={() => openModal(item.id)}>Edit</button>
                    <button className="text-blue-500 px-3 py-1 rounded" onClick={openSuspendModal}>Suspend</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
}