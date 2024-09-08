"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IProduct } from "../../interfaces/IProduct";
import { useCreateImageStore } from "../../hooks/useCreateImageStore";
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  Textarea,
  Switch,
  Button,
} from "@chakra-ui/react";
import CreateImagePicker from "./CreateImagePicker";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long"),
  price: z.number().positive(),
  discount: z.preprocess(
    (value) => (value === "" ? undefined : parseFloat(value as string)),
    z.number().nullable().optional(),
  ),
  stock: z.number().int().positive(),
  sku: z.string().min(3, "SKU must be at least 3 characters long"),
  warranty: z.string().min(3, "Warranty must be at least 3 characters long"),
  shippingInfo: z
    .string()
    .min(3, "Shipping Info must be at least 3 characters long"),
  returnPolicy: z.string(),
  isActive: z.boolean(),
});

type FormData = z.infer<typeof schema>;

function CreateForm() {
  const { images } = useCreateImageStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(formData: FormData) {
    console.log(formData);
  }

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
      <CreateImagePicker />
      <div className="container grid grid-cols-[repeat(auto-fit,minmax(1fr,20rem))] gap-5 *:h-full *:w-full">
        {/* Title */}
        <FormControl isInvalid={!!errors.title}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input id="title" {...register("title")} />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        {/* Price */}
        <FormControl isInvalid={!!errors.price}>
          <FormLabel htmlFor="price">Price</FormLabel>
          <NumberInput>
            <NumberInputField
              id="price"
              {...register("price", { valueAsNumber: true })}
            />
          </NumberInput>
          <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
        </FormControl>

        {/* Discount */}
        <FormControl isInvalid={!!errors.discount}>
          <FormLabel htmlFor="discount">Discounted Price (optional)</FormLabel>
          <NumberInput>
            <NumberInputField id="discount" {...register("discount")} />
          </NumberInput>
          <FormErrorMessage>{errors.discount?.message}</FormErrorMessage>
        </FormControl>

        {/* Stock */}
        <FormControl isInvalid={!!errors.stock}>
          <FormLabel htmlFor="stock">Stock</FormLabel>
          <NumberInput>
            <NumberInputField
              id="stock"
              {...register("stock", { valueAsNumber: true })}
            />
          </NumberInput>
          <FormErrorMessage>{errors.stock?.message}</FormErrorMessage>
        </FormControl>

        {/* SKU */}
        <FormControl isInvalid={!!errors.sku}>
          <FormLabel
            htmlFor="sku"
            className="!flex w-full items-center justify-between"
          >
            <div>SKU</div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setValue(
                  "sku",
                  Math.random().toString(36).substring(5).toUpperCase(),
                )
              }
            >
              Generate
            </Button>
          </FormLabel>
          <Input id="sku" {...register("sku")} />
          <FormErrorMessage>{errors.sku?.message}</FormErrorMessage>
        </FormControl>

        {/* Warranty */}
        <FormControl isInvalid={!!errors.warranty}>
          <FormLabel htmlFor="warranty">Warranty</FormLabel>
          <Input id="warranty" {...register("warranty")} />
          <FormErrorMessage>{errors.warranty?.message}</FormErrorMessage>
        </FormControl>

        {/* Shipping Info */}
        <FormControl isInvalid={!!errors.shippingInfo}>
          <FormLabel htmlFor="shippingInfo">Shipping Info</FormLabel>
          <Input id="shippingInfo" {...register("shippingInfo")} />
          <FormErrorMessage>{errors.shippingInfo?.message}</FormErrorMessage>
        </FormControl>

        {/* Return Policy */}
        <FormControl isInvalid={!!errors.returnPolicy}>
          <FormLabel htmlFor="returnPolicy">Return Policy</FormLabel>
          <Input id="returnPolicy" {...register("returnPolicy")} />
          <FormErrorMessage>{errors.returnPolicy?.message}</FormErrorMessage>
        </FormControl>

        {/* Description */}
        <FormControl isInvalid={!!errors.description} className="col-span-1">
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea id="description" {...register("description")} />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        {/* Is Active */}
        <div className="col-span-3 mt-5 flex items-center justify-between">
          <FormControl display="flex" alignItems="center">
            <Switch
              colorScheme="green"
              id="isActive"
              {...register("isActive")}
            />
            <FormLabel htmlFor="isActive" ml={5} mb="0">
              Is Active?
            </FormLabel>
          </FormControl>

          <Button type="submit" isLoading={isSubmitting} colorScheme="green">
            {isSubmitting ? "Submitting" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreateForm;
