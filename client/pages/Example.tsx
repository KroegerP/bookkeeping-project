import type { NextPage } from "next";

import "../app/globals.css";
import { PurchseForm } from "../components/PurchaseForm";



const ExamplePage: NextPage = () => {
  return (
    <div className="flex justify-center align-middle box-border w-full h-screen bg-slate-700">
      <div className="w-3/4 flex justify-center align-middle">
        <PurchseForm />
      </div>
    </div>
  );
};

export default ExamplePage;