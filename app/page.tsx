import MainSection from "@/components/home/MainSection";
import InstructionsSection from "@/components/home/InstructionsSection";
import TicketsPurchaseSection from "@/components/home/TicketsPurchaseSection";
import AwardsSection from "@/components/home/AwardsSection";
import TicketCheckSection from "@/components/home/TicketCheckSection";
import AdsSection from "@/components/home/AdsSection";
import LastActivitiesSection from "@/components/home/LastActivitiesSection";

export default function Home() {
    return (
        <div className="min-vh-100 w-100 container">
            <MainSection />
            <InstructionsSection />
            <TicketsPurchaseSection />
            <AwardsSection />
            <TicketCheckSection />
            <AdsSection />
            <LastActivitiesSection />
        </div>
    );
}
