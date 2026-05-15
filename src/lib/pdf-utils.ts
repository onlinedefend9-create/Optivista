import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { pdf } from "@react-pdf/renderer";
import React from "react";

export const generatePDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdfInstance = new jsPDF("p", "mm", "a4");
  const imgProps = pdfInstance.getImageProperties(imgData);
  const pdfWidth = pdfInstance.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdfInstance.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdfInstance.save(`${filename}.pdf`);
};

export const downloadPDF = async (documentComponent: React.ReactElement, filename: string) => {
  const blob = await pdf(documentComponent).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};
