import { z } from 'zod';

const FormSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),

});

// export async function add(item: ItemType): Promise<ItemType> {
// }