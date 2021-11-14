import Image from 'next/image'
import { User } from 'interfaces/object'

type DetailProfileProps = {
  user: User | undefined
}

export default function DetailProfile({user}: DetailProfileProps) {
  return (
    <section id="profile" className="w-full mb-4">
      <h1 className="h2 pb-4">My Profile</h1>
      <div className="flex flex-container">
        <div className="w-32 h-32 sm:w-64 sm:h-64 flex-item">
          {user?.image ? (
            <Image src={user?.image as string} alt="user profile img" layout="responsive" width={50} height={50} 
              className="rounded-md" objectFit="cover" />
          ) : (
            <p className="h-full bg-secondary text-white flex items-center justify-center text-8xl rounded-md">
              {user?.name.substr(0,2).toUpperCase()}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-between flex-item">
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
