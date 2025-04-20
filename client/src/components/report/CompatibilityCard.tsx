import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Trait {
  name: string;
  value: number;
}

interface CompatibilityCardProps {
  color: 'green' | 'yellow' | 'red';
  title: string;
  description: string;
  traits: Trait[];
}

const CompatibilityCard = ({ color, title, description, traits }: CompatibilityCardProps) => {
  const colorClasses = {
    green: {
      bgLight: 'bg-emerald-50',
      bgDark: 'bg-emerald-500',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      progress: 'bg-emerald-500',
    },
    yellow: {
      bgLight: 'bg-amber-50',
      bgDark: 'bg-amber-500',
      text: 'text-amber-600',
      border: 'border-amber-200',
      progress: 'bg-amber-500',
    },
    red: {
      bgLight: 'bg-rose-50',
      bgDark: 'bg-rose-500',
      text: 'text-rose-600',
      border: 'border-rose-200',
      progress: 'bg-rose-500',
    },
  };
  
  const classes = colorClasses[color];
  
  return (
    <Card className={`${classes.bgLight} ${classes.border} border shadow-sm`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className={`h-3 w-3 rounded-full ${classes.bgDark}`} />
          <span className={`font-semibold ${classes.text}`}>
            {color.charAt(0).toUpperCase() + color.slice(1)} Profile
          </span>
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {traits.map((trait, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{trait.name}</span>
                <span className="text-neutral-dark/70">{trait.value}%</span>
              </div>
              <Progress value={trait.value} className={classes.progress} />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-white/50 text-sm text-neutral-dark/80">
        <p>
          This profile indicates your natural relationship style based on your responses
          to our compatibility assessment.
        </p>
      </CardFooter>
    </Card>
  );
};

export default CompatibilityCard;