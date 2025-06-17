import MainSection from "@/components/home/MainSection";
import InstructionsSection from "@/components/home/InstructionsSection";

export default function Home() {
    return (
        <div className="min-vh-100 w-100 container">
            <MainSection />
            <InstructionsSection />
        </div>
    );
}
