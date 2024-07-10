// action.ts

export interface ExtraOption {
  id: number;
  name: string;
  price: number;
}

export interface OptionCategory {
  id: number;
  name: string;
  max_selection: number;
  min_selection: number;
  required: boolean;
  multiple: boolean;
  allow_custom: boolean;
  allow_quantity: boolean;
  extra_options: ExtraOption[];
}

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  optionCategories?: OptionCategory[];
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
        name: "Sample Dish",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 16.43,
        image_url: "",
        optionCategories: [],
      },
    ];
  }
}
