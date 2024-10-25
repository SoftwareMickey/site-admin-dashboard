import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { portalActions } from "../../store";

export default function SubscriptionTable(){

      // Sample data for the table
  const agentsData = useSelector(state => state.portal.agents)
  const [data, setData] = useState([]);
     
  useEffect(() => {
    setData(agentsData)
  }, [agentsData])

  const dispatch = useDispatch();
  
  function openModal(id){
    dispatch(portalActions.openSubscriptionModalHandler(id))
  }

    return <section className="mt-10 w-[95%] ml-6">
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
            <tr key={Math.floor(Math.random() * 1000000000000)} className="hover:bg-gray-100 font-poppins text-[12px]">
                <td className="border border-gray-300 px-4 py-2 text-center">
                    <input type="checkbox"/>
                </td>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                <td className="border border-gray-300 px-4 py-2">{item.status}</td>
                <td className="border border-gray-300 px-4 py-2">{item.type}</td>
                <td className="border border-gray-300 px-4 py-2 font-poppins text-[12px] self-center items-center">
                    <button className="text-blue-500 px-3 py-1 rounded mr-2" onClick={() => openModal(item.id)}>Edit</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
}