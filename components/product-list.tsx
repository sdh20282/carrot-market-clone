"use client";

import { useEffect, useRef, useState } from "react";

import { InitialProducts } from "@/app/(tabs)/products/page"
import { getMoreProducts } from "@/app/(tabs)/products/actions";
import ListProduct from "@/components/list-product"

interface ProductListProps {
  initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<InitialProducts>(initialProducts);
  const [page, setPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(async (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      const element = entries[0];

      if (element.isIntersecting && trigger.current) {
        observer.unobserve(trigger.current);

        setIsLoading(true);
        const newProducts = await getMoreProducts(page + 1);

        if (newProducts.length !== 0) {
          setPage(prev => prev + 1);
          setProducts(prev => [...prev, ...newProducts]);
        } else {
          setIsLastPage(true);
        }

        setIsLoading(false);
      }
    }, {
      threshold: 1.0,
      rootMargin: "0px 0px -100px 0px",
    });

    if (trigger.current) {
      observer.observe(trigger.current);
    }

    return () => {
      observer.disconnect();
    }
  }, [page]);

  return (
    <div className="p-5 flex flex-col gap-5">
      {
        products.map(product => {
          return (
            <ListProduct key={product.id} {...product} />
          )
        })
      }
      {
        isLastPage
        ? null
        : <span ref={trigger} className="mb-96 text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95">
          {
            isLoading
            ? "Loading..."
            : "Load more..."
          }
        </span>
      }
    </div>
  )
}