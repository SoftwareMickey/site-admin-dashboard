import { useLocation } from "react-router";
import DashboardLinks from "../../routes/DashboardLinks";
import AgentsBody from "./AgentBody";
import DashboardHeader from "../../DashboardHeader";
import SuspendModal from "./SuspendModal";
import EditModal from "./EditModal";
import { useSelector } from "react-redux";
import ProfilePage from "../../components/ProfilePage";
import ProfilePageHandler from "../../components/ProfilePageHandler";

export default function Agents(){

    const location = useLocation();

    const showAgents = location.pathname === '/agents';
    const isModalShown = useSelector(state => state.portal.isSuspendModalOpen);
    const isEditModalShown = useSelector(state => state.portal.isModalOpen);

    
    const isModal2Shown = useSelector(state => state.portal.isProfileModalOpen);
    const isEdit2ModalShown = useSelector(state => state.portal.isProfileHandlerOpen);

    return <section>
        <EditModal isOpen={isEditModalShown}/>
        <SuspendModal isOpen={isModalShown}/>

        <div className="border-b h-[8vh] p-2">
            <DashboardHeader/>
        </div>

        <div className="flex">
            <div className={`flex w-[80%] ${isModal2Shown || isEdit2ModalShown? 'w-[80%]' : 'w-full'}`}>
                <DashboardLinks height='h-[90vh]'/>
                {showAgents && <AgentsBody/>}
            </div>
            <div className={`h-[90vh] border-l p-4 w-[20%] ${isModal2Shown || isEdit2ModalShown? 'w-[20%]' : 'hidden'}`}>
                {isModal2Shown && <ProfilePage/>}
                {isEdit2ModalShown && <ProfilePageHandler/>}
            </div>
        </div>
    </section>
}