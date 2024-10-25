import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { portalActions } from "../../store";

export default function MetricsBar({title, price}){

    const isModalShown = useSelector(state => state.portal.isProfileModalOpen);
    const isEditModalShown = useSelector(state => state.portal.isProfileHandlerOpen);

    const isMetricsAltered = useSelector(state => state.portal.isMetricsAlteredWith);
    const metricsPrice = useSelector(state => state.portal.metricsPrice);

    const dispatch = useDispatch();

    function openModal(){
        dispatch(portalActions.openMetricsModalHandler({
            title: title,
            price: price
        }))
      }

    return <div className={`w-[20%] p-2 rounded-[8px] ${isEditModalShown || isModalShown ? 'mr-28' : 'mr-40'} flex justify-between shadow-custom`}>
        <div>
            <p className="text-[14px] font-barlow">{title}</p>
            <p className="mt-2 font-barlow text-[28px]">KES {isMetricsAltered? metricsPrice : price}</p>
        </div>
        <div className="flex items-center mt-8">
            <FaEdit className="hover:cursor-pointer text-slate-600" onClick={openModal}/>
        </div>
    </div>
}