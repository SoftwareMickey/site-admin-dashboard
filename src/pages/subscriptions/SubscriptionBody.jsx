import PaginationHandler from "../agents/PaginationPage";
import WelcomeText from "../home/WelcomeText";
import MetricsBar from "./MetricsBars";
import SubscriptionTable from "./SubscriptionTable";

export default function SubscriptionBody(){
    return <section className="p-2 w-full">
        <WelcomeText/>

        <div className="flex ml-6 mt-10">
            <MetricsBar
                title="Daily Subscription"
                price={150}
            />
            <MetricsBar
                title="Weekly Subscription"
                price={450}
            />
            <MetricsBar
                title="Monthly Subscription"
                price={1450}
            />
        </div>

        <SubscriptionTable/>
        <div className="mr-8">
            <PaginationHandler/>
        </div>
    </section>
}