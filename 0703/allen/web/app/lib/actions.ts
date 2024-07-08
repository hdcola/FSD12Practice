export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export async function fetchItems(): Promise<Item[]> {
  try {
    const response = await fetch("http://100.89.152.5:8080/api/items");
    if (!response.ok) {
      throw new Error("Failed to fetch items from api");
    }
    const items = await response.json();
    return items.map((item: any) => ({
      ...item,
      imageId: item.imageId || null,
    }));
  } catch (error) {
    console.error("Error fetching items:", error);
    return [
      {
        id: 1,
        name: "All Dressed Baguette",
        description:
          "All dressed baguette topped with choice of chipotle, Thai, marinara, sub-marine, or meat sauce.",
        price: 16.43,
        image_url: "",
      },
    ];
  }
}
