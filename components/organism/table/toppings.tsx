import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import useSWRImmutable from 'swr/immutable';

import ToppingForm from '@/components/organism/form/topping';
import Button from '@/components/atoms/button';
import Modal from '@/components/atoms/modal';
import Paper from '@/components/atoms/paper';

import { CommonResponse, GetToppingsResponse } from 'interfaces/api';
import { Topping } from 'interfaces/object';
import { createAxiosRequestConfig, deleteTopping, getToppings, updateTopping } from 'utils/api';

export default function TableTopping() {
  const [show, setShowModal] = useState(false)
  const [selectedTopping, setSelectedTopping] = useState<Topping>()
  const { data, error, mutate } = useSWRImmutable<GetToppingsResponse, Error>('/toppings', getToppings)
  
  const onClickUpdate = (item: Topping) => {
    setShowModal(true)
    setSelectedTopping(item)
  }

  const onMutationUpdate = async (topping: Topping) => {
    const filteredData = data?.payload.filter(item => item.id != topping.id) || []
    const newToppingData: GetToppingsResponse = {
      message: data?.message as string,
      payload: [
        ...filteredData,
        topping,
      ].sort((a, b) => b.id - a.id)
    }
    await mutate(newToppingData, false)
  }
  const onClickAdd = () => {
    setShowModal(true)
    setSelectedTopping(undefined)
  }

  // always reset state on close modal
  const onCloseModal = () => {
    setShowModal(false)
  }
  
  // refetch after submitting topping data
  const onUpdateTopping = () => {
    setShowModal(false)
    mutate()
  }

  const onUpdateAvailability = async (e: ChangeEvent<HTMLInputElement>, item: Topping) => {
    const config = createAxiosRequestConfig({
      'Content-Type': 'application/json'
    })
    const data: Record<string, any> = {
      is_available: e.target.checked
    }
    try {
      await updateTopping<CommonResponse>(parseInt(e.target.id, 10), data, config)
      const updatedTopping: Topping = { ...item, is_available: data.is_available }
      await onMutationUpdate(updatedTopping)
    } catch (error) {
      console.log(error)
    }
  }

  const onDeleteTopping = async (id: number) => {
    try {
      await deleteTopping<CommonResponse>(id)
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
                <td className="w-12">
                  <Image src={item.image} alt={item.name} objectFit="cover" layout="responsive" width={50} height={50} className="rounded-md"/>
                </td>
                <td>{item.price}</td>
                <td><input type="checkbox" id={`${item.id}`} name={item.name}  
                  checked={item.is_available} 
                  onChange={(e) => onUpdateAvailability(e, item)}/>
                </td>
                <td>
                  <Button id={`update-${item.id}`} 
                    variant="contained" color="secondary" 
                    onClick={() => onClickUpdate(item)} 
                    className="py-1 m-1 w-20"
                    style={{padding: '0.25rem'}}
                  >Update</Button>
                  <Button id={`delete-${item.id}`} 
                    variant="outlined" color="danger" 
                    onClick={() => onDeleteTopping(item.id)}
                    className="py-1 m-1 w-20"
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
          <p className="text-3xl mb-4 text-center text-primary">{selectedTopping ? 'Update': 'New'} Topping</p>
          <ToppingForm oldProduct={selectedTopping} isUpdate={selectedTopping ? true : false} onSubmitSuccess={onUpdateTopping}/>
        </Paper>
      </Modal>
    </>
  )
}
