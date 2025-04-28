import { type DetailedReport } from "../logic/profile";
import jsPDF from "jspdf";
// Import jspdf-autotable and get the plugin
import autoTable from 'jspdf-autotable';

// Define valid attachment style types based on the compatibility analysis
type AttachmentStyle = 'secure' | 'anxious' | 'avoidant' | 'fearful';

// Extend the jsPDF type to include properties added by autoTable
interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
  autoTable: typeof autoTable;
}

/**
 * Generates and downloads a comprehensive PDF report based on the user's compatibility profile
 * @param profile The detailed compatibility report 
 */
export const downloadEnhancedPDFReport = (profile: DetailedReport): void => {
  // Helper function to check if we need a new page
  const checkForNewPage = (doc: jsPDF, currentY: number, threshold: number = 240): number => {
    if (currentY > threshold) {
      doc.addPage();
      return 20; // Reset Y position to top of new page with margin
    }
    return currentY + 10; // Just add some space and continue
  };

  // Create a new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - 40; // 20px margins on each side
  
  // Add header with title and date
  doc.setFontSize(22);
  doc.setTextColor(232, 58, 142); // #e83a8e - primary pink color
  doc.text("WhoToDate Compatibility Report", pageWidth / 2, 20, { align: "center" });
  
  // Add generation date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  doc.text(`Generated on ${today}`, pageWidth / 2, 28, { align: "center" });

  // Add section divider
  doc.setDrawColor(232, 58, 142);
  doc.setLineWidth(0.5);
  doc.line(20, 32, pageWidth - 20, 32);
  
  // Title for overview section
  let yPos = 42;
  doc.setFontSize(18);
  doc.setTextColor(50, 50, 50);
  doc.text("Your Compatibility Overview", 20, yPos);
  yPos += 12;

  // Compatibility level badge
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  const compatibilityText = profile.overall === 'green' 
    ? 'High Compatibility Profile'
    : profile.overall === 'yellow'
      ? 'Balanced Compatibility Profile'
      : 'Complex Compatibility Profile';
  doc.text(compatibilityText, 20, yPos);
  yPos += 8;
  
  // Compatibility description
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  const wrappedSnapshot = doc.splitTextToSize(profile.snapshot, contentWidth);
  doc.text(wrappedSnapshot, 20, yPos);
  yPos += wrappedSnapshot.length * 5 + 10;
  
  // Top relationship strengths
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(20, yPos, contentWidth, 4 + (profile.flags.positives.length * 7), 3, 3, 'F');
  
  doc.setFontSize(13);
  doc.setTextColor(50, 50, 50);
  yPos += 5;
  doc.text("Your Top Relationship Strengths", 25, yPos);
  yPos += 7;
  
  profile.flags.positives.forEach((strength, index) => {
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`✓ ${strength}`, 25, yPos);
    yPos += 6;
  });
  
  yPos += 5;
  
  // Start of personality section
  yPos = checkForNewPage(doc, yPos, 240);
  
  doc.setFontSize(18);
  doc.setTextColor(50, 50, 50);
  doc.text("Your Personality Deep Dive", 20, yPos);
  yPos += 10;
  
  // MBTI Section with purple background
  doc.setFillColor(245, 240, 255); // Light purple
  doc.roundedRect(20, yPos, contentWidth, 60, 3, 3, 'F');
  
  doc.setFontSize(14);
  doc.setTextColor(100, 50, 150); // Dark purple
  yPos += 8;
  doc.text(`Your MBTI Personality Type: ${profile.mbti}`, 25, yPos);
  yPos += 7;
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  const mbtiDescription = `Your Myers-Briggs personality type reveals how you perceive the world and make decisions. The ${profile.mbti} type tends to be ${profile.mbti.includes('E') ? 'outgoing and energized by social interaction' : 'reflective and energized by alone time'}, and approaches problems in a ${profile.mbti.includes('N') ? 'big-picture, future-oriented' : 'detail-oriented, practical'} way.`;
  const wrappedMbti = doc.splitTextToSize(mbtiDescription, contentWidth - 10);
  doc.text(wrappedMbti, 25, yPos);
  yPos += wrappedMbti.length * 5 + 8;
  
  // Personality archetype
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text(`Your Personality Archetype: ${profile.primaryArchetype}`, 25, yPos);
  yPos += 7;

  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  const archetypeDescription = `Your dominant personality archetype combines ${profile.bigFive.openness > 70 ? 'high openness to new experiences' : 'practical groundedness'} with ${profile.bigFive.extraversion > 70 ? 'outgoing tendencies' : 'reflective tendencies'}, making you particularly skilled at forming connections.`;
  const wrappedArchetype = doc.splitTextToSize(archetypeDescription, contentWidth - 10);
  doc.text(wrappedArchetype, 25, yPos);
  
  yPos += wrappedArchetype.length * 5 + 15;
  
  // Big Five Section
  yPos = checkForNewPage(doc, yPos, 200);
  
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text("Your Big Five Personality Traits", 20, yPos);
  yPos += 10;
  
  // Big Five Traits Table
  const bigFiveData = [
    ["Trait", "Score", "Impact on Relationships"],
    ["Openness", `${Math.round(profile.bigFive.openness)}%`, profile.bigFive.openness > 70 ? "High curiosity and creativity" : "Practical and conventional approach"],
    ["Conscientiousness", `${Math.round(profile.bigFive.conscientiousness)}%`, profile.bigFive.conscientiousness > 70 ? "Organized and dependable" : "Flexible and spontaneous"],
    ["Extraversion", `${Math.round(profile.bigFive.extraversion)}%`, profile.bigFive.extraversion > 70 ? "Outgoing and energetic" : "Reserved and reflective"],
    ["Agreeableness", `${Math.round(profile.bigFive.agreeableness)}%`, profile.bigFive.agreeableness > 70 ? "Compassionate and cooperative" : "Direct and straightforward"],
    ["Emotional Stability", `${100 - Math.round(profile.bigFive.neuroticism)}%`, profile.bigFive.neuroticism < 30 ? "Calm and resilient" : "Sensitive and empathetic"]
  ];
  
  // Use the imported autoTable function with our document
  autoTable(doc, {
    startY: yPos,
    head: [bigFiveData[0]],
    body: bigFiveData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [232, 58, 142], textColor: [255, 255, 255] },
    margin: { left: 20, right: 20 },
    styles: { overflow: 'linebreak' },
    columnStyles: { 
      0: { fontStyle: 'bold', cellWidth: 45 },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 'auto' }
    }
  });
  
  // Get the final Y position after the table
  try {
    const docWithTable = doc as jsPDFWithAutoTable;
    // Access as any to avoid TypeScript errors
    const finalY = (docWithTable.lastAutoTable as any)?.finalY;
    yPos = finalY ? finalY + 15 : yPos + 65;
  } catch (e) {
    // If there's any error accessing the property, just move the position down
    yPos += 65;
  }
  
  // Attachment Style Section
  yPos = checkForNewPage(doc, yPos, 220);
  
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text("Your Attachment Style", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(13);
  doc.setTextColor(232, 58, 142); // Pink color
  doc.text(`${profile.attachment} Attachment`, 25, yPos);
  yPos += 7;
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  // Create description based on attachment style - using type-safe checks
  let attachmentDescription = '';
  if (profile.attachment === 'secure') {
    attachmentDescription = 'form stable, trusting bonds and communicate your needs clearly while respecting boundaries.';
  } else if (profile.attachment === 'anxious') {
    attachmentDescription = 'may worry about your partner\'s availability and seek frequent reassurance in relationships.';
  } else if (profile.attachment === 'avoidant') {
    attachmentDescription = 'value independence and may find it challenging to fully open up emotionally in relationships.';
  } else {
    attachmentDescription = 'have a combination of anxious and avoidant tendencies, sometimes seeking closeness while other times pulling away.';
  }
  
  const attachmentDesc = `With a ${profile.attachment} attachment style, you ${attachmentDescription}`;
  
  const wrappedAttachment = doc.splitTextToSize(attachmentDesc, contentWidth);
  doc.text(wrappedAttachment, 25, yPos);
  yPos += wrappedAttachment.length * 5 + 8;
  
  // Attachment strengths and challenges
  doc.setFontSize(11);
  doc.setTextColor(50, 50, 50);
  doc.text("Relationship Strengths:", 25, yPos);
  yPos += 7;
  
  // Create strengths based on attachment style in type-safe way
  let strengths: string[] = [];
  
  if (profile.attachment === 'secure') {
    strengths = [
      'Building trust and security',
      'Healthy communication patterns',
      'Creating balanced relationships'
    ];
  } else if (profile.attachment === 'anxious') {
    strengths = [
      'Deep emotional investment',
      'Strong loyalty and commitment',
      'Attentiveness to partner needs'
    ];
  } else if (profile.attachment === 'avoidant') {
    strengths = [
      'Respecting independence',
      'Self-reliance and stability',
      'Valuing personal space'
    ];
  } else {
    strengths = [
      'Emotional depth and awareness',
      'Understanding complex emotions',
      'Adaptability in relationships'
    ];
  }
  
  const attachmentStrengths = strengths;
  
  attachmentStrengths.slice(0, 3).forEach(strength => {
    if (strength) {
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(`• ${strength}`, 30, yPos);
      yPos += 6;
    }
  });
  
  yPos += 3;
  doc.setFontSize(11);
  doc.setTextColor(50, 50, 50);
  doc.text("Growth Opportunities:", 25, yPos);
  yPos += 7;
  
  // Create challenges based on attachment style in type-safe way
  let challenges: string[] = [];
  
  if (profile.attachment === 'secure') {
    challenges = [
      'Understanding partners with different attachment styles',
      'Supporting partners through their insecurities',
      'Maintaining patience with complex relationship dynamics'
    ];
  } else if (profile.attachment === 'anxious') {
    challenges = [
      'Managing fear of abandonment',
      'Building healthy independence',
      'Reducing overthinking in relationships'
    ];
  } else if (profile.attachment === 'avoidant') {
    challenges = [
      'Opening up emotionally',
      'Allowing healthy dependency',
      'Communicating needs clearly'
    ];
  } else {
    challenges = [
      'Resolving conflicting needs for closeness and distance',
      'Building consistent relationship patterns',
      'Developing trust and security'
    ];
  }
  
  const attachmentChallenges = challenges;
  
  attachmentChallenges.slice(0, 3).forEach(challenge => {
    if (challenge) {
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(`• ${challenge}`, 30, yPos);
      yPos += 6;
    }
  });
  
  // Compatibility Section
  doc.addPage();
  yPos = 20;
  
  doc.setFontSize(18);
  doc.setTextColor(50, 50, 50);
  doc.text("Your Compatibility Profile", 20, yPos);
  yPos += 12;
  
  // Relationship insights section
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text("Relationship Insights", 20, yPos);
  yPos += 10;
  
  // Strengths and Challenges in two columns
  const startY = yPos;
  let leftCol = yPos;
  let rightCol = yPos;
  
  // Left column: Strengths
  doc.setFontSize(12);
  doc.setTextColor(46, 125, 50); // Dark green
  doc.text("Your Relationship Strengths:", 20, leftCol);
  leftCol += 7;
  
  profile.flags.positives.forEach((strength, index) => {
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`• ${strength}`, 25, leftCol);
    leftCol += 6;
  });
  
  // Right column: Growth areas
  doc.setFontSize(12);
  doc.setTextColor(211, 47, 47); // Dark red
  doc.text("Areas for Growth:", pageWidth/2, rightCol);
  rightCol += 7;
  
  profile.flags.growth.forEach((growth, index) => {
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`• ${growth}`, pageWidth/2 + 5, rightCol);
    rightCol += 6;
  });
  
  // Move to after the longer of the two columns
  yPos = Math.max(leftCol, rightCol) + 10;
  
  // Partner compatibility section
  yPos = checkForNewPage(doc, yPos, 220);
  
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text("Your Ideal Partner", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  const wrappedPartnerSummary = doc.splitTextToSize(profile.partnerSummary, contentWidth);
  doc.text(wrappedPartnerSummary, 20, yPos);
  yPos += wrappedPartnerSummary.length * 5 + 8;
  
  // Ideal qualities in a partner
  doc.setFontSize(12);
  doc.setTextColor(50, 50, 50);
  doc.text("Ideal Qualities in a Partner:", 20, yPos);
  yPos += 7;
  
  // Set up two columns for ideal qualities
  const qualitiesPerColumn = Math.ceil(profile.matches.idealPartners.length / 2);
  let leftColY = yPos;
  let rightColY = yPos;
  
  profile.matches.idealPartners.forEach((quality, index) => {
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    
    if (index < qualitiesPerColumn) {
      // Left column
      doc.text(`• ${quality}`, 25, leftColY);
      leftColY += 6;
    } else {
      // Right column
      doc.text(`• ${quality}`, pageWidth/2 + 5, rightColY);
      rightColY += 6;
    }
  });
  
  // Move to after the longer of the two columns
  yPos = Math.max(leftColY, rightColY) + 5;
  
  // Compatibility with different attachment styles
  yPos = checkForNewPage(doc, yPos, 200);
  
  doc.setFontSize(12);
  doc.setTextColor(50, 50, 50);
  doc.text("Compatibility with Different Attachment Styles:", 20, yPos);
  yPos += 8;
  
  // Create compatibility table
  const compatibilityData = [
    ["Attachment Style", "Compatibility", "Key Insights"],
    ["Secure", profile.attachment === 'secure' ? "High" : "Good", "Balanced, healthy dynamics with clear communication"],
    ["Anxious", profile.attachment === 'secure' ? "Good" : profile.attachment === 'avoidant' ? "Challenging" : "Variable", "Needs reassurance and consistent emotional connection"],
    ["Avoidant", profile.attachment === 'secure' ? "Good" : profile.attachment === 'anxious' ? "Challenging" : "Variable", "Needs space and respects independence"],
  ];
  
  // Add compatibility table
  autoTable(doc, {
    startY: yPos,
    head: [compatibilityData[0]],
    body: compatibilityData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [232, 58, 142], textColor: [255, 255, 255] },
    margin: { left: 20, right: 20 },
    styles: { overflow: 'linebreak' },
    columnStyles: { 
      0: { fontStyle: 'bold', cellWidth: 40 },
      1: { cellWidth: 35, halign: 'center' },
      2: { cellWidth: 'auto' }
    }
  });
  
  // Get the final Y position after the table
  try {
    const docWithTable = doc as jsPDFWithAutoTable;
    // Access as any to avoid TypeScript errors
    const finalY = (docWithTable.lastAutoTable as any)?.finalY;
    yPos = finalY ? finalY + 15 : yPos + 40;
  } catch (e) {
    // If there's any error accessing the property, just move the position down
    yPos += 40;
  }
  
  // Growth Section
  doc.addPage();
  yPos = 20;
  
  doc.setFontSize(18);
  doc.setTextColor(50, 50, 50);
  doc.text("Your Personal Growth Path", 20, yPos);
  yPos += 12;
  
  // Development opportunities
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text("Personal Growth Plan", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  const wrappedGrowthPlan = doc.splitTextToSize(profile.growthPlan, contentWidth);
  doc.text(wrappedGrowthPlan, 20, yPos);
  yPos += wrappedGrowthPlan.length * 5 + 10;
  
  // Communication strategies
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text("Effective Communication Strategies", 20, yPos);
  yPos += 8;
  
  // Define communication strategies based on personality
  const communicationStrategies = [
    profile.bigFive.agreeableness > 70 ? "Express your needs directly while maintaining your natural empathy" : "Balance your directness with active listening",
    profile.bigFive.extraversion > 70 ? "Give partners space to share their thoughts" : "Challenge yourself to initiate important conversations",
    profile.attachment === 'anxious' ? "Practice self-soothing before seeking reassurance" : 
    profile.attachment === 'avoidant' ? "Share your need for space openly rather than withdrawing" :
    "Continue building on your healthy communication patterns",
    "Regular check-ins about relationship satisfaction help prevent issues"
  ];
  
  communicationStrategies.forEach((strategy, index) => {
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`${index + 1}. ${strategy}`, 25, yPos);
    yPos += 7;
  });
  
  yPos += 7;
  
  // Dating mission
  yPos = checkForNewPage(doc, yPos, 240);
  
  doc.setFontSize(14);
  doc.setTextColor(232, 58, 142);
  doc.text("Your Dating Mission", 20, yPos);
  yPos += 8;
  
  // Add a decorative box for the mission
  doc.setDrawColor(232, 58, 142);
  doc.setLineWidth(1);
  doc.roundedRect(20, yPos - 3, contentWidth, 28, 3, 3);
  
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.setFont('helvetica', 'italic');
  const wrappedMission = doc.splitTextToSize(profile.datingMission, contentWidth - 10);
  doc.text(wrappedMission, 25, yPos + 5);
  doc.setFont('helvetica', 'normal');
  
  // Add footer on each page
  // Using internal methods for pagination - access the pages array length
  try {
    // Cast to any to access internal properties safely
    const internal = (doc as any).internal;
    const pageCount = internal.pages ? internal.pages.length - 1 : 1;
    
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `WhoToDate - Powered by Relationship Science - Page ${i} of ${pageCount}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );
    }
  } catch (error) {
    console.error('Error adding footers to PDF:', error);
  }
  
  // Save the PDF
  doc.save("WhoToDate-Compatibility-Report.pdf");
};