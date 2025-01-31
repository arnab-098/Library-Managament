import { Pdf } from "@/types";
import React from "react";
import Masonry from "react-masonry-css";

import PdfCard from "./PdfCard";

interface IProps {
  pdfs: Pdf[];
}

const MasonryLayout = ({ pdfs }: IProps) => {
  const breakPointObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };

  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakPointObj}>
      {pdfs?.map((pdf) => <PdfCard magazine={pdf} key={pdf._id} />)}
    </Masonry>
  );
};

export default MasonryLayout;
