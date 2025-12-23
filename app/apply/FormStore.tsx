"use client";
import React from "react";

type FormState = Record<string, any>;
type Ctx = { state: FormState; setField: (k: string, v: any) => void };
const ApplyContext = React.createContext<Ctx | null>(null);

export function ApplyProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<FormState>({});
  const setField = (k: string, v: any) => setState(s => ({ ...s, [k]: v }));
  return <ApplyContext.Provider value={{ state, setField }}>{children}</ApplyContext.Provider>;
}

export function useApply() {
  const ctx = React.useContext(ApplyContext);
  if (!ctx) throw new Error("useApply must be used within ApplyProvider");
  return ctx;
}
