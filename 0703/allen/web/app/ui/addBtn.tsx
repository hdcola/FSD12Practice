"use client";

import React, { useState } from "react";

export function AddButton() {
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [optionCategories, setOptionCategories] = useState([
    {
      name: "",
      max_selection: 1,
      min_selection: 0,
      required: false,
      multiple: false,
      allow_custom: false,
      allow_quantity: false,
      extra_options: [
        {
          name: "",
          price: 0,
        },
      ],
    },
  ]);
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

  const handleOptionCategoryChange = (
    index: number,
    field: keyof (typeof optionCategories)[0],
    value: any
  ) => {
    const updatedCategories = [...optionCategories];
    updatedCategories[index] = { ...updatedCategories[index], [field]: value };
    setOptionCategories(updatedCategories);
  };

  const handleExtraOptionChange = (
    catIndex: number,
    optIndex: number,
    field: keyof (typeof optionCategories)[0]["extra_options"][0],
    value: any
  ) => {
    const updatedCategories = [...optionCategories];
    const updatedOptions = [...updatedCategories[catIndex].extra_options];
    updatedOptions[optIndex] = { ...updatedOptions[optIndex], [field]: value };
    updatedCategories[catIndex].extra_options = updatedOptions;
    setOptionCategories(updatedCategories);
  };

  const addOptionCategory = () => {
    setOptionCategories([
      ...optionCategories,
      {
        name: "",
        max_selection: 1,
        min_selection: 0,
        required: false,
        multiple: false,
        allow_custom: false,
        allow_quantity: false,
        extra_options: [
          {
            name: "",
            price: 0,
          },
        ],
      },
    ]);
  };

  const addExtraOption = (catIndex: number) => {
    const updatedCategories = [...optionCategories];
    updatedCategories[catIndex].extra_options.push({
      name: "",
      price: 0,
    });
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
      image_url: imageUrl,
      option_categories: optionCategories,
    };

    console.log(
      "Final JSON to be sent to server:",
      JSON.stringify(itemToSubmit, null, 2)
    );

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
        setOptionCategories([
          {
            name: "",
            max_selection: 1,
            min_selection: 0,
            required: false,
            multiple: false,
            allow_custom: false,
            allow_quantity: false,
            extra_options: [
              {
                name: "",
                price: 0,
              },
            ],
          },
        ]);
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
      <div className="w-full max-w-xs">
        <h3>Option Categories</h3>
        {optionCategories.map((category, catIndex) => (
          <div key={catIndex} className="mb-4">
            <input
              type="text"
              value={category.name}
              onChange={(e) =>
                handleOptionCategoryChange(catIndex, "name", e.target.value)
              }
              placeholder="Category Name"
              className="input input-bordered w-full mb-2"
            />
            {category.extra_options.map((option, optIndex) => (
              <div key={optIndex} className="flex items-center gap-2 mb-2">
                <input
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
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  value={option.price}
                  onChange={(e) =>
                    handleExtraOptionChange(
                      catIndex,
                      optIndex,
                      "price",
                      e.target.value
                    )
                  }
                  placeholder="Price"
                  className="input input-bordered w-full"
                />
              </div>
            ))}
            <button
              className="btn btn-secondary mb-2"
              onClick={() => addExtraOption(catIndex)}
            >
              Add Extra Option
            </button>
          </div>
        ))}
        <button className="btn btn-secondary" onClick={addOptionCategory}>
          Add Option Category
        </button>
      </div>
      <button className="btn btn-primary mt-4" onClick={addItem}>
        Add Item
      </button>
    </div>
  );
}
