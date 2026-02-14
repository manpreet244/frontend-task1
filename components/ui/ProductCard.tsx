"use client";
import React from "react";
import { Product } from "@/app/types/product";
import { Card } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { image, title, price, category } = product;
  
  return (
    <Card className="flex flex-col py-2 overflow-hidden bg-white border hover:shadow-md transition-shadow h-full">
      {/* 1. Image Container */}
      <div className="h-44 w-full bg-white p-4 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* 2. Text Container: We remove the padding from Card and put it here */}
      <div className="flex flex-col px-4 pb-4 pt-0 flex-grow">
        <h3 className="font-medium text-sm text-slate-800 line-clamp-2 min-h-[40px] leading-tight">
          {title}
        </h3>
        
        {/* mt-2 brings the price closer to the title, reducing the "lengthy" feel */}
        <div className="mt-2">
          <p className="text-base font-bold text-slate-900 leading-none">${price}</p>
          <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wide mt-1">
            {category}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;