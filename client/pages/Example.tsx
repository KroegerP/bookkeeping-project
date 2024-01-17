"use client";
import { useQuery } from "@apollo/client";
import type { NextPage } from "next";

import "../app/globals.css";
import { PurchseForm } from "../components/PurchaseForm";
import { GetPurchasesDocument, OrderDirection } from "../generated/graphql";



const ExamplePage: NextPage = () => {
  const { data } = useQuery(GetPurchasesDocument, {
    variables: {
      orderBy: [
        { date: OrderDirection.Desc },
        { id: OrderDirection.Desc },
      ],
    },
  });

  console.log(data);

  return (
    <div className="flex justify-center align-middle box-border w-full h-screen bg-slate-700">
      <div className="w-3/4 flex justify-center align-middle">
        <PurchseForm />
      </div>
    </div>
  );
};

export default ExamplePage;