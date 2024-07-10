"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Item,
  fetchItems,
  OptionCategory,
  ExtraOption,
} from "@/app/lib/actions";
import "@/app/ui/globals.css";

export default function Page({ params }: { params: { id: number } }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [optionCategories, setOptionCategories] = useState<OptionCategory[]>(
    []
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const fetchedItems = await fetchItems();
        const currentItem = fetchedItems.find(
          (item) => item.id === Number(params.id)
        );
        if (currentItem) {
          console.log("Fetched item:", currentItem);
          setItem(currentItem);
          setName(currentItem.name);
          setDescription(currentItem.description);
          setPrice(String(currentItem.price));
          if (currentItem.optionCategories) {
            setOptionCategories(currentItem.optionCategories);
            console.log("Option categories:", currentItem.optionCategories);
          }
        } else {
          console.error("Item not found");
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    getItems();
  }, [params.id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleOptionCategoryChange = (
    index: number,
    field: keyof OptionCategory,
    value: any
  ) => {
    const updatedCategories = [...optionCategories];
    updatedCategories[index] = { ...updatedCategories[index], [field]: value };
    setOptionCategories(updatedCategories);
  };

  const handleExtraOptionChange = (
    catIndex: number,
    optIndex: number,
    field: keyof ExtraOption,
    value: any
  ) => {
    const updatedCategories = [...optionCategories];
    const updatedOptions = [...updatedCategories[catIndex].extra_options];
    updatedOptions[optIndex] = { ...updatedOptions[optIndex], [field]: value };
    updatedCategories[catIndex].extra_options = updatedOptions;
    setOptionCategories(updatedCategories);
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedFile) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://100.89.152.5:8080/api/images", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.image_url;
      } else {
        const errorText = await response.text();
        console.error("Failed to upload image:", errorText);
        alert(`Failed to upload image: ${errorText}`);
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unexpected error occurred.");
      }
      return null;
    }
  };

  const handleSubmit = async () => {
    let imageUrl = item?.image_url || null;
    if (selectedFile) {
      imageUrl = await uploadImage();
      if (!imageUrl) {
        return;
      }
    }

    const itemToSubmit = {
      name,
      description,
      price: parseFloat(price),
      image_url: imageUrl,
      option_categories: optionCategories,
    };

    console.log(
      "Final JSON to be sent to server:",
      JSON.stringify(itemToSubmit, null, 2)
    );

    try {
      const response = await fetch(
        `http://100.89.152.5:8080/api/items/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemToSubmit),
        }
      );
      if (response.ok) {
        console.log("success");
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!item) {
    return (
      <main className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-success"></span>
      </main>
    );
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          {previewUrl ? (
            <img src={previewUrl} alt="Selected preview" />
          ) : (
            <img
              src={
                item.image_url
                  ? `http://100.89.152.5:8080${item.image_url}`
                  : "/sample.webp"
              }
              alt="item image"
            />
          )}
        </figure>
        <div className="card-body">
          <input
            id="name"
            name="name"
            className="input input-bordered mb-4"
            type="text"
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            id="description"
            name="description"
            className="input input-bordered mb-4"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            id="price"
            name="price"
            className="input input-bordered mb-4"
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="flex flex-col items-center gap-5 mb-4">
            <label className="custom-file-upload">
              <input type="file" onChange={handleFileChange} />
              Revise Image
            </label>
          </div>
          <div>
            <h3 className="mb-2">Option Categories</h3>
            {optionCategories.length === 0 ? (
              <p>No option categories available</p>
            ) : (
              optionCategories.map((category, catIndex) => (
                <div key={catIndex} className="mb-4">
                  <input
                    className="input input-bordered mb-2"
                    type="text"
                    value={category.name}
                    onChange={(e) =>
                      handleOptionCategoryChange(
                        catIndex,
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="Category Name"
                  />
                  {category.extra_options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className="flex items-center gap-2 mb-2"
                    >
                      <input
                        className="input input-bordered w-full"
                        type="text"
                        value={option.name}
                        onChange={(e) =>
                          handleExtraOptionChange(
                            catIndex,
                            optIndex,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Option Name"
                      />
                      <input
                        className="input input-bordered w-full"
                        type="number"
                        step="0.01"
                        value={option.price}
                        onChange={(e) =>
                          handleExtraOptionChange(
                            catIndex,
                            optIndex,
                            "price",
                            parseFloat(e.target.value)
                          )
                        }
                        placeholder="Option Price"
                      />
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
          <div className="card-actions justify-end">
            <Link
              href="/"
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </Link>
            <Link type="button" className="btn btn-neutral" href="/">
              Back
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
