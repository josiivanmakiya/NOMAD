import { useMemo, useState } from "react";
import { VALUES_TEXT } from "../content/valuesText.js";

const parseAmount = (value) => Number(String(value || "").replace(/,/g, "")) || 0;

export default function VatWhtCalculatorCard({ className = "", title, hint }) {
  const [incomeInput, setIncomeInput] = useState("200000");

  const parsedIncome = parseAmount(incomeInput);
  const vatAmount = parsedIncome * 0.075;
  const whtAmount = parsedIncome * 0.1;
  const taxVaultAmount = vatAmount + whtAmount;
  const spendableNow = Math.max(0, parsedIncome - taxVaultAmount);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 2,
      }),
    []
  );

  return (
    <section className={className}>
      <div className="mb-4">
        <p className="text-lg font-semibold">
          {title || VALUES_TEXT.calculator.label}
        </p>
      </div>
      <p className="text-sm text-slate-600">
        {hint || VALUES_TEXT.calculator.hint}
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-700">
          <span className="mb-2 block font-medium">
            {VALUES_TEXT.calculator.fields.income}
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={incomeInput}
            onChange={(event) => setIncomeInput(event.target.value)}
            className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-black"
          />
        </label>

        <div className="space-y-2 border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
          <p>
            <span className="font-medium">{VALUES_TEXT.calculator.fields.vat}: </span>
            {formatter.format(vatAmount)}
          </p>
          <p>
            <span className="font-medium">{VALUES_TEXT.calculator.fields.wht}: </span>
            {formatter.format(whtAmount)}
          </p>
          <p>
            <span className="font-medium">{VALUES_TEXT.calculator.fields.recommended}: </span>
            {formatter.format(taxVaultAmount)}
          </p>
          <p>
            <span className="font-medium">{VALUES_TEXT.calculator.fields.spendable}: </span>
            {formatter.format(spendableNow)}
          </p>
        </div>
      </div>
    </section>
  );
}
