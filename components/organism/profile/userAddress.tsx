import { useState } from 'react';

import { deleteAddress } from 'utils/api';
import { Address } from 'interfaces/object';
import { CommonResponse } from 'interfaces/api';

import AddressForm from '@/components/organism/form/address';
import AddressCard from '@/components/moleculs/address';
import Paper from '@/components/atoms/paper';
import Button from '@/components/atoms/button';
import Modal from '@/components/atoms/modal';

import { DeleteIcon } from 'icons';

type UserAddressProps = {
  address: Address[] | undefined,
  mutator: any
}

export default function UserAddress({address, mutator}: UserAddressProps) {
  const [show, setShowModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<Address>()
  
  // show modal, set old address, pass to form input 
  const onClickUpdate = (item: Address) => {
    setShowModal(true)
    setSelectedAddress(item)
  }

  const onClickAdd = () => {
    setShowModal(true)
    setSelectedAddress(undefined)
  }

  // always reset state on close modal
  const onCloseModal = () => {
    setShowModal(false)
  }
  
  // refetch after submitting address data
  const onUpdateAddress = () => {
    setShowModal(false)
    mutator()
  }

  const onDeleteAddress = async (id: number) => {
    try {
      await deleteAddress<CommonResponse>(id)
      await mutator()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <section id="user-address">
      <span>
        <h1 className="h2">My Address</h1>
        <Button onClick={onClickAdd} variant="contained" color="warning" className="py-1">Add New</Button>
      </span>
      <div className="address-list flex-container">
        {address?.map(item => (
          <div key={item.id} className="flex-item">
            <Paper>
              <AddressCard item={item} />
              <div className="address-action">
                <Button variant="outlined" color="primary" className="w-4/5" onClick={() => onClickUpdate(item)}>Change Address</Button>
                <DeleteIcon size="2rem" className="text-primary" onClick={() => onDeleteAddress(item.id)}/>
              </div>
            </Paper>
          </div>
        ))}
      </div>
      <Modal open={show} onClose={onCloseModal}>
        <Paper width="24rem" transform="translate(-50%, -50%)" top="50%" left="50%" 
          padding={16} position="absolute" display="flex" flexDirection="column" alignItems="center">
          <p className="text-3xl mb-4 text-center text-primary">{selectedAddress ? 'Update': 'New'} Address</p>
          <AddressForm oldAddress={selectedAddress} isUpdate={selectedAddress ? true : false} onSubmitSuccess={onUpdateAddress}/>
        </Paper>
      </Modal>
    </section>
  )
}
