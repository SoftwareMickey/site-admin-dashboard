import { GoArrowUpLeft } from "react-icons/go";

export default function MetricsBar({title, price, analysis, color}){
    return <div className={`${color} w-[30%] p-2 rounded-[8px] mr-4`}>
        <p className="text-[14px] font-barlow">{title}</p>
        <p className="mt-2 font-barlow text-[28px]">KES {price}</p>
        <div className="text-[12px] flex mt-4 font-barlow">
            <GoArrowUpLeft className="mt-1 text-blue-500 font-bold"/>
            <p>{analysis}</p>
            <p className="ml-1">vs last month</p>
        </div>
    </div>
}