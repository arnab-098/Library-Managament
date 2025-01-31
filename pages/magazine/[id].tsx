"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils";
import { Pdf } from "@/types";
import { Document, Page } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Initialize pdfjs worker
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface IProps {
  magazineDetails: Pdf;
}

const Detail = ({ magazineDetails }: IProps) => {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Any initialization if needed
    setLoading(false);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  }

  function onDocumentLoadError(): void {
    setError("Failed to load PDF. Please try again.");
    setLoading(false);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    if (pageNumber == 2) {
      changePage(-1);
    }
    if (pageNumber > 2) {
      changePage(-2);
    }
  }

  function nextPage() {
    if (pageNumber == 1) {
      changePage(1);
    } else if (pageNumber < numPages - 1) {
      changePage(2);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl">Loading PDF...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="pdf-container w-full max-w-4xl">
        <Document
          file={magazineDetails.magazine_pdf?.asset?.url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-xl">Loading PDF...</div>
            </div>
          }
        >
          <div className="flex flex-col md:flex-row justify-center gap-2">
            <div onClick={previousPage} className="cursor-pointer">
              <Page
                key={`page_${pageNumber}`}
                pageNumber={pageNumber}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                scale={1}
                className="pdf-page-canvas"
              />
            </div>
            {pageNumber + 1 <= numPages && pageNumber > 1 && (
              <div onClick={nextPage} className="cursor-pointer">
                <Page
                  key={`page_${pageNumber + 1}`}
                  pageNumber={pageNumber + 1}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  scale={1}
                  className="pdf-page-canvas"
                />
              </div>
            )}
          </div>
        </Document>
      </div>

      <div className="mt-6 flex gap-4 justify-center items-center w-full">
        <button
          className="px-6 py-2 bg-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-800 transition-colors"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {pageNumber} of {numPages}
        </span>
        <button
          className="px-6 py-2 bg-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-800 transition-colors"
          disabled={pageNumber >= numPages - 1}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/post/${id}`);
  return {
    props: { magazineDetails: res.data },
  };
};

export default Detail;
