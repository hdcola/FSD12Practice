export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export async function fetchItems(): Promise<Item[]> {
  const response = await fetch("http://100.89.152.5:8080/api/items");
  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  const items = await response.json();
  return items.map((item: any) => ({
    ...item,
    imageId: item.imageId || null,
  }));
}
