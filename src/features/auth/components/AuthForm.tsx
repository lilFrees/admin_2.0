"use client";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthStore } from "../hooks/useAuthStore";
import { loginWithPassword } from "../services/auth-actions";
import { FormDataType } from "../types/FormDataType";

const AuthForm: React.FC = () => {
  const router = useRouter();

  const { setUser } = useAuthStore();

  const toast = useToast();

  const schema = z.object({
    email: z.string().email({
      message: "Invalid email",
    }),
    password: z
      .string({
        message: "Invalid password",
      })
      .min(6),
  });

  async function onSubmit(data: FormDataType) {
    const user = await loginWithPassword(data);
    if (user) {
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        variant: "subtle",
      });
      setUser(user);
      router.refresh();
    } else {
      toast({
        title: "Login failed",
        status: "error",
        duration: 3000,
        isClosable: true,
        variant: "subtle",
      });
    }
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      className="flex w-full max-w-md flex-col gap-5 *:flex *:flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isInvalid={errors?.email ? true : false}>
        <FormLabel>Email</FormLabel>
        <Input type="email" {...register("email")} />
        <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors?.password ? true : false}>
        <FormLabel>Password</FormLabel>
        <Input type="password" {...register("password")} />
        <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors?.root ? true : false}>
        <FormErrorMessage>{errors?.root?.message}</FormErrorMessage>
      </FormControl>

      <Button type="submit" colorScheme="green">
        {isSubmitting ? "Submitting..." : "Login"}
      </Button>
    </form>
  );
};

export default AuthForm;
