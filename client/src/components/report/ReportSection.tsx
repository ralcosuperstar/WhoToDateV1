import { ReactNode } from 'react';

interface ReportSectionProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

const ReportSection = ({ title, children, icon }: ReportSectionProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        {icon && (
          <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
            {icon}
          </div>
        )}
        <h3 className="font-heading font-semibold text-xl">{title}</h3>
      </div>
      <div className="pl-0 sm:pl-11">
        {children}
      </div>
    </div>
  );
};

export default ReportSection;
