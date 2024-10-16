import {
  Button,
  ButtonGroup,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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

export const Home = () => {
  const { isLoading, error, data } = useQuery<Auction[]>({
    queryKey: ['auctions-list'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/auctions');
      return res.data;
    },
  });

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'itemName', label: 'Name' },
    { key: 'itemDescription', label: 'Description' },
    { key: 'sellerEmail', label: 'Seller' },
    { key: 'lastBidderEmail', label: 'Last Bidder' },
    { key: 'lastPrice', label: 'Last Price' },
    { key: 'createdAt', label: 'Create' },
    { key: 'updatedAt', label: 'Update' },
    { key: 'action', label: 'Action' },
  ];

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const rows = data || [];

  return (
    <Table isStriped fullWidth aria-label="Auctions list">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows} isLoading={isLoading}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === 'createdAt' || columnKey === 'updatedAt' ? (
                  formatDate(getKeyValue(item, columnKey))
                ) : columnKey === 'action' ? (
                  <ButtonGroup size="sm">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </ButtonGroup>
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
