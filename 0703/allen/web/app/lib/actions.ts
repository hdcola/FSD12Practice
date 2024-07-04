export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  imageType: string | null;
  imageFileName: string | null;
}

export const fetchItems = async (): Promise<Item[]> => {
  const res = await fetch(`http://100.89.152.5:8080/api/items`);
  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }
  const data: Item[] = await res.json();
  return data;
};
