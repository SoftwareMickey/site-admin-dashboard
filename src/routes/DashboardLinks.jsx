import { NavLink } from "react-router-dom";

import dashboard from '../routes/assets/dashboard.png';
import agent from '../routes/assets/agent.png';
import sub from '../routes/assets/subscription.png';
import menu from '../routes/assets/menu.png';

export default function DashboardLinks({height}){

    return <section className={`w-[15%] border-r ${height}`}>
        
        <div className="h-[86vh]">
            <NavLink className={({isActive}) => isActive? 'text-blue-400 bg-blue-100 w-[100%] py-2 text-[14px] font-poppins flex px-4 mb-4' : 'w-[100%] py-2 text-[14px] font-poppins flex px-4 mb-4 hover:text-blue-400 hover:bg-blue-100'} to='../dashboard'>
                <img src={dashboard} className="h-4 mr-2" alt="pic"/>
                <p>Dashboard</p>
            </NavLink>
            
            <NavLink className={({isActive}) => isActive? 'text-blue-400 bg-blue-100 w-[100%] py-2 text-[14px] font-poppins flex px-4 mb-4' : 'w-[100%] py-2 text-[14px] font-poppins flex px-4 mb-4 hover:text-blue-400 hover:bg-blue-100'} to='../agents'>
                <img src={agent} className="h-4 mr-2" alt="pic"/>
                <p>Agents</p>
            </NavLink>

            <NavLink className={({isActive}) => isActive? 'text-blue-400 bg-blue-100 w-[100%] py-2 text-[14px] font-poppins flex px-4 mb-4' : 'w-[100%] py-2 text-[14px] font-poppins flex px-4 mb-4 hover:text-blue-400 hover:bg-blue-100'} to='../subscriptions'>
                <img src={sub} className="h-4 mr-2" alt="pic"/>
                <p>Subscriptions</p>
            </NavLink>
        </div>
        
        {/* <hr/> */}
        <div className="fixed bottom-2 px-4">
            <img src={menu} className='h-3' alt="pic"/>
        </div>
    </section>
}