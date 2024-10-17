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
import { useNavigate } from 'react-router-dom';
import { Auction, formatDate } from '../components/types';

export const Home = () => {
  const navigator = useNavigate();

  const { isLoading, error, data, refetch } = useQuery<Auction[]>({
    queryKey: ['auctions-list'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/auctions');
      return res.data;
    },
  });

  const handleDelete = async (id: number) => {
    try {
      const resp = await axios.delete(
        `http://localhost:3000/api/auctions/${id}`
      );
      if (resp.status === 204) {
        refetch();
      } else {
        console.error('Failed to delete auction');
        console.error(resp);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
                    <Button
                      onClick={() => navigator(`/auctions/bid/${item.id}`)}
                    >
                      Bid
                    </Button>
                    <Button onClick={() => handleDelete(item.id)}>
                      Delete
                    </Button>
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
