import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import useSWRImmutable from 'swr/immutable';

import { CommonResponse, GetProductsResponse } from 'interfaces/api';
import { Product } from 'interfaces/object';
import { createAxiosRequestConfig, deleteProduct, getProducts, updateProduct } from 'utils/api';

import Button from '@/components/atoms/button';
import Modal from '@/components/atoms/modal';
import Paper from '@/components/atoms/paper';
import ProductForm from '../form/product';

export default function TableProduct() {
  const [show, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const { data, error, mutate } = useSWRImmutable<GetProductsResponse, Error>('/products', getProducts)

  const onMutationUpdate = async (product: Product) => {
    const filteredData = data?.payload.filter(item => item.id != product.id) || []
    const newProductData: GetProductsResponse = {
      message: data?.message as string,
      payload: [
        ...filteredData,
        product,
      ].sort((a, b) => b.id - a.id)
    }
    await mutate(newProductData, false)
  }
  const onClickUpdate = (item: Product) => {
    setShowModal(true)
    setSelectedProduct(item)
  }

  const onClickAdd = () => {
    setShowModal(true)
    setSelectedProduct(undefined)
  }

  // always reset state on close modal
  const onCloseModal = () => {
    setShowModal(false)
  }
  
  // refetch after submitting product data
  const onUpdateProduct = () => {
    setShowModal(false)
    mutate()
  }

  const onUpdateAvailability = async (e: ChangeEvent<HTMLInputElement>, item: Product) => {
    const data: Record<string, any> = {
      is_available: e.target.checked
    }
    const config = createAxiosRequestConfig({
      'Content-Type': 'application/json'
    })
    try {
      await updateProduct<CommonResponse>(parseInt(e.target.id, 10), data, config)
      const updatedProduct: Product = { ...item, is_available: data.is_available }
      await onMutationUpdate(updatedProduct)
    } catch (error) {
      console.log(error)
    }
  }

  const onDeleteproduct = async (id: number) => {
    try {
      await deleteProduct<CommonResponse>(id)
      await mutate()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={onClickAdd} variant="contained" color="warning" className="mb-2">Add New</Button>
      </div>
      <div className="overflow-auto">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.payload.map((item, index) => (
              <tr key={item.id}>
                <td>{index}</td>
                <td>{item.name}</td>
                <td  className="w-12">
                  <Image src={item.image} alt={item.name} objectFit="cover" layout="responsive" width={50} height={50} className="rounded-md"/>
                </td>
                <td>{item.price}</td>
                <td>
                  <input type="checkbox" name={item.name} 
                    id={`${item.id}`} checked={item.is_available} 
                    onChange={(e) => onUpdateAvailability(e, item)}/>
                </td>
                <td>
                  <Button id={`update-${item.id}`} 
                    variant="contained" color="secondary" 
                    onClick={() => onClickUpdate(item)} 
                    className="m-1 w-20"
                    style={{padding: '0.25rem'}}
                  >Update</Button>
                  <Button id={`delete-${item.id}`} 
                    variant="outlined" color="danger" 
                    onClick={() => onDeleteproduct(item.id)}
                    className="m-1 w-20"
                    style={{padding: '0.25rem'}}
                  >Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={show} onClose={onCloseModal}>
        <Paper width="100%" maxWidth="24rem" transform="translate(-50%, -50%)" top="50%" left="50%" 
          padding={16} position="absolute" display="flex" flexDirection="column" alignItems="center">
          <p className="text-3xl mb-4 text-center text-primary">{selectedProduct ? 'Update': 'New'} Product</p>
          <ProductForm oldProduct={selectedProduct} isUpdate={selectedProduct ? true : false} onSubmitSuccess={onUpdateProduct} />
        </Paper>
      </Modal>
    </>
  )
}