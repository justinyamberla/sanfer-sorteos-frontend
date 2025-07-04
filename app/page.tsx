import MainSection from "@/components/home/MainSection";
import InstructionsSection from "@/components/home/InstructionsSection";
import TicketsPurchaseSection from "@/components/home/TicketsPurchaseSection";
import AwardsSection from "@/components/home/AwardsSection";
import TicketCheckSection from "@/components/home/TicketCheckSection";
import AdsSection from "@/components/home/AdsSection";
import LastActivitiesSection from "@/components/home/LastActivitiesSection";
import FinishedActivitySection from "@/components/home/FinishedActivitySection";
import { getActividadActual } from "@/services/ActividadService";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import NoActivitySection from "@/components/home/NoActivitySection";

export default function Home() {

    const data = getActividadActual();

    return (
        <div className="min-vh-100 w-100 container">
            <Suspense fallback={<Loading />}>
                <MainSection actividad={data} />
            </Suspense>
            <AdsSection />
            <LastActivitiesSection />
        </div>
    );
}
