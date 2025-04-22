import { DetailedReport } from "../logic/profile";
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
 * Generates a PDF report based on the DetailedReport type
 * 
 * This function serves as an adapter for the legacy code,
 * allowing it to use the new DetailedReport format without
 * having to change all the calling code at once.
 */
export const generatePDFReport = (profile: DetailedReport): jsPDF => {
  // Simply pass through to the detailed report generator
  return generateDetailedPDFReport(profile);
};

/**
 * Generates a PDF report from the new DetailedReport type
 */
export const generateDetailedPDFReport = (report: DetailedReport): jsPDF => {
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
  doc.text(`Overall Compatibility: ${report.overall.toUpperCase()}`, margin, 70);
  
  // Add description
  doc.setFontSize(12);
  doc.text(report.snapshot, margin, 80, { 
    maxWidth: contentWidth,
    align: "left"
  });
  
  // Get current y position
  let yPos = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 100;
  
  // Add Archetype and Attachment Style
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Key Profile Metrics", margin, yPos);
  
  yPos += 10;

  // Add primary archetype
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Your Primary Archetype: ${report.primaryArchetype}`, margin, yPos);
  
  yPos += 10;
  
  // Add attachment style
  doc.text(`Attachment Style: ${report.attachment}`, margin, yPos);
  
  yPos += 10;
  
  // Add MBTI type
  doc.text(`MBTI Type: ${report.mbti}`, margin, yPos);
  
  yPos += 20;
  
  // Add Personality Traits Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Personality Traits", margin, yPos);
  
  yPos += 10;
  
  // Create personality traits table
  const personalityTraits = Object.entries(report.bigFive).map(([trait, score]) => {
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
  const strengthsData = report.flags.positives.map(strength => [strength]);
  const cautionsData = report.flags.cautions.map(caution => [caution]);
  const growthData = report.flags.growth.map(growth => [growth]);
  
  // Strengths table
  autoTable(doc, {
    startY: yPos,
    head: [["Your Relationship Strengths"]],
    body: strengthsData,
    margin: { left: margin, right: margin },
    headStyles: { fillColor: [120, 80, 60] } // Green color
  });
  
  yPos = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : yPos + 60;
  
  // Cautions table
  autoTable(doc, {
    startY: yPos,
    head: [["Caution Areas"]],
    body: cautionsData,
    margin: { left: margin, right: margin },
    headStyles: { fillColor: [40, 80, 60] } // Yellow color
  });
  
  yPos = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : yPos + 60;
  
  // Growth table
  autoTable(doc, {
    startY: yPos,
    head: [["Growth Areas"]],
    body: growthData,
    margin: { left: margin, right: margin },
    headStyles: { fillColor: [345, 85, 55] } // Primary color
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
  doc.text(report.growthPlan, margin, yPos, { 
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
  doc.text(report.partnerSummary, margin, yPos, { 
    maxWidth: contentWidth,
    align: "left"
  });
  
  yPos += 30;
  
  // Add dating mission
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Try This In Real Life", margin, yPos);
  
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(report.datingMission, margin, yPos, { 
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
  report.matches.idealPartners.forEach((type, index) => {
    doc.text(`• ${type}`, margin + 5, yPos + (index * 7));
  });
  
  yPos += 10 + (report.matches.idealPartners.length * 7);
  
  // Challenging matches
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Challenging Matches:", margin, yPos);
  
  yPos += 10;
  
  doc.setFont("helvetica", "normal");
  report.matches.trickyPartners.forEach((type, index) => {
    doc.text(`• ${type}`, margin + 5, yPos + (index * 7));
  });
  
  yPos += 10 + (report.matches.trickyPartners.length * 7);
  
  // Compatibility rationale
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Why:", margin, yPos);
  
  yPos += 10;
  
  doc.setFont("helvetica", "normal");
  doc.text(report.matches.why, margin, yPos, { 
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
export const downloadPDFReport = (profile: DetailedReport) => {
  const doc = generatePDFReport(profile);
  
  // Generate a filename
  const filename = `WhoToDate_Compatibility_Report_${new Date().toISOString().split('T')[0]}.pdf`;
  
  // Save the PDF
  doc.save(filename);
};

/**
 * Generates and downloads a PDF from the new DetailedReport type
 */
export const downloadDetailedPDFReport = (report: DetailedReport) => {
  const doc = generateDetailedPDFReport(report);
  
  // Generate a filename
  const filename = `WhoToDate_Detailed_Report_${new Date().toISOString().split('T')[0]}.pdf`;
  
  // Save the PDF
  doc.save(filename);
};

/**
 * Combined approach - downloads a PDF for the DetailedReport
 * 
 * This simplified function exists for backward compatibility with code that
 * might have been using the earlier dual-format approach.
 */
export const downloadCombinedPDFReport = (report: DetailedReport) => {
  // Now we always use the DetailedReport format
  downloadDetailedPDFReport(report);
};