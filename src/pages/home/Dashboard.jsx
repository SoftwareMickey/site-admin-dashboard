import { useLocation } from "react-router";
import DashboardLinks from "../../routes/DashboardLinks";
import DashboardBody from "./DashboardBody";
import DashboardHeader from "../../DashboardHeader";
import ProfilePage from "../../components/ProfilePage";
import ProfilePageHandler from "../../components/ProfilePageHandler";
import { useSelector } from "react-redux";


export default function Dashboard(){

    const location = useLocation();

    const showDashboard = location.pathname === '/dashboard';
    const isModalShown = useSelector(state => state.portal.isProfileModalOpen);
    const isEditModalShown = useSelector(state => state.portal.isProfileHandlerOpen);

    return <section>
        <div className="border-b h-[8vh] p-2">
            <DashboardHeader/>
        </div>

        <div className="flex">
            <div className={`flex w-[80%] ${isModalShown || isEditModalShown? 'w-[80%]' : 'w-full'}`}>
                <DashboardLinks height='h-[130vh]'/>
                {showDashboard && <DashboardBody/>}
            </div>
            <div className={`h-[130vh] border-l p-4 w-[20%] ${isModalShown || isEditModalShown? 'w-[20%]' : 'hidden'}`}>
                {isModalShown && <ProfilePage/>}
                {isEditModalShown && <ProfilePageHandler/>}
            </div>
        </div>
    </section>
}