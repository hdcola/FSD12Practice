import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AuctionFormProps {
  itemName: string;
  itemDescription: string;
  sellerEmail: string;
  lastPrice?: number;
}

export const CreateAuction = () => {
  const navtigate = useNavigate();
  const schema = yup.object().shape({
    itemName: yup.string().required(),
    itemDescription: yup.string().required(),
    sellerEmail: yup.string().email().required(),
    lastPrice: yup.number(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors: error },
  } = useForm<AuctionFormProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AuctionFormProps) => {
    try {
      const resp = await axios.post('http://localhost:3000/api/auctions', data);
      if (resp.status === 201) {
        navtigate('/');
      } else {
        console.error('Failed to create auction' + resp.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-4 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Auction</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <Input
              isRequired
              type="text"
              label="Item Name"
              {...register('itemName')}
            />
            {error.itemName && (
              <div className="text-red-600 text-sm mt-1">
                {error.itemName.message}
              </div>
            )}
          </div>
          <div>
            <Textarea
              isRequired
              label="Item Description"
              {...register('itemDescription')}
            />
            {error.itemDescription && (
              <div className="text-red-600 text-sm mt-1">
                {error.itemDescription.message}
              </div>
            )}
          </div>
          <div>
            <Input
              isRequired
              type="email"
              label="Seller Email"
              {...register('sellerEmail')}
            />
            {error.sellerEmail && (
              <div className="text-red-600 text-sm mt-1">
                {error.sellerEmail.message}
              </div>
            )}
          </div>
          <div>
            <Input
              type="number"
              label="Last Price(Starting Price)"
              placeholder="0.00"
              {...register('lastPrice')}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
            {error.lastPrice && (
              <div className="text-red-600 text-sm mt-1">
                {error.lastPrice.message}
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <Button type="submit" color="primary">
              Create Auction
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
