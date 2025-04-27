"use-client";

import { CreatePayment, PaymentForm } from "@/app/actions";
import Image from "next/image";
import {
  Dispatch,
  JSX,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import styles from "./styles.module.css";
import { useSharedState } from "@/app/StateProvider";
export default function Payment() {
  const { sharedState, setSharedState } = useSharedState();
  const [state, createPayment, pending] = useActionState(CreatePayment, {
    _t: "notAsked",
    res: "",
  });

  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    name: "",
    expiry: "",
    cardNo: "",
    ccv: 0,
    bookingId: "",
  });
  useEffect(() => {
    if (sharedState.bookingId != null && paymentForm.bookingId == null) {
      setPaymentForm({ ...paymentForm, bookingId: sharedState.bookingId });
    }
  }, [sharedState, paymentForm]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100dvh",
          width: "100%",
          background: "black",
          opacity: "0.7",
          zIndex: 3,
        }}
      ></div>
      <div
        className="flex justify-center items-center"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 4,
          width: "100%",
          height: "100dvh",
        }}
      >
        <div
          className="flex bg-white rounded-2xl flex-col gap-3"
          style={{ padding: "36px", borderRadius: "24px" }}
        >
          {state._t === "notAsked" && !pending ? (
            <>
              <Header isProcessing={false} />
              <div style={{ borderTop: "1px solid #C6C6C6" }}></div>
              <Body paymentForm={paymentForm} setPaymentForm={setPaymentForm} />
              <Button onSubmit={createPayment} paymentForm={paymentForm} />
            </>
          ) : pending ? (
            <>
              <Header isProcessing={true} />
              <div style={{ borderTop: "1px solid #C6C6C6" }}></div>
              <div
                style={{
                  width: "356px",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className={styles.loader}></div>
              </div>
            </>
          ) : (
            <div
              style={{
                width: "356px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                fontWeight: "600",
              }}
            >
              <Image alt="marker" src="/success.svg" width={92} height={92} />
              Payment has been confirmed!
              <DonePaymentButton
                onSubmit={() =>
                  setSharedState({ ...sharedState, isPaymentPageOpen: false })
                }
                paymentForm={paymentForm}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function DonePaymentButton({
  onSubmit,
}: {
  onSubmit: () => void;
  paymentForm: PaymentForm;
}) {
  return (
    <button
      className="w-full bg-[#004F8A] rounded-xl font-semibold text-white p-2.5"
      style={{ textAlign: "center", cursor: "pointer" }}
      onClick={() => {
        onSubmit();
      }}
    >
      Done!
    </button>
  );
}

export function Button({
  onSubmit,
  paymentForm,
}: {
  onSubmit: (payload: PaymentForm) => void;
  paymentForm: PaymentForm;
}): JSX.Element {
  return (
    <button
      className="w-full bg-[#004F8A] rounded-xl font-semibold text-white p-2.5"
      style={{ textAlign: "center", cursor: "pointer" }}
      onClick={() => {
        startTransition(() => onSubmit(paymentForm));
      }}
    >
      Submit
    </button>
  );
}

function Body({
  paymentForm,
  setPaymentForm,
}: {
  paymentForm: PaymentForm;
  setPaymentForm: Dispatch<SetStateAction<PaymentForm>>;
}) {
  return (
    <div className="flex justify-between" style={{ fontWeight: "600" }}>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2" style={{ textDecoration: "underline" }}>
          <div style={{ width: "225px" }}>Name on Card</div>
          <div style={{ width: "123px" }}>Expiry</div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={paymentForm.name}
            placeholder="Name"
            style={{
              width: "225px",
              border: "1px solid #E6E6E6",
              borderRadius: "8px",
              padding: "8px 14px",
              fontWeight: "400",
            }}
            onChange={(e) =>
              setPaymentForm({ ...paymentForm, name: e.currentTarget.value })
            }
          />
          <input
            type="text"
            inputMode="numeric"
            placeholder="MM/YY"
            maxLength={5}
            value={paymentForm.expiry}
            style={{
              width: "123px",
              border: "1px solid #E6E6E6",
              borderRadius: "8px",
              padding: "8px 14px",
              fontWeight: "400",
            }}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
              if (value.length > 4) value = value.slice(0, 4);

              if (value.length >= 3) {
                value = `${value.slice(0, 2)}/${value.slice(2)}`;
              }
              setPaymentForm({ ...paymentForm, expiry: value });
            }}
          />
        </div>
        <div className="flex gap-2" style={{ textDecoration: "underline" }}>
          <div style={{ width: "225px" }}>Card Number</div>
          <div style={{ width: "123px" }}>CCV</div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={formatCardNumber(paymentForm.cardNo + "")}
            inputMode="numeric"
            placeholder="xxxx xxxx xxxx xxxx"
            maxLength={19}
            style={{
              width: "225px",
              border: "1px solid #E6E6E6",
              borderRadius: "8px",
              padding: "8px 14px",
              fontWeight: "400",
            }}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setPaymentForm({
                ...paymentForm,
                cardNo: value,
              });
            }}
          />
          <input
            type="text"
            value={paymentForm.ccv === 0 ? "" : paymentForm.ccv}
            placeholder="123"
            style={{
              width: "123px",
              border: "1px solid #E6E6E6",
              borderRadius: "8px",
              padding: "8px 14px",
              fontWeight: "400",
            }}
            maxLength={3}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setPaymentForm({
                ...paymentForm,
                ccv: Number(value === "" ? 0 : value),
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

const formatCardNumber = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");
  const chunks = digitsOnly.match(/.{1,4}/g) || [];
  return chunks.join(" ");
};

function Header({ isProcessing }: { isProcessing: boolean }) {
  return (
    <div className="flex gap-4" style={{ alignItems: "flex-start" }}>
      <Image
        alt="marker"
        src="/marker.svg"
        width={6}
        height={24}
        style={{ paddingTop: "3px" }}
      />
      <div className="flex flex-col text-2xl font-bold">
        Payment
        <div className="text-sm" style={{ fontWeight: "400" }}>
          {isProcessing ? "Processing" : "Enter your card details"}
        </div>
      </div>
    </div>
  );
}
