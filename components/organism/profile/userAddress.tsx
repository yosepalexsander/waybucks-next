import { useState } from 'react';
import { useSWRConfig } from 'swr';

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
  address: Address[] | undefined
}

export default function UserAddress({address}: UserAddressProps) {
  const {mutate} = useSWRConfig()
  const [show, setShowModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<Address>()
  const onClickUpdate = (item: Address) => {
    setShowModal(true)
    setSelectedAddress(item)
  }
  
  const onUpdateAddress = () => {
    setShowModal(false)
    mutate('/address')
  }

  const onDeleteAddress = async (id: number) => {
    try {
      await deleteAddress<CommonResponse>(id)
      await mutate('/address')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <section id="address" className="w-full">
      <h1 className="h2 mb-4">My Address</h1>
      <div className="address-list flex-container">
        {address?.map(item => (
          <div key={item.id} className="flex-item">
            <Paper>
              <AddressCard item={item} />
              <div className="flex items-center justify-between p-2">
                <Button variant="outlined" color="primary" className="w-4/5" onClick={() => onClickUpdate(item)}>Change Address</Button>
                <DeleteIcon size="2rem" className="text-primary" onClick={() => onDeleteAddress(item.id)}/>
              </div>
            </Paper>
          </div>
        ))}
      </div>
      <Modal open={show} onClose={() => setShowModal(false)}>
        <Paper width="24rem" transform="translate(-50%, -50%)" top="50%" left="50%" padding={16} position="absolute">
          <p className="text-3xl mb-4 text-center text-primary">Update Address</p>
          <AddressForm oldAddress={selectedAddress} isUpdate={true} onSubmitSuccess={onUpdateAddress}/>
        </Paper>
      </Modal>
    </section>
  )
}
