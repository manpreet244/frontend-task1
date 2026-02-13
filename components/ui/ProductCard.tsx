"use client";
import React from "react";
import { Product } from "@/app/types/product";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { image, title, price, category } = product;
  return (
    <Card className="flex flex-col max-w-[240px]overflow-hidden py-0 pb-4 bg-gray-50 h-full border-none hover:shadow-md transition-shadow ">
      <div className="relative aspect-[4/3] w-full rounded-t-lg overflow-hidden mb-2">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex w-full justify-between p-4 gap-6">
        <h3 className="font-semibold text-sm text-slate-800 line-clamp-1">
          {title}
        </h3>

        <div>
          <p className="text-base font-bold text-slate-900">${price}</p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            {category}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
