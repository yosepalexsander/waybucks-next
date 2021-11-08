import { Product } from 'interfaces/object';

import Paper from '@/components/atoms/paper';
import CardContent from '@/components/atoms/card/content';
import CardMedia from '@/components/atoms/card/media';

import style from '@/components/moleculs/card.module.css';

type CardProps = {
  width?: string | number | undefined
  item: Product,
}

export default function Card({item}: CardProps) {
  const price = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)
  return (
    <div className={style.card}>
      <Paper width="100%" backgroundColor="#FEE2E2">
        <CardMedia src={item.image} height={250} alt={item.name}/>
        <CardContent>
          <p className={style.cardTitle}>{item.name}</p>
          <p className={style.cardBody}>{price}</p>
        </CardContent>
      </Paper>
    </div>
  )
}
