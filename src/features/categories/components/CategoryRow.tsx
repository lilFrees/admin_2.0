import { IconButton, Td, Tooltip, Tr } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { ICategory } from "../interfaces/ICategory";

function CategoryRow({ category }: { category: ICategory }) {
  return (
    <Tr>
      <Td>{category.category_id}</Td>
      <Td>
        <span tabIndex={0}>
          <Tooltip
            hasArrow
            label={category.category_name}
            aria-label="category-name"
          >
            {category.category_name}
          </Tooltip>
        </span>
      </Td>
      <Td>{category.total_products}</Td>
      <Td display="flex" gap="10px">
        <IconButton aria-label="edit-product" icon={<MdEdit />} size="sm" />
        <IconButton
          aria-label="delete-product"
          icon={<FaTrashAlt />}
          colorScheme="red"
          size="sm"
        />
      </Td>
    </Tr>
  );
}

export default CategoryRow;
