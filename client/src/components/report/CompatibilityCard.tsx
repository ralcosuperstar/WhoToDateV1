import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CompatibilityColor = 'green' | 'yellow' | 'red';

interface CompatibilityCardProps {
  color: CompatibilityColor;
  title: string;
  description: string;
  traits?: { name: string; value: number }[];
}

const CompatibilityCard = ({ color, title, description, traits }: CompatibilityCardProps) => {
  const colorClasses = {
    green: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-500',
      dot: 'bg-emerald-500',
      border: 'border-emerald-500',
      progress: 'bg-emerald-500'
    },
    yellow: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-500',
      dot: 'bg-amber-500',
      border: 'border-amber-500',
      progress: 'bg-amber-500'
    },
    red: {
      bg: 'bg-red-500/10',
      text: 'text-red-500',
      dot: 'bg-red-500',
      border: 'border-red-500',
      progress: 'bg-red-500'
    }
  };
  
  const selectedColor = colorClasses[color];
  
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardHeader className={`${selectedColor.bg}`}>
        <div className="flex items-center space-x-3">
          <div className={`h-10 w-10 rounded-full ${selectedColor.bg} border ${selectedColor.border} flex items-center justify-center`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className={`w-5 h-5 ${selectedColor.text}`}
            >
              {color === 'green' && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
              {color === 'yellow' && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              )}
              {color === 'red' && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              )}
            </svg>
          </div>
          <div>
            <CardTitle className="font-heading">
              <span className={selectedColor.text}>{color.charAt(0).toUpperCase() + color.slice(1)}</span> Compatibility
            </CardTitle>
            <p className="text-sm">{title}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <p className="mb-6 text-neutral-dark/80">
          {description}
        </p>
        
        {traits && traits.length > 0 && (
          <div className="space-y-4">
            {traits.map((trait, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{trait.name}</span>
                  <span>{trait.value}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                  <div 
                    className={`h-full ${selectedColor.progress} rounded-full`} 
                    style={{ width: `${trait.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompatibilityCard;
