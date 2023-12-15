import React, { useEffect, useRef, useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PDF() {
    const pdfRef = useRef<HTMLDivElement>(null);    
    
    const downloadPDF = () => {
        const input = pdfRef.current;
        if (!input) {
          console.error('PDF reference is not available');
          return;
        }
      
        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4', true);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          const imgX = (pdfWidth - imgWidth * ratio) / 2;
          const imgY = (pdfHeight - imgHeight * ratio) / 2;
      
          pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
          pdf.save('invoice.pdf');
        });
      };

    return (
      <>
        <div className="container mt-5 border p-5" ref={pdfRef}>
          <div className="row mb-4">
            <div className="col-6">
              <img src={require('../react.png')} alt="Logo" height={100} width={100} />
            </div>
            <div className="col-6 text-end">
              <h1>Invoice</h1>
            </div>
          </div>
          <div className="row mb-4">
            {/* Content for the second row goes here */}
          </div>
          <div className="row">
            {/* Content for the third row goes here */}
          </div>
          <div className="row">
            {/* Content for the fourth row goes here */}
          </div>
        </div>
        <div className="row text-center mt-5" >
            <button className="btn btn-primary" onClick={downloadPDF}>Download PDF</button>
            </div>
      </>
    );
  }