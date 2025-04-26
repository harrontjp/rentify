"use client";
import { Filter } from "@/components/FilterBox";
import { createContext, useContext, useState } from "react";

type State = {
  isLoggedIn: boolean;
  userId: number | null;
  isFirstLoad: boolean;
  isPaymentPageOpen: boolean;
  filter: Filter;
  products: [];
  bookingId: string | null;
};
type StateContextType = {
  sharedState: State;
  setSharedState: (value: State) => void;
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [sharedState, setSharedState] = useState<State>({
    isLoggedIn: false,
    isFirstLoad: true,
    userId: null,
    isPaymentPageOpen: false,
    filter: {
      vehicleType: [],
      transmission: [],
      priceRange: { min: null, max: null },
      bookingDates: { from: new Date(), to: null },
    },
    products: [],
    bookingId: null,
  });

  return (
    <StateContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </StateContext.Provider>
  );
}

export function useSharedState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useSharedState must be used within a StateProvider");
  }
  return context;
}
