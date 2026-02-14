"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/app/types/product";
import { Card } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { image, title, price, category } = product;

  return (
    <Card className="flex flex-col py-2 overflow-hidden bg-white border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full">
      {/* Image */}
      <div className="h-44 w-full bg-white p-4 flex items-center justify-center relative">
        <Image
          src={image}
          alt={title}
          width={160}
          height={160}
          className="max-w-full max-h-full object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        />
      </div>
      {/* Card Content */}
      <div className="flex flex-col px-6 pb-4 pt-0 grow">
        <h3 className="font-medium text-sm text-slate-800 line-clamp-2 min-h-10 leading-tight">
          {title}
        </h3>

        <div className="mt-2">
          <p className="text-base font-bold text-slate-900 leading-none">
            ${price.toFixed(2)}
          </p>
          <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wide mt-1">
            {category}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
