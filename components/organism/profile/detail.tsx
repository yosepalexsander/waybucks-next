import Image from 'next/image'
import { User } from 'interfaces/object'

type DetailProfileProps = {
  user: User | undefined
}

export default function DetailProfile({user}: DetailProfileProps) {
  return (
    <section id="profile">
      <h1 className="h2 pb-4">My Profile</h1>
      <div className="flex flex-container">
        <div className="profile-img flex-item">
          {user?.image ? (
            <Image src={user?.image as string} alt="user profile img" layout="responsive" width={50} height={50} 
              className="rounded-md" objectFit="cover" />
          ) : (
            <p className="profile-img-placeholder">
              {user?.name.substr(0,2).toUpperCase()}
            </p>
          )}
        </div>
        <div className="profile-info flex-item">
          <div>
            <p className="h4">Name</p>
            <p>{user?.name}</p>
          </div>
          <div>
            <p className="h4">Email</p>
            <p>{user?.email}</p>
          </div>
          <div>
            <p className="h4">Phone</p>
            <p>{user?.phone.replace(/\w{3}$/, 'XXX')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
