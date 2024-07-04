"use client";
import { getItem, updateItem, uploadImage } from "@/app/lib/data/item";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page({ params }: { params: { id: number } }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image_url, setImageUrl] = useState("");
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  useEffect(() => {
    getItem(params.id)
      .then((item) => {
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price.toString());
      })
      .catch((error) => console.error(error));
  }, [params.id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    try {
      const item = await updateItem(formData, params.id);
      router.push(`/items`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      try {
        const url = await uploadImage(formData);
        setImageUrl(url);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        className="rounded-md bg-gray-50 p-4 md:p-6"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="name" className="label label-text">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="input input-bordered flex items-center"
            type="text"
            placeholder="Enter name of item"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description" className="label label-text">
            Description
          </label>
          <input
            id="description"
            name="description"
            className="input input-bordered flex items-center"
            type="text"
            placeholder="Enter description of item"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image" className="label label-text">
            Image
          </label>
          <input
            id="image"
            name="image"
            className="input input-bordered flex items-center"
            type="file"
            onChange={handleImageChange}
          />
          {image_url && (
            <Image
              src={`${api_url}${image_url}`}
              width={80}
              height={80}
              alt="Preview"
              className="mt-4 w-20 h-20 object-cover"
            />
          )}
        </div>
        <input type="hidden" name="image_url" value={image_url} />
        <div>
          <label htmlFor="price" className="label label-text">
            Price
          </label>
          <input
            id="price"
            name="price"
            className="input input-bordered flex items-center"
            type="number"
            placeholder="Enter price of item"
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ""))}
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </main>
  );
}
