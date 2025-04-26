/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import { useSharedState } from "@/app/StateProvider";
import { CgProfile } from "react-icons/cg";
import { CreateSession } from "@/app/actions";
import Payment from "./Payment";

export type SearchParams = {
  vehicleType: string;
  transmission: string;
  minPrice: number;
  maxPrice: number;
  from: Date;
  to: Date;
};

export type Product = {
  name: string;
  transmission: string;
  vehicleType: string;
  price: string;
};

export default function Navbar({ userId }: { userId: number | null }) {
  const { sharedState, setSharedState } = useSharedState();

  useEffect(() => {
    if (userId == null) return;
    if (sharedState.userId == null) {
      setSharedState({ ...sharedState, userId: userId });
    }
  }, [userId, sharedState, setSharedState]);
  const isLoggedIn = sharedState.userId != null;
  const [state, createSession, pending] = useActionState(CreateSession, {
    result: "Not_Asked",
  });

  return (
    <>
      {sharedState.isPaymentPageOpen && <Payment />}

      <nav
        className="flex items-center justify-center"
        style={{
          width: "100%",
          borderBottom: "1px grey solid",
          position: "sticky",
          top: 0,
          zIndex: 2,
        }}
      >
        <div
          className="flex items-center justify-between bg-white px-6 py-3"
          style={{ maxWidth: "1024px", width: "100%" }}
        >
          {/* Logo and Company Name */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                loading="eager"
              />
              <span className="text-lg font-bold text-gray-800">Rentify</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Search for a car..."
              className={styles.searchField}
            />
          </div>

          {/* Auth Links / Profile */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex gap-1 items-center">
                <Link href="/bookings">Test User</Link>
                <CgProfile size="30" />
              </div>
            ) : (
              <>
                <Link
                  href="/register"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Register
                </Link>
                <button
                  className={styles.button}
                  onClick={() => {
                    startTransition(() => {
                      createSession();
                    });
                  }}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
