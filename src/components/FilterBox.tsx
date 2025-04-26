"use client";

import { useSharedState } from "@/app/StateProvider";
import { startTransition, useRef } from "react";

export type VehicleType = "SUV" | "Saloon" | "MPV";
type VehicleSelection = VehicleType[];
type Transmission = "Automatic" | "Manual";
type TransmissionSelection = Transmission[];
type PriceRange = {
  min: number | null;
  max: number | null;
};
export type BookingDates = {
  from: Date;
  to: Date | null;
};

export type Filter = {
  vehicleType: VehicleSelection;
  transmission: TransmissionSelection;
  priceRange: PriceRange;
  bookingDates: BookingDates;
};

type Action =
  | {
      _t: "SetVehicleType";
      value: VehicleType;
    }
  | {
      _t: "SetTransmission";
      value: Transmission;
    }
  | {
      _t: "SetPriceRange";
      type: "min" | "max";
      value: number;
    }
  | {
      _t: "SetDate";
      type: "from" | "to";
      value: string;
    }
  | { _t: "ResetFilter" };

export const initialFilterState: Filter = {
  vehicleType: [],
  transmission: [],
  priceRange: { min: null, max: null },
  bookingDates: { from: new Date(), to: null },
};

const debounceDelay = 800;

export default function FilterBox({
  filterProduct,
}: {
  filterProduct: (payload: Filter) => void;
}) {
  const filterDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const { sharedState, setSharedState } = useSharedState();

  function OnInputChange(action: Action) {
    const selectedFilter = sharedState.filter;
    switch (action._t) {
      case "SetVehicleType":
        if (selectedFilter.vehicleType.includes(action.value)) {
          selectedFilter.vehicleType = selectedFilter.vehicleType.filter(
            (item) => item !== action.value
          );
        } else {
          selectedFilter.vehicleType.push(action.value);
        }
        break;
      case "SetTransmission":
        if (selectedFilter.transmission.includes(action.value)) {
          selectedFilter.transmission = selectedFilter.transmission.filter(
            (item) => item !== action.value
          );
        } else {
          selectedFilter.transmission.push(action.value);
        }
        break;
      case "SetPriceRange":
        if (action.type === "min")
          selectedFilter.priceRange.min =
            action.value === 0 ? null : action.value;
        else
          selectedFilter.priceRange.max =
            action.value === 0 ? null : action.value;
        break;

      case "ResetFilter":
        const tempFilter = {
          ...selectedFilter,
          priceRange: { ...initialFilterState.priceRange },
          bookingDates: { ...initialFilterState.bookingDates },
          vehicleType: [...initialFilterState.vehicleType],
          transmission: [...initialFilterState.transmission],
        };
        selectedFilter.bookingDates = tempFilter.bookingDates;
        selectedFilter.priceRange = tempFilter.priceRange;
        selectedFilter.transmission = tempFilter.transmission;
        selectedFilter.vehicleType = tempFilter.vehicleType;
        setSharedState({
          ...sharedState,
          filter: tempFilter,
        });
        break;
    }

    // Clear previous timer
    if (filterDebounceRef.current) {
      clearTimeout(filterDebounceRef.current);
    }

    // Set a new debounce timer
    filterDebounceRef.current = setTimeout(() => {
      startTransition(() => {
        filterProduct(selectedFilter);
      });
    }, debounceDelay);
  }

  return (
    <div className="w-3xs flex flex-col gap-2 pt-2">
      <div className="flex justify-between w-full">
        <div className="text-lg font-bold">Filters</div>
        <div
          className="underline text-sm text-blue-500"
          style={{ cursor: "pointer" }}
          onClick={() => OnInputChange({ _t: "ResetFilter" })}
        >
          Clear All
        </div>
      </div>
      <div
        style={{
          borderBottom: "1px solid grey",
          width: "100%",
        }}
      ></div>

      <div className="text-lg font-bold">Vehicle Type</div>
      <VehicleTypeInput
        onChangeFnc={OnInputChange}
        selectedFilter={sharedState.filter}
      />
      <div className="text-lg font-bold">Transmission</div>
      <TransmissionInput
        onChangeFnc={OnInputChange}
        selectedFilter={sharedState.filter}
      />
      <div className="text-lg font-bold">Price Range / day</div>
      <PriceRangeInput
        onChangeFnc={OnInputChange}
        selectedFilter={sharedState.filter}
      />
      <div className="h-50"></div>
    </div>
  );
}

function PriceRangeInput({
  onChangeFnc,
  selectedFilter,
}: {
  onChangeFnc: (action: Action) => void;
  selectedFilter: Filter;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex gap-2 justify-between">
        Min{` ($)`}
        <input
          style={{ width: "75%" }}
          type="number"
          min={0}
          value={
            selectedFilter.priceRange.min == null
              ? ""
              : selectedFilter.priceRange.min
          }
          placeholder="$"
          onChange={(e) =>
            onChangeFnc({
              _t: "SetPriceRange",
              type: "min",
              value: Number(e.currentTarget.value),
            })
          }
        />
      </label>
      <label className="flex gap-2 justify-between">
        Max{` ($)`}
        <input
          style={{ width: "75%" }}
          type="number"
          min={0}
          value={
            selectedFilter.priceRange.max == null
              ? ""
              : selectedFilter.priceRange.max
          }
          placeholder="$"
          onChange={(e) =>
            onChangeFnc({
              _t: "SetPriceRange",
              type: "max",
              value: Number(e.currentTarget.value),
            })
          }
        />
      </label>
    </div>
  );
}

function VehicleTypeInput({
  onChangeFnc,
  selectedFilter,
}: {
  onChangeFnc: (action: Action) => void;
  selectedFilter: Filter;
}) {
  return (
    <div className="pl-4 flex flex-col gap-2">
      <label className="flex gap-4">
        <input
          type="checkbox"
          value={"SUV"}
          checked={selectedFilter?.vehicleType.includes("SUV")}
          onChange={(e) =>
            onChangeFnc({
              _t: "SetVehicleType",
              value: e.currentTarget.value as VehicleType,
            })
          }
        />
        SUV
      </label>
      <label className="flex gap-4">
        <input
          type="checkbox"
          value={"Saloon"}
          checked={selectedFilter?.vehicleType.includes("Saloon")}
          onChange={(e) =>
            onChangeFnc({
              _t: "SetVehicleType",
              value: e.currentTarget.value as VehicleType,
            })
          }
        />
        Saloon
      </label>
      <label className="flex gap-4">
        <input
          type="checkbox"
          value={"MPV"}
          checked={selectedFilter?.vehicleType.includes("MPV")}
          onChange={(e) =>
            onChangeFnc({
              _t: "SetVehicleType",
              value: e.currentTarget.value as VehicleType,
            })
          }
        />
        MPV
      </label>
    </div>
  );
}

function TransmissionInput({
  onChangeFnc,
  selectedFilter,
}: {
  onChangeFnc: (action: Action) => void;
  selectedFilter: Filter;
}) {
  return (
    <div className="pl-4 flex flex-col gap-2">
      <label className="flex gap-4">
        <input
          type="checkbox"
          value={"Automatic"}
          checked={selectedFilter?.transmission.includes("Automatic")}
          onChange={(e) =>
            onChangeFnc({
              _t: "SetTransmission",
              value: e.currentTarget.value as Transmission,
            })
          }
        />
        Automatic
      </label>
      <label className="flex gap-4">
        <input
          type="checkbox"
          value={"Manual"}
          checked={selectedFilter?.transmission.includes("Manual")}
          onChange={(e) =>
            onChangeFnc({
              _t: "SetTransmission",
              value: e.currentTarget.value as Transmission,
            })
          }
        />
        Manual
      </label>
    </div>
  );
}
