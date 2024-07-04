"use client";

import React, { useState } from "react";
import { Item, fetchItems } from "@/app/lib/actions";

export function AddButton() {
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const addItem = async () => {
    if (!item.name || !item.description || !item.price) {
      alert("You have to include name, description, and price.");
      return;
    }
    const itemToSubmit = {
      ...item,
      price: parseFloat(item.price),
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
        // 清空表单或显示成功信息
        setItem({
          name: "",
          description: "",
          price: "",
        });
      } else {
        console.error("Failed to add item:", response.statusText);
        // 显示错误信息
        alert(`Failed to add item: ${response.statusText}`);
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
    <div className="flex flex-row justify-center items-center gap-5 mt-5">
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
      <button className="btn" onClick={addItem}>
        Add Item
      </button>
    </div>
  );
}
