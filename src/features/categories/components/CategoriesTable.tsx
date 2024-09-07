import {
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ICategory } from "../interfaces/ICategory";
import CategoryRow from "./CategoryRow";

function CategoriesTable({
  categories,
  isLoading,
}: {
  categories?: ICategory[] | undefined;
  isLoading: boolean;
}) {
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>№</Th>
            <Th>Name</Th>
            <Th>Products count</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        {isLoading && (
          <Tbody>
            {new Array(10).fill(0).map((_, index) => (
              <Tr key={index}>
                <Td>
                  <Skeleton className="h-[15px] w-full" />
                </Td>
                <Td>
                  <Skeleton className="h-[15px] w-full" />
                </Td>
                <Td>
                  <Skeleton className="h-[15px] w-full" />
                </Td>
                <Td>
                  <Skeleton className="h-[15px] w-full" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        )}
        {!isLoading && categories && (
          <Tbody>
            {categories.map((category, index) => (
              <CategoryRow key={index} category={category} />
            ))}
          </Tbody>
        )}
      </Table>
    </TableContainer>
  );
}

export default CategoriesTable;
