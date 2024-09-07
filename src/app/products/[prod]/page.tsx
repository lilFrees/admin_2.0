import ProductForm from "@/features/products/components/ProductForm";
import { getProductById } from "@/features/products/services/products-service";
import { IconButton, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FaChevronLeft } from "react-icons/fa";

export const fetchCache = "force-no-store";

async function Page({
  params,
}: {
  params: {
    [key: string]: any;
  };
}) {
  const { prod } = params;
  const product = await getProductById(+prod);
  if (!product) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-10">
        <Link href="/products">
          <IconButton aria-label="Edit" icon={<FaChevronLeft />} />
        </Link>
        <h1 className="text-2xl font-bold">Edit Product Details</h1>
      </div>
      <div>
        <Suspense fallback={<Spinner />}>
          <ProductForm product={product} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
