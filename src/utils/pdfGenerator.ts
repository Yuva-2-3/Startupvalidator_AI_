import jsPDF from 'jspdf';

export const generatePdf = (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found');
    return;
  }

  try {
    // Create a new PDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Extract text content from the element
    const textContent = element.innerText || element.textContent;

    // Set up PDF formatting
    const lineHeight = 10; // Line height in mm
    const margin = 20; // Margin in mm
    const pageWidth = pdf.internal.pageSize.getWidth(); // A4 width in mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // A4 height in mm
    let yPosition = margin; // Start position for text

    // Split text into lines that fit within the page width
    const lines = pdf.splitTextToSize(textContent, pageWidth - 2 * margin);

    // Add text to the PDF
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        // Add a new page if the current page is full
        pdf.addPage();
        yPosition = margin; // Reset yPosition for the new page
      }

      pdf.text(line, margin, yPosition);
      yPosition += lineHeight; // Move to the next line
    });

    // Save the PDF
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};