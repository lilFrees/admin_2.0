"use client";

import { createClient } from "@/shared/supabase/client";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Switch,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import imageCompression, { Options } from "browser-image-compression";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateImageStore } from "../../hooks/useUpdateImageStore";
import { IProduct } from "../../interfaces/IProduct";
import ImagePicker from "./ImagePicker";

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

function UpdateForm({ product }: { product: IProduct }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const toast = useToast();
  const router = useRouter();
  const supabase = createClient();
  const { images } = useUpdateImageStore();

  const onSubmit = async (formData: FormData) => {
    const convertedImg = await Promise.all(
      images.map(async (image, i) => {
        const options: Options = {
          maxSizeMB: 1,
          useWebWorker: true,
          fileType: "image/webp",
        };

        console.log(image.file);

        const compressedImage = await imageCompression(image.file, options);

        const { data, error } = await supabase.storage
          .from("product_images")
          .upload(`product-id-${product.id}/image-${i}.webp`, compressedImage, {
            upsert: true,
          });

        if (error) throw error.message;
        console.log(data);

        const { data: publicUrlData } = supabase.storage
          .from("product_images")
          .getPublicUrl(`product-id-${product.id}/image-${i}.webp`);

        return publicUrlData;
      }),
    );

    console.log(convertedImg);

    const { error } = await supabase
      .from("products")
      .update({
        title: formData.title,
        description: formData.description,
        price: formData.price,
        discounted_price: formData.discount,
        stock: formData.stock,
        sku: formData.sku,
        warranty_information: formData.warranty,
        shipping_information: formData.shippingInfo,
        return_policy: formData.returnPolicy,
        is_active: formData.isActive,
        thumbnail: convertedImg[0].publicUrl,
        images: convertedImg.map((img) => img.publicUrl),
      })
      .eq("id", product.id)
      .single();

    const { data, error: listError } = await supabase.storage
      .from("product_images")
      .list(`product-id-${product.id}`);

    if (listError) throw listError.message;

    const numberOfItemsToDelete = data.length - convertedImg.length;

    if (numberOfItemsToDelete > 0) {
      const { error } = await supabase.storage
        .from("product_images")
        .remove([
          ...data.slice(-numberOfItemsToDelete).map((item) => item.name),
        ]);

      if (error) throw error.message;
    }
    toast({
      title: "Product Updated",
      description: "Product details have been updated successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    router.push("/products");
  };

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
      <ImagePicker initialImages={product.images} />
      <div className="container grid grid-cols-[repeat(auto-fit,minmax(1fr,20rem))] gap-5 *:h-full *:w-full">
        {/* Title */}
        <FormControl isInvalid={!!errors.title}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            defaultValue={product.title}
            {...register("title")}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        {/* Price */}
        <FormControl isInvalid={!!errors.price}>
          <FormLabel htmlFor="price">Price</FormLabel>
          <NumberInput defaultValue={product.price}>
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
          <NumberInput defaultValue={product.discounted_price}>
            <NumberInputField id="discount" {...register("discount")} />
          </NumberInput>
          <FormErrorMessage>{errors.discount?.message}</FormErrorMessage>
        </FormControl>

        {/* Stock */}
        <FormControl isInvalid={!!errors.stock}>
          <FormLabel htmlFor="stock">Stock</FormLabel>
          <NumberInput defaultValue={product.stock}>
            <NumberInputField
              id="stock"
              {...register("stock", { valueAsNumber: true })}
            />
          </NumberInput>
          <FormErrorMessage>{errors.stock?.message}</FormErrorMessage>
        </FormControl>

        {/* SKU */}
        <FormControl isInvalid={!!errors.sku} className="w-full">
          <FormLabel
            htmlFor="sku"
            className="!flex w-full items-center justify-between"
          >
            <div>SKU</div>
            <Button
              size="sm"
              variant="ghost"
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
          <Input id="sku" defaultValue={product.sku} {...register("sku")} />
          <FormErrorMessage>{errors.sku?.message}</FormErrorMessage>
        </FormControl>

        {/* Warranty */}
        <FormControl isInvalid={!!errors.warranty}>
          <FormLabel htmlFor="warranty">Warranty</FormLabel>
          <Input
            id="warranty"
            defaultValue={product.warranty_information}
            {...register("warranty")}
          />
          <FormErrorMessage>{errors.warranty?.message}</FormErrorMessage>
        </FormControl>

        {/* Shipping Info */}
        <FormControl isInvalid={!!errors.shippingInfo}>
          <FormLabel htmlFor="shippingInfo">Shipping Info</FormLabel>
          <Input
            id="shippingInfo"
            defaultValue={product.shipping_information}
            {...register("shippingInfo")}
          />
          <FormErrorMessage>{errors.shippingInfo?.message}</FormErrorMessage>
        </FormControl>

        {/* Return Policy */}
        <FormControl isInvalid={!!errors.returnPolicy}>
          <FormLabel htmlFor="returnPolicy">Return Policy</FormLabel>
          <Input
            id="returnPolicy"
            defaultValue={product.return_policy}
            {...register("returnPolicy")}
          />
          <FormErrorMessage>{errors.returnPolicy?.message}</FormErrorMessage>
        </FormControl>

        {/* Description */}
        <FormControl isInvalid={!!errors.description} className="col-span-1">
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            id="description"
            defaultValue={product.description}
            {...register("description")}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        {/* Is Active */}
        <div className="col-span-3 mt-5 flex items-center justify-between">
          <FormControl display="flex" alignItems="center">
            <Switch
              colorScheme="green"
              id="isActive"
              defaultChecked={product.is_active}
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

export default UpdateForm;
