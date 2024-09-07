import { IconButton, Switch, Td, Tooltip, Tr } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IAdminProduct } from "../interfaces/IAdminProduct";
import { toggleActiveStatus } from "../services/products-service";

const ProductRow = memo(function ProductRow({
  product,
}: {
  product: IAdminProduct;
}) {
  const [isChecked, setIsChecked] = useState(product.is_active);

  const handleToggle = useCallback(async () => {
    await toggleActiveStatus(product.product_id, !isChecked);
    setIsChecked(!isChecked);
  }, [isChecked, product.product_id]);

  return (
    <Tr>
      <Td>{product.product_id}</Td>
      <Td>
        <div className="relative h-9 w-9">
          <Image
            src={product.thumbnail}
            className="h-full w-full object-contain"
            alt={product.product_name}
            fill
          />
        </div>
      </Td>
      <Td>
        <Link
          href={`/products/${product.product_id}`}
          className="block max-w-[14rem]"
        >
          <Tooltip
            hasArrow
            label={product.product_name}
            aria-label="product-title"
          >
            <span className="block truncate">{product.product_name}</span>
          </Tooltip>
        </Link>
      </Td>
      <Td>${product.price}</Td>
      <Td>{product.brand_name}</Td>
      <Td>{product.category_name}</Td>
      <Td>
        <Switch
          isChecked={isChecked}
          onChange={handleToggle}
          colorScheme="green"
        />
      </Td>
      <Td>
        <div className="flex gap-2">
          <Link href={`/products/${product.product_id}`}>
            <IconButton aria-label="edit-product" icon={<MdEdit />} size="sm" />
          </Link>
          <IconButton
            aria-label="delete-product"
            icon={<FaTrashAlt />}
            colorScheme="red"
            size="sm"
          />
        </div>
      </Td>
    </Tr>
  );
});

export default ProductRow;
