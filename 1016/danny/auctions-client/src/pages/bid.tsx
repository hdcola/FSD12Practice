import { useParams } from 'react-router-dom';
import { Auction, formatDate } from '../components/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button, Input } from '@nextui-org/react';

interface BidFormProps {
  sellerEmail: string;
  lastPrice: number;
}

export const Bid = () => {
  const { id } = useParams<{ id: string }>();

  const {
    isLoading,
    error,
    data: auction,
    refetch,
  } = useQuery<Auction>({
    queryKey: ['auctions-list'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/api/auctions/${id}`);
      return res.data;
    },
    refetchInterval: 3000,
  });

  const bidLastPrice = auction?.lastPrice ?? 0;

  const schema = yup.object().shape({
    sellerEmail: yup.string().email().required(),
    lastPrice: yup
      .number()
      .required()
      .moreThan(
        bidLastPrice,
        `Last Price must be greater than ${bidLastPrice}`
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BidFormProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: BidFormProps) => {
    try {
      const resp = await axios.patch(
        `http://localhost:3000/api/auctions/${id}/bid`,
        data
      );
      if (resp.status === 200) {
        refetch();
      } else {
        console.error('Failed to bid auction' + resp.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{auction?.itemName}</h1>
      <div className="space-y-2">
        <p className="text-gray-700">{auction?.itemDescription}</p>
        <p className="text-gray-500">Seller: {auction?.sellerEmail}</p>
        <p className="text-gray-500">Last Bidder: {auction?.lastBidderEmail}</p>
        <p className="text-gray-500">Last Price: ${auction?.lastPrice}</p>
        <p className="text-gray-500">
          Created At: {formatDate(auction?.createdAt?.toString() ?? '')}
        </p>
        <p className="text-gray-500">
          Updated At: {formatDate(auction?.updatedAt?.toString() ?? '')}
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Input
                isRequired
                type="email"
                label="Seller Email"
                {...register('sellerEmail')}
              />
              {errors.sellerEmail && (
                <div className="text-red-600 text-sm mt-1">
                  {errors.sellerEmail.message}
                </div>
              )}
            </div>
            <div>
              <Input
                isRequired
                type="number"
                label="Last Price(Starting Price)"
                placeholder="0.00"
                defaultValue={bidLastPrice.toString()}
                {...register('lastPrice')}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
              />
              {errors.lastPrice && (
                <div className="text-red-600 text-sm mt-1">
                  {errors.lastPrice.message}
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
    </div>
  );
};
