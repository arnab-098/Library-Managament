import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { AiOutlineLogout } from 'react-icons/ai';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

import { IUser } from '../types';
import useAuthStore from '../store/authStore';
import { createOrGetUser } from '../utils';

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };


  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="text-4xl font-bold w-[100px] md:w-[130px]">
          MagzLink
        </div>
      </Link>
      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute md:static top-10 -left-20 bg-white'
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0'
            placeholder='Search magazines'
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {user ? (
          <div className='flex gap-5 md:gap-10'>
            {user.image && (
              <div>
                <Image
                  className='rounded-full'
                  src={user.image}
                  alt='user'
                  width={40}
                  height={40}
                />
              </div>
            )}
            <button
              type='button'
              className=' border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color='red' fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('Login Failed')}
          />
        )}
      </div>
    </div >
  );
};

export default Navbar;
