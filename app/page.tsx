import MainSection from "@/components/home/MainSection";
import InstructionsSection from "@/components/home/InstructionsSection";
import TicketsPurchaseSection from "@/components/home/TicketsPurchaseSection";
import AwardsSection from "@/components/home/AwardsSection";
import TicketCheckSection from "@/components/home/TicketCheckSection";
import AdsSection from "@/components/home/AdsSection";
import LastActivitiesSection from "@/components/home/LastActivitiesSection";
import FinishedActivitySection from "@/components/home/FinishedActivitySection";
import { getActividades } from "@/services/ActividadService";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export default function Home() {

    const data = getActividades();

    return (
        <div className="min-vh-100 w-100 container">
            <Suspense fallback={<Loading />}>
                <MainSection actividad={data} />
            </Suspense>
            <FinishedActivitySection />
            <InstructionsSection />
            <TicketsPurchaseSection />
            <AwardsSection />
            <TicketCheckSection />
            <AdsSection />
            <LastActivitiesSection />
        </div>
    );
}
