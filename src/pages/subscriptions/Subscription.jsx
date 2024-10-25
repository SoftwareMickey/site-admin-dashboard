import { useSelector } from "react-redux";
import DashboardHeader from "../../DashboardHeader";
import DashboardLinks from "../../routes/DashboardLinks";
import SubscriptionBody from "./SubscriptionBody";
import EditModal from "./EditModal";
import ProfilePage from "../../components/ProfilePage";
import ProfilePageHandler from "../../components/ProfilePageHandler";
import MetricsModal from "./MetricsModal";

export default function Subscription(){

    const isEditModalShown = useSelector(state => state.portal.isModalOpen);
    const isMetricsModalShown = useSelector(state => state.portal.isMetricsModalOpen);

    const isModalShown = useSelector(state => state.portal.isProfileModalOpen);
    const isEdit2ModalShown = useSelector(state => state.portal.isProfileHandlerOpen);

    return <section>
        <EditModal isOpen={isEditModalShown}/>
        <MetricsModal isOpen={isMetricsModalShown}/>

        <div className="border-b h-[8vh] p-2">
            <DashboardHeader/>
        </div>

        <div className="flex">
            <div className={`flex ${isModalShown || isEdit2ModalShown? 'w-[80%]' : 'w-full'}`}>
                <DashboardLinks height='h-[90vh]'/>
                 <SubscriptionBody/>
            </div>
            <div className={`h-[90vh] border-l p-4 w-[20%] ${isModalShown || isEdit2ModalShown? 'w-[20%]' : 'hidden'}`}>
                {isModalShown && <ProfilePage/>}
                {isEdit2ModalShown && <ProfilePageHandler/>}
            </div>
        </div>
    </section>
}