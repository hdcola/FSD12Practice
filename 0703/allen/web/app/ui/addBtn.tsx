"use client";

import React, { useState } from "react";

export function AddButton() {
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

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

  const addItem = async () => {
    if (!item.name || !item.description || !item.price) {
      alert("You have to include name, description, and price.");
      return;
    }

    let imageUrl = null;
    if (selectedFile) {
      imageUrl = await uploadImage();
      if (!imageUrl) {
        return;
      }
    }

    const itemToSubmit = {
      ...item,
      price: parseFloat(item.price),
      imageUrl,
    };

    try {
      const response = await fetch("http://100.89.152.5:8080/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemToSubmit),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Item added:", data);
        setItem({
          name: "",
          description: "",
          price: "",
        });
        setSelectedFile(null);
        setPreviewUrl(null);
      } else {
        const errorText = await response.text();
        console.error("Failed to add item:", errorText);
        alert(`Failed to add item: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 mt-5">
      <div className="flex flex-row justify-center items-center gap-5">
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
          placeholder="Name"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="description"
          value={item.description}
          onChange={handleChange}
          placeholder="Description"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="price"
          value={item.price}
          onChange={handleChange}
          placeholder="Price"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="flex flex-col items-center gap-5">
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full max-w-xs"
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 object-cover"
          />
        )}
      </div>
      <button className="btn" onClick={addItem}>
        Add Item
      </button>
    </div>
  );
}
