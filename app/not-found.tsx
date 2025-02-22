"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <section>
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="w-full lg:w-1/2">
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn&apos;t exist. Here are
            some helpful links:
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Button variant="outline" onClick={() => router.back()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <span className="ml-2">Go back</span>
            </Button>

            <Button asChild>
              <Link href="/">Take me home</Link>
            </Button>
          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <Image
            width={500}
            height={500}
            className="w-full max-w-lg lg:mx-auto"
            src="/images/404.svg"
            alt="not-found"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
