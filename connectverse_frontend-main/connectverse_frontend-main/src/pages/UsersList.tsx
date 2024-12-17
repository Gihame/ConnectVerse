import React from 'react'
import { Toaster } from 'sonner';
import { News, Sidebar } from '../components';
import UserTable from '../components/UserTable';

const UsersList = () => {
  return (
    <div className="bg-[#0E1225] h-screen w-screen flex p-0 m-0">
      <Toaster position="top-right" richColors />
      <Sidebar />
      <div className="main">
              {/* <Tweets data={usersData} /> */}
              <UserTable/>
      </div>
      {/* <div className="right">
        <News />
      </div> */}
    </div>
  );
}

export default UsersList