import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface PersonalityTraitCardsProps {
  personalityTraits?: {
    openness?: number;
    conscientiousness?: number;
    extraversion?: number;
    agreeableness?: number;
    neuroticism?: number;
  };
  compatibilityColor: string;
}

const PersonalityTraitCards = ({ personalityTraits, compatibilityColor }: PersonalityTraitCardsProps) => {
  if (!personalityTraits) return null;

  const traitDescriptions = {
    openness: "Curiosity about new experiences and intellectual openness",
    conscientiousness: "Self-discipline, organization, and achievement-orientation",
    extraversion: "Sociability, assertiveness, and positive emotions",
    agreeableness: "Cooperation, compassion, and consideration",
    neuroticism: "Emotional stability and tendency to experience negative emotions"
  };

  const traitIcons = {
    openness: "🔍",
    conscientiousness: "📋",
    extraversion: "🎭",
    agreeableness: "🤝",
    neuroticism: "🌊"
  };

  const getTraitLevel = (value: number): string => {
    if (value >= 0.8) return "Very High";
    if (value >= 0.6) return "High";
    if (value >= 0.4) return "Moderate";
    if (value >= 0.2) return "Low";
    return "Very Low";
  };

  const getColorClass = (colorName: string): string => {
    switch (colorName.toLowerCase()) {
      case 'green':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'yellow':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'red':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getColorStyle = (colorName: string): React.CSSProperties => {
    switch (colorName.toLowerCase()) {
      case 'green':
        return { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' };
      case 'yellow':
        return { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)' };
      case 'red':
        return { backgroundColor: 'rgba(244, 63, 94, 0.1)', borderColor: 'rgba(244, 63, 94, 0.3)' };
      default:
        return { backgroundColor: 'rgba(107, 114, 128, 0.1)', borderColor: 'rgba(107, 114, 128, 0.3)' };
    }
  };

  const getProgressBarColor = (colorName: string): string => {
    switch (colorName.toLowerCase()) {
      case 'green':
        return 'bg-emerald-500';
      case 'yellow':
        return 'bg-amber-500';
      case 'red':
        return 'bg-rose-500';
      default:
        return 'bg-gray-500';
    }
  };

  const colorClass = getColorClass(compatibilityColor);
  const colorStyle = getColorStyle(compatibilityColor);
  const progressBarColor = getProgressBarColor(compatibilityColor);

  const traitEntries = Object.entries(personalityTraits).filter(
    ([key]) => ["openness", "conscientiousness", "extraversion", "agreeableness", "neuroticism"].includes(key)
  ) as [keyof typeof traitIcons, number][];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {traitEntries.map(([trait, value], index) => (
        <motion.div
          key={trait}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="h-full border shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <span className="mr-2 text-xl">{traitIcons[trait]}</span>
                <span className="capitalize">{trait}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span className="font-medium">{getTraitLevel(value)}</span>
                  <span className="text-muted-foreground">{Math.round(value * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${progressBarColor}`} 
                    style={{ width: `${Math.round(value * 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  {traitDescriptions[trait]}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PersonalityTraitCards;