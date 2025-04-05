import { CompatibilityProfile } from "./compatibilityAnalysis";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

// Add the autotable type to jsPDF
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable?: {
      finalY: number;
    };
  }
}

/**
 * Generates a PDF report from the compatibility profile
 */
export const generatePDFReport = (profile: CompatibilityProfile): jsPDF => {
  // Create a new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  // Add a header
  doc.setFillColor(345, 85, 55); // primary color in HSL
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("WhoToDate Compatibility Report", margin, 25);
  
  // Add a subtitle
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Your personalized compatibility profile", margin, 35);
  
  // Add date
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric'
  });
  doc.text(`Generated on: ${dateStr}`, pageWidth - margin - 60, 35, { align: "right" });
  
  // Add summary section
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Profile Summary", margin, 60);
  
  // Add overall compatibility
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text(`Overall Compatibility: ${profile.overallColor.toUpperCase()}`, margin, 70);
  
  // Add description
  doc.setFontSize(12);
  doc.text(profile.description, margin, 80, { 
    maxWidth: contentWidth,
    align: "left"
  });
  
  // Get current y position
  let yPos = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 100;
  
  // Add Attachment and Personality Profiles
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Key Profile Metrics", margin, yPos);
  
  yPos += 10;

  // Add attachment style
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Attachment Style: ${profile.attachmentStyle}`, margin, yPos);
  
  yPos += 10;
  
  // Add personality type
  doc.text(`Personality Type: ${profile.mbtiStyle}`, margin, yPos);
  
  yPos += 20;
  
  // Add Personality Traits Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Personality Traits", margin, yPos);
  
  yPos += 10;
  
  // Create personality traits table
  const personalityTraits = Object.entries(profile.personalityTraits).map(([trait, score]) => {
    return [trait.charAt(0).toUpperCase() + trait.slice(1), `${score}%`];
  });
  
  autoTable(doc, {
    startY: yPos,
    head: [["Trait", "Score"]],
    body: personalityTraits,
    margin: { left: margin, right: margin },
    headStyles: { fillColor: [345, 85, 55] }
  });
  
  yPos = doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : yPos + 60;
  
  // Add Strengths & Challenges Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Strengths & Challenges", margin, yPos);
  
  yPos += 10;
  
  // Add Strengths & Challenges tables
  const strengthsData = profile.strengthsWeaknesses.strengths.map(strength => [strength]);
  const challengesData = profile.strengthsWeaknesses.challenges.map(challenge => [challenge]);
  
  // Strengths table
  autoTable(doc, {
    startY: yPos,
    head: [["Your Relationship Strengths"]],
    body: strengthsData,
    margin: { left: margin, right: margin },
    headStyles: { fillColor: [120, 80, 60] } // Green color
  });
  
  yPos = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : yPos + 60;
  
  // Challenges table
  autoTable(doc, {
    startY: yPos,
    head: [["Your Relationship Challenges"]],
    body: challengesData,
    margin: { left: margin, right: margin },
    headStyles: { fillColor: [40, 80, 60] } // Yellow color
  });
  
  // Add a new page for premium insights
  doc.addPage();
  
  // Add a header
  doc.setFillColor(345, 85, 55); // primary color in HSL
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Comprehensive Compatibility Insights", margin, 25);
  
  yPos = 60;
  
  // Add growth recommendation
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("What You Should Work On", margin, yPos);
  
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(profile.growthRecommendation || "", margin, yPos, { 
    maxWidth: contentWidth,
    align: "left"
  });
  
  yPos += 30;
  
  // Add ideal partner
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Your Ideal Match", margin, yPos);
  
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(profile.idealPartnerSummary || "", margin, yPos, { 
    maxWidth: contentWidth,
    align: "left"
  });
  
  yPos += 30;
  
  // Add dating experience
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Try This In Real Life", margin, yPos);
  
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(profile.datingExperience || "", margin, yPos, { 
    maxWidth: contentWidth,
    align: "left"
  });
  
  yPos += 30;
  
  // Add compatibility types
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Compatible Types", margin, yPos);
  
  yPos += 10;
  
  // Most compatible types
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Most Compatible With:", margin, yPos);
  
  yPos += 10;
  
  doc.setFont("helvetica", "normal");
  profile.compatibleTypes.mostCompatible.forEach((type, index) => {
    doc.text(`• ${type}`, margin + 5, yPos + (index * 7));
  });
  
  yPos += 10 + (profile.compatibleTypes.mostCompatible.length * 7);
  
  // Challenging matches
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Challenging Matches:", margin, yPos);
  
  yPos += 10;
  
  doc.setFont("helvetica", "normal");
  profile.compatibleTypes.challengingMatches.forEach((type, index) => {
    doc.text(`• ${type}`, margin + 5, yPos + (index * 7));
  });
  
  yPos += 10 + (profile.compatibleTypes.challengingMatches.length * 7);
  
  // Compatibility rationale
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Why:", margin, yPos);
  
  yPos += 10;
  
  doc.setFont("helvetica", "normal");
  doc.text(profile.compatibleTypes.compatibilityRationale, margin, yPos, { 
    maxWidth: contentWidth,
    align: "left"
  });
  
  // Add footer with contact info
  const footerText = "WhoToDate.com | Scientifically Matching Indian Singles | contact@whotodate.com";
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(footerText, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: "center" });
  
  return doc;
};

/**
 * Generates and downloads a PDF report from the compatibility profile
 */
export const downloadPDFReport = (profile: CompatibilityProfile) => {
  const doc = generatePDFReport(profile);
  
  // Generate a filename
  const filename = `WhoToDate_Compatibility_Report_${new Date().toISOString().split('T')[0]}.pdf`;
  
  // Save the PDF
  doc.save(filename);
};