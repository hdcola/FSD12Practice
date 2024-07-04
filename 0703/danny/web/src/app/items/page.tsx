"use client";
import React, { useEffect, useState } from "react";
import { ItemType } from "../lib/data/definitions";
import { getItems } from "../lib/data/item";
import Link from "next/link";

export default function Page() {
  const [items, setItems] = useState<ItemType[]>([]);
  useEffect(() => {
    getItems().then((items) => setItems(items));
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full">
        <div className="flex flex-col w-full items-center justify-between">
          <h1 className="`{$lusitana.className}` text-2xl">Items</h1>
          <table className="table w-full text-gray-900">
            <thead className="rounded">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col" className="w-11">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/items/${item.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <a href="/items/add" className="btn btn-primary">
            Add Item
          </a>
        </div>
      </div>
    </main>
  );
}
