import { cn } from "@/lib/utils";

interface FloatingCardProps {
  className?: string;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "bg-white space-y-3 bg-opacity-50 backdrop:filter backdrop-blur-lg shadow-lg border border-opacity-15 border-white px-8 py-4 rounded-3xl absolute  flex flex-col justify-center items-center",
        className
      )}
    >
      <img src="/images/chicken-roasted.png" className="w-32" />
      <div>
        <h1 className="text-xl font-clashDisplayMedium">Soto ayam</h1>
        <p className="text-sm font-raleway text-center">Cita rasa solo</p>
      </div>
      <p className="text-[#FF5D47] font-clashDisplayMedium">15 Menit</p>
    </div>
  );
};

export default FloatingCard;
