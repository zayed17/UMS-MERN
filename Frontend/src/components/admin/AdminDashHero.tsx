import React, { useState, useEffect, useRef } from 'react';
import { useGetUserMutation, useUpdateUserMutation, useDeleteUserMutation,useSearchUserMutation } from '../../redux/admin/adminApi';
import Swal from 'sweetalert2';
import AdminAddUser from './AdminAddUser';
import { useAdminAuthentication } from '../../hook/AuthHook';
import { useNavigate } from 'react-router-dom';

interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  image?: string | null;
}

export default function AdminDashHero() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {isFetching,isLoggedIn} = useAdminAuthentication()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [getUser] = useGetUserMutation();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null >(null);
  const [formData, setFormData] = useState<User>({ name: "", email: "",_id:"" });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({ name: "", email: "" });
  const fileRef = useRef<HTMLInputElement>(null);
  const [data] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [searchUser] = useSearchUserMutation();
  const [image, setimage] = useState<any>(null);
  const [search, setSearch] = useState<string>();
  const navigate = useNavigate()

  const validateForm = () => {
    let errors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageChange = (event: any) => {
    setimage(event.target.files[0]);
  };

  const handleSearch = async(e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    const response = await searchUser(e.target.value).unwrap()
    if(response.user == undefined){
      setUsers([])
    }else{
      setUsers(response.user);
    }

  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };
  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
  
    console.log(image,"dfs")

    try {
      const NewformData = new FormData();
  
      if (formData.name !== selectedUser?.name) {
        NewformData.append("name", formData.name); 
      }
      if (formData.email !== selectedUser?.email) {
        NewformData.append("email", formData.email); 
      }
        NewformData.append("image", image);
      
   
        if (!NewformData.entries().next().done)  {
          NewformData.append("_id", selectedUser?._id ?? "");
        } else {
          return;
        }

        const response = await data(NewformData).unwrap();

        if(response.success){
          closeAndOpen() 
          window.location.href = "/admin/dashboard"
        }
  
      console.log('User updated successfully:', response);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteUser(id).unwrap();
          if (res.success) {
            window.location.href = '/admin/dashboard'
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUser({}).unwrap();
        setUsers(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getUser]);

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    }
  }, [selectedUser]);

  if(isFetching){
    return <div>Loading</div>
  }

  if(!isLoggedIn){
    navigate('/admin')
    return null
  }

  function closeAndOpen() {
    setIsModalOpen(!isModalOpen)
  }
  function AddModal() {
    setIsAddModalOpen(!isAddModalOpen)
  }


  return (
    <section className="bg-gray-300 min-h-screen  items-center">
      <div className="w-full md:max-w-4xl mx-auto p-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-500 mb-6 text-center">Admin Dashboard</h1>
        <div className="overflow-x-auto">
        <button onClick={AddModal} className="bg-gray-500  hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2">Add</button>
        <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              className="border bg-white border-gray-400 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:border-green-500"
            />
        <table className="w-full md:min-w-full my-2 bg-white shadow-md rounded">
  <thead className="bg-gray-500">
    <tr>
      <th className="py-3 px-6 text-left text-xs sm:text-sm md:text-base font-medium text-white uppercase">No</th>
      <th className="py-3 px-6 text-left text-xs sm:text-sm md:text-base font-medium text-white uppercase">Image</th>
      <th className="py-3 px-6 text-left text-xs sm:text-sm md:text-base font-medium text-white uppercase">Name</th>
      <th className="py-3 px-6 text-left text-xs sm:text-sm md:text-base font-medium text-white uppercase">Email</th>
      <th className="py-3 px-6 text-left text-xs sm:text-sm md:text-base font-medium text-white uppercase">Edit</th>
      <th className="py-3 px-6 text-left text-xs sm:text-sm md:text-base font-medium text-white uppercase">Delete</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-300">
    {users.length === 0 ? (
      <tr>
        <td colSpan={5} className="py-4 px-6 text-center text-gray-600">No users found</td>
      </tr>
    ) : (
      users.map((user, index) => (
        <tr key={user._id}>
          <td className="py-4 px-6">{index + 1}</td>
          <td className="py-4 px-6"><img  src={`/src/assets/${user.image}`}  alt="No image"  style={{ borderRadius: '50%', width: '50px', height: '50px' }} /></td>
          <td className="py-4 px-6">{user.name}</td>
          <td className="py-4 px-6">{user.email}</td>
          <td className="py-4 px-3">
            <button onClick={() => { setSelectedUser(user), closeAndOpen() }} className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2">Edit</button>
          </td>
          <td className="py-4 px-3">
            <button onClick={() => handleDelete(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>


        </div>
      </div>
      {isModalOpen && (
        <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex  justify-between p-2 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl  font-semibold text-gray-900 dark:text-white">
                  Edit profile
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeAndOpen}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form onSubmit={formSubmit} className="space-y-4">
                  <input
                    hidden
                    type="file"
                    onChange={handleImageChange}
                    ref={fileRef}
                    name="image"
                    accept="image/*"
                    id="photo"
                  />
                  <div className="flex items-center justify-center">
                    <div>
                      <img
                        className="w-24 h-24 rounded-full shadow-lg"
                        src={`/src/assets/${formData?.image}` ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_2K8naWlXYjt_jVlFPSrF6BL9K-cOQhBwtVL7_rcOGQ&s"}
                        alt="Bonnie image"
                        onClick={() => fileRef?.current?.click()}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${formErrors.name && 'border-red-500'}`}
                      placeholder="name"
                    />
                    {formErrors.name && <span className="text-red-500 text-sm">{formErrors.name}</span>}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${formErrors.email && 'border-red-500'}`}
                      placeholder="name@company.com"
                    />
                    {formErrors.email && <span className="text-red-500 text-sm">{formErrors.email}</span>}
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
<AdminAddUser isAddModalOpen={isAddModalOpen} AddModal={AddModal} />
    </section>
  );
}
