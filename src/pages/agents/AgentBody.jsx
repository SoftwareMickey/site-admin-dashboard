import AgentsTable from "./AgentsTable";
import PaginationHandler from "./PaginationPage";

export default function AgentsBody(){
    return <section className="w-[80%]">
        <AgentsTable/>
        <PaginationHandler/>
    </section>
}