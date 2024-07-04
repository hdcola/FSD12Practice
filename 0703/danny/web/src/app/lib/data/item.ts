import { z } from 'zod';
import { ItemType } from '@/app/lib/data/definitions';

const FormSchema = z.object({
    id: z.number(),
    name: z.string({ message: 'Name is required', required_error: 'Name is required' }),
    description: z.string(),
    price: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
});

export type State = {
    errors?: {
        name?: string[];
        description?: string[];
        price?: number[];
    };
    message?: string | null;
};


export async function addItem(formData: FormData): Promise<ItemType> {
    const item: ItemType = {
        id: 0,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
    };

    const response = await fetch("http://localhost:8080/api/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
    if (!response.ok) {
        throw new Error("Failed to add item");
    }
    return await response.json();
}

export async function getItems(): Promise<ItemType[]> {
    const response = await fetch("http://localhost:8080/api/items");
    if (!response.ok) {
        throw new Error("Failed to fetch items");
    }
    return await response.json();
}

export async function getItem(id: number): Promise<ItemType> {
    const response = await fetch(`http://localhost:8080/api/items/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch item");
    }
    return await response.json();
}

export async function updateItem(formData: FormData, id: number): Promise<ItemType> {
    const item: ItemType = {
        id: id,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
    };

    const response = await fetch(`http://localhost:8080/api/items/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
    if (!response.ok) {
        throw new Error("Failed to update item");
    }
    return await response.json();
}