import FormSubmitButton from "@/components/formSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Add Product - YenShop",
};

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/");
}

export default async function AddPorductPage({}: Props) {
  const session = await getServerSession();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          name="name"
          required
          placeholder="Name"
          className="mb-1 w-full input input-bordered"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          name="imageUrl"
          required
          placeholder="Image Url"
          type="url"
          className="mb-1 w-full input input-bordered"
        />
        <input
          name="price"
          required
          type="number"
          placeholder="price"
          className="mb-1 w-full input input-bordered"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
