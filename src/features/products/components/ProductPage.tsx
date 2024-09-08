"use client";

import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { FaSearch, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import ProductsTable from "./ProductsTable";
import useProducts from "../hooks/useProducts";
import Link from "next/link";

function ProductPage() {
  const {
    searchQuery,
    setSearchQuery,
    clearSearchQuery,
    products,
    isLoading,
    maxPages,
    limit,
    setLimit,
    setPage,
    page,
    count,
  } = useProducts();

  return (
    <div className="flex min-h-full flex-col gap-5">
      <h2 className="text-3xl">Products {count > 0 && `(${count})`}</h2>

      <div className="flex items-center justify-between gap-5">
        <InputGroup>
          <Input
            placeholder="Search for products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputRightElement>
            {searchQuery.length > 0 ? (
              <FaRegCircleXmark onClick={clearSearchQuery} />
            ) : (
              <FaSearch />
            )}
          </InputRightElement>
        </InputGroup>
        <div className="flex gap-5">
          <Button colorScheme="green" variant="outline">
            Bulk import
          </Button>
          <Link href="/products/create">
            <Button colorScheme="green">New</Button>
          </Link>
        </div>
      </div>
      <ProductsTable products={products!} isLoading={isLoading} />
      <div className="mt-auto flex items-center justify-end gap-5">
        {/* PAGINATION HERE */}
        <ReactPaginate
          onPageChange={(e) => setPage(e.selected)}
          pageCount={maxPages}
          breakLabel={"..."}
          pageRangeDisplayed={2}
          nextLabel={
            <FaChevronRight
              className={`text-xl ${page !== maxPages - 1 ? "text-gray-700" : "text-gray-400"}`}
            />
          }
          previousLabel={
            <FaChevronLeft
              className={`text-xl ${page !== 0 ? "text-gray-700" : "text-gray-400"}`}
            />
          }
          pageLinkClassName="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
          className="mt-auto flex items-center justify-end gap-2"
          activeLinkClassName="bg-green-500 text-white"
          renderOnZeroPageCount={({ pageClassName }) => (
            <div className={pageClassName}>No more pages</div>
          )}
        />
        <div className="w-30">
          <Select
            onChange={(e) => setLimit(+e.target.value)}
            value={limit}
            size="sm"
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
