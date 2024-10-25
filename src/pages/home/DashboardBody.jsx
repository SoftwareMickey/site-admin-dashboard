import D3SubscriptionPerformanceChart from "./D3Chart";
import MetricsBar from "./MetricsBars";
import MonthDropdown from "./MonthDropdown";
import WelcomeText from "./WelcomeText";
import YearDropdown from "./YearDropdown";

export default function DashboardBody(){
    return <section className="w-[85%] p-2 h-[92vh]">
        <WelcomeText/>
        <div className="mt-6 ml-8 flex">
            <MetricsBar
                color="bg-blue-200"
                title="Subscription performance"
                price="25,550"
                analysis="+12.5%"
            />
            <MetricsBar
                color="bg-blue-50"
                title="Onboarded agents"
                price="452"
                analysis="+2.5%"
            />
            <MetricsBar
                color="bg-blue-50"
                title="Active agents"
                price="320"
                analysis="+2.5%"
            />
        </div>
        <div className="mt-6 ml-8 bg-[#F9F9FF] h-[90vh] p-2 rounded-[8px] shadow-custom flex justify-between flex-col">
            <div className="flex justify-between">
                <div>
                    <p className="font-barlow text-[14px] mt-2 ml-2">Subscription performance analytics</p>
                </div>
                <div className="mt-2 mr-2">
                    <MonthDropdown/>
                    <YearDropdown/>
                </div>
            </div>
            {/* <SubscriptionPerformanceChart/> */}
            <D3SubscriptionPerformanceChart/>
        </div>
    </section>
}