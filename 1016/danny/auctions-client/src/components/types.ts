const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
};

interface Auction {
  id: number;
  itemName: string;
  itemDescription: string;
  sellerEmail: string;
  lastBidderEmail: string;
  lastPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export { formatDate };
export type { Auction };