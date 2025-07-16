import { ModeToggle } from "@/components/ModeToggle";
import PromptSection from "@/components/PromptSection";

export default function Home() {
  return (
    <div className="h-screen overflow-y-hidden">
    <div className="flex items-center px-4 py-2">
        <div className="ml-auto">
          <ModeToggle />
         </div>
        </div>  
      <PromptSection/>
    </div>
  );
}