import type { ReactNode } from 'react';
import { Product } from 'interfaces/object';

import Paper from '@/components/atoms/paper';
import CardContent from '@/components/atoms/card/content';
import CardMedia from '@/components/atoms/card/media';

type CardProps = {
  maxWidth: string | number | undefined
  item: Product,
}

export default function Card({item, maxWidth}: CardProps) {
  const price = Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)
  return (
    <div className="bg-red-200 rounded-md shadow">
      <Paper maxWidth={maxWidth}>
        <CardMedia src={item.image} height={150} alt={item.name}/>
        <CardContent>
          <p className="h4">{item.name}</p>
          <p className="text-yellow-500">{price}</p>
        </CardContent>
      </Paper>
    </div>
  )
}
