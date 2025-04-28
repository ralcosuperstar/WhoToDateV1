import { type DetailedReport } from "../logic/profile";
import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * Generates and downloads a PDF report based on the user's compatibility profile
 * @param profile The detailed compatibility report 
 */
export const downloadPDFReport = (profile: DetailedReport): void => {
  // Create a new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
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
  
  // Add compatibility overview section
  doc.setFontSize(16);
  doc.setTextColor(50, 50, 50);
  doc.text("Compatibility Overview", 20, 42);
  
  // Add compatibility badge info
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  const compatibilityText = profile.overall === 'green' 
    ? 'High Compatibility'
    : profile.overall === 'yellow'
      ? 'Balanced Compatibility'
      : 'Complex Compatibility';
  doc.text(compatibilityText, 20, 52);
  
  // Add snapshot description
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  const wrappedSnapshot = doc.splitTextToSize(profile.snapshot, pageWidth - 40);
  doc.text(wrappedSnapshot, 20, 60);
  
  // Add key personality info
  let yPos = 75;

  // Add personality type
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text("Your Personality Profile", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(232, 58, 142);
  doc.text(`Primary Archetype: ${profile.primaryArchetype}`, 25, yPos);
  yPos += 7;
  
  doc.setTextColor(50, 50, 50);
  doc.text(`Attachment Style: ${profile.attachment}`, 25, yPos);
  yPos += 7;
  
  doc.text(`MBTI Type: ${profile.mbti}`, 25, yPos);
  yPos += 15;
  
  // Big Five Traits Table
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text("Your Big Five Personality Traits", 20, yPos);
  yPos += 10;
  
  const bigFiveData = [
    ["Trait", "Score"],
    ["Openness", `${Math.round(profile.bigFive.openness)}%`],
    ["Conscientiousness", `${Math.round(profile.bigFive.conscientiousness)}%`],
    ["Extraversion", `${Math.round(profile.bigFive.extraversion)}%`],
    ["Agreeableness", `${Math.round(profile.bigFive.agreeableness)}%`],
    ["Emotional Stability", `${100 - Math.round(profile.bigFive.neuroticism)}%`]
  ];
  
  // @ts-ignore - jspdf-autotable types are not correctly recognized
  doc.autoTable({
    startY: yPos,
    head: [bigFiveData[0]],
    body: bigFiveData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [232, 58, 142], textColor: [255, 255, 255] },
    margin: { left: 20, right: 20 },
    styles: { overflow: 'linebreak' },
    columnStyles: { 0: { fontStyle: 'bold' } }
  });
  
  // @ts-ignore - getting the last position after the table
  yPos = doc.lastAutoTable.finalY + 15;
  
  // Add compatibility insights section
  doc.setFontSize(16);
  doc.setTextColor(50, 50, 50);
  doc.text("Relationship Insights", 20, yPos);
  yPos += 10;
  
  // Strengths and Challenges
  doc.setFontSize(12);
  doc.setTextColor(50, 50, 50);
  doc.text("Your Relationship Strengths:", 20, yPos);
  yPos += 7;
  
  profile.flags.positives.forEach((strength, index) => {
    doc.setFontSize(10);
    doc.text(`• ${strength}`, 25, yPos);
    yPos += 6;
  });
  
  yPos += 5;
  doc.setFontSize(12);
  doc.text("Areas for Growth:", 20, yPos);
  yPos += 7;
  
  profile.flags.growth.forEach((growth, index) => {
    doc.setFontSize(10);
    doc.text(`• ${growth}`, 25, yPos);
    yPos += 6;
  });
  
  // Check if we need a new page for the partner compatibility
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  } else {
    yPos += 10;
  }
  
  // Add partner compatibility section
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text("Your Ideal Partner", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  const wrappedPartnerSummary = doc.splitTextToSize(profile.partnerSummary, pageWidth - 40);
  doc.text(wrappedPartnerSummary, 20, yPos);
  yPos += wrappedPartnerSummary.length * 6 + 5;
  
  // Ideal Partners
  doc.setFontSize(11);
  doc.setTextColor(50, 50, 50);
  doc.text("Ideal Qualities in a Partner:", 20, yPos);
  yPos += 7;
  
  profile.matches.idealPartners.forEach((quality, index) => {
    doc.setFontSize(10);
    doc.text(`• ${quality}`, 25, yPos);
    yPos += 6;
  });
  
  // Check if we need a new page for the final section
  if (yPos > 240) {
    doc.addPage();
    yPos = 20;
  } else {
    yPos += 10;
  }
  
  // Add growth plan
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text("Your Personal Growth Plan", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  const wrappedGrowthPlan = doc.splitTextToSize(profile.growthPlan, pageWidth - 40);
  doc.text(wrappedGrowthPlan, 20, yPos);
  yPos += wrappedGrowthPlan.length * 6 + 7;
  
  // Dating Mission
  doc.setFontSize(12);
  doc.setTextColor(232, 58, 142);
  doc.text("Your Dating Mission:", 20, yPos);
  yPos += 7;
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  const wrappedMission = doc.splitTextToSize(profile.datingMission, pageWidth - 40);
  doc.text(wrappedMission, 20, yPos);
  
  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `WhoToDate - Powered by Relationship Science - Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }
  
  // Save the PDF
  doc.save("WhoToDate-Compatibility-Report.pdf");
};