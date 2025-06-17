import MainSection from "@/components/home/MainSection";
import InstructionsSection from "@/components/home/InstructionsSection";
import TicketsSection from "@/components/home/TicketsSection";
import AwardsSection from "@/components/home/AwardsSection";
import TicketCheckSection from "@/components/home/TicketCheckSection";

export default function Home() {
    return (
        <div className="min-vh-100 w-100 container">
            <MainSection />
            <InstructionsSection />
            <TicketsSection />
            <AwardsSection />
            <TicketCheckSection />
        </div>
    );
}
