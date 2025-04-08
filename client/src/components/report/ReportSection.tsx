import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ReportSectionProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const ReportSection = ({ 
  title, 
  children, 
  icon, 
  isExpanded = true, 
  onToggle 
}: ReportSectionProps) => {
  return (
    <div className="mb-8 border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
      <div 
        className={`flex items-center justify-between p-4 ${isExpanded ? 'bg-primary/10' : 'bg-white hover:bg-neutral-50'}`}
        onClick={onToggle}
        style={{ cursor: onToggle ? 'pointer' : 'default' }}
      >
        <div className="flex items-center">
          {icon && (
            <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
              {icon}
            </div>
          )}
          <h3 className="font-heading font-semibold text-xl">{title}</h3>
        </div>
        {onToggle && (
          <div className="text-neutral-dark/70">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        )}
      </div>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white"
          >
            <div className="p-4 sm:px-6 sm:py-5 pl-4 sm:pl-16">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportSection;
