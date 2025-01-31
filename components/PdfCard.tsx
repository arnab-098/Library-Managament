import { Pdf } from "@/types";
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { urlFor } from "@/utils/client";
import Link from "next/link";
import { MdDownloadForOffline } from 'react-icons/md';

import useAuthStore from '../store/authStore';
import { IUser } from '../types';

interface IProps {
  magazine: Pdf;
}

const PdfCard: NextPage<IProps> = ({ magazine }: IProps) => {
  const [user, setUser] = useState<IUser | null>();
  const { userProfile } = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  return (
    <div className="p-2 cursor-pointer hover:opacity-70 relative">
      <Link href={`/magazine/${magazine._id}`}>
        <img
          className="rounded-lg w-full"
          src={urlFor(magazine.thumbnail.asset.url).width(250).url()}
          alt="magazine thumbnail"
        />
      </Link>
      <div>
        {user ? (
          <div className="absolute bottom-0 right-0 z-10 p-1 pr-5 pb-5">
            <a
              href={`${magazine.magazine_pdf.asset.url}?dl=`}
              download
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
            ><MdDownloadForOffline />
            </a>
          </div>
        ) : (<div></div>)}
      </div>
    </div>
  );
};

export default PdfCard;
