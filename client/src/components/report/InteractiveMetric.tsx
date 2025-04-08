import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InteractiveMetricProps {
  name: string;
  value: number;
  description: string;
  color?: string;
  icon?: React.ReactNode;
}

const InteractiveMetric = ({ 
  name, 
  value, 
  description, 
  color = "primary", 
  icon 
}: InteractiveMetricProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine color classes
  const getColorClasses = () => {
    if (color === "green") return "bg-emerald-500/10 text-emerald-500 border-emerald-500";
    if (color === "yellow") return "bg-amber-500/10 text-amber-500 border-amber-500";
    if (color === "red") return "bg-rose-500/10 text-rose-500 border-rose-500";
    return "bg-primary/10 text-primary border-primary";
  };

  return (
    <motion.div
      className={`relative rounded-lg ${getColorClasses()} border border-opacity-30 p-5 transition-all`}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {icon && <div className="mr-3">{icon}</div>}
          <h4 className="font-medium text-lg">{name}</h4>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-neutral-dark/70 hover:text-neutral-dark">
                <HelpCircle className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative h-6 bg-neutral-dark/10 rounded-full overflow-hidden">
        <motion.div
          className={color === "green" ? "bg-emerald-500" : 
                     color === "yellow" ? "bg-amber-500" : 
                     color === "red" ? "bg-rose-500" : "bg-primary"}
          style={{ width: `${value}%`, height: "100%" }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <div className="absolute inset-0 flex items-center justify-end pr-2">
          <span className="text-sm font-medium text-white drop-shadow">{value}%</span>
        </div>
      </div>

      <motion.div 
        className="mt-3 text-sm text-neutral-dark/80"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isHovered ? "auto" : 0,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {isHovered && <p>{description}</p>}
      </motion.div>
    </motion.div>
  );
};

export default InteractiveMetric;