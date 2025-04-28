"use client";

import { FilterProducts } from "@/app/actions";
import FilterBox, { VehicleType } from "./FilterBox";
import { startTransition, useActionState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSharedState } from "@/app/StateProvider";
export type Vehicle = {
  id: number;
  createdBy: number;
  vehicleType: VehicleType;
  vehicleModel: string;
  transmissionType: string;
  pricePerDay: number;
  fuelType: string;
};

export default function ProductListing({
  recoVehicles,
}: {
  recoVehicles: Vehicle[];
}) {
  const router = useRouter();
  const { sharedState, setSharedState } = useSharedState();
  const [state, filterProduct, pending] = useActionState(FilterProducts, null);
  const prevStateRef = useRef(state);
  useEffect(() => {
    if (prevStateRef.current !== state && state != null) {
      if (state._t === "success") {
        setSharedState({
          ...sharedState,
          products: state.res,
        });
      } else {
        setSharedState({
          ...sharedState,
          toastMessage:
            "Product service is not available at this time. Please try again later.",
          toastOpen: true,
        });
      }
      prevStateRef.current = state;
    }
  }, [state, sharedState, setSharedState]);

  return (
    <>
      <FilterBox filterProduct={filterProduct} />
      <div
        className="p-2.5 w-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
        }}
      >
        {recoVehicles.length > 1 &&
          state == null &&
          recoVehicles.map((prod: Vehicle, ind: number) => (
            <div
              key={ind}
              className="flex flex-col w-fit p-2.5 gap-1.5 hover:border-blue-200 hover:border-2 "
              style={{
                borderRadius: "8px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                cursor: "pointer",
              }}
              onClick={() => {
                router.push(`/${prod.id}`);
              }}
            >
              <Image
                src={`/car/car${prod.id}.jpg`}
                alt="Car Image"
                width={364}
                height={267}
                style={{ height: "100%" }}
              />
              <div className="text-blue-950 font-bold text-sm">
                {prod.transmissionType + " • " + prod.fuelType}
              </div>
              <div className="text-lg font-bold">{prod.vehicleModel}</div>
              <div className="text-lg pt-2">${prod.pricePerDay} / day</div>
            </div>
          ))}
        {pending
          ? "Loading..."
          : state?.error != null
          ? state.error
          : sharedState.products.map((prod: Vehicle, ind: number) => (
              <div
                key={ind}
                className="flex flex-col w-fit p-2.5 gap-1.5 hover:border-blue-200 hover:border-2 "
                style={{
                  borderRadius: "8px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  router.push(`/${prod.id}`);
                }}
              >
                <Image
                  src={`/car/car${prod.id}.jpg`}
                  alt="Car Image"
                  width={364}
                  height={267}
                  style={{ height: "100%" }}
                />
                <div className="text-blue-950 font-bold text-sm">
                  {prod.transmissionType + " • " + prod.fuelType}
                </div>
                <div className="text-lg font-bold">{prod.vehicleModel}</div>
                <div className="text-lg pt-2">${prod.pricePerDay} / day</div>
              </div>
            ))}
      </div>
    </>
  );
}

export function DateBar() {
  const [state, filterProduct, pending] = useActionState(FilterProducts, null);
  const prevStateRef = useRef(state);

  const { sharedState, setSharedState } = useSharedState();
  useEffect(() => {
    if (prevStateRef.current !== state && state != null) {
      if (state._t === "success") {
        setSharedState({
          ...sharedState,
          products: state.res,
        });
      } else {
        setSharedState({
          ...sharedState,
          toastMessage:
            "Product service is not available at this time. Please try again later.",
          toastOpen: true,
        });
      }
      prevStateRef.current = state;
    }
  }, [state, sharedState, setSharedState]);
  const today = new Date();
  const localDate =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");
  return (
    <div className="bg-white p-6 rounded-xl w-full flex gap-4 justify-evenly">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="flex justify-center flex-col items-center">
          <label className="block text-sm font-bold text-gray-700 mb-1 text-center">
            Pickup Date
          </label>
          <input
            style={{ width: "50%" }}
            type="date"
            min={localDate}
            value={
              sharedState.filter.bookingDates.from.toISOString().split("T")[0]
            }
            onChange={(e) => {
              const newDate = new Date(e.currentTarget.value);
              if (
                sharedState.filter.bookingDates.to != null &&
                newDate > sharedState.filter.bookingDates.to
              ) {
                setSharedState({
                  ...sharedState,
                  filter: {
                    ...sharedState.filter,
                    bookingDates: { from: newDate, to: newDate },
                  },
                });
                return;
              }
              setSharedState({
                ...sharedState,
                filter: {
                  ...sharedState.filter,
                  bookingDates: {
                    ...sharedState.filter.bookingDates,
                    from: newDate,
                  },
                },
              });
            }}
          />
        </div>
        <div className="flex justify-center flex-col items-center">
          <label className="block text-sm font-bold text-gray-700 mb-1 text-center">
            Return Date
          </label>
          <input
            style={{ width: "50%" }}
            type="date"
            min={
              sharedState.filter.bookingDates.from.toISOString().split("T")[0]
            }
            value={
              sharedState.filter.bookingDates.to != null
                ? sharedState.filter.bookingDates.to.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => {
              sharedState.filter.bookingDates.to = new Date(
                e.currentTarget.value
              );
              setSharedState({
                ...sharedState,
                filter: { ...sharedState.filter },
              });
            }}
          />
        </div>
      </div>

      <div
        className="bg-[#004F8A] h-[40] p-4 text-white text-lg  flex justify-center items-center rounded-xl"
        onClick={() => {
          startTransition(() => {
            filterProduct(sharedState.filter);
          });
        }}
        style={{
          whiteSpace: "nowrap",
          alignSelf: "end",
          cursor: "pointer",
        }}
      >
        {pending ? "Searching..." : "Search Cars"}
      </div>
    </div>
  );
}
