import React, { useRef, useState } from 'react';
import { useAddUserMutation } from '../../redux/admin/adminApi';

interface AdminAddUserProps {
  isAddModalOpen: boolean;
  AddModal: () => void;
}

const AdminAddUser: React.FC<AdminAddUserProps> = ({ isAddModalOpen, AddModal }) => {
  const [image, setImage] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const hiddenInputRef = useRef<HTMLInputElement>(null);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const [addUser] = useAddUserMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setNameError('');
    setEmailError('');
    setPasswordError('');
  
    let isValid = true;
  
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    }
  
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }
  
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    }
  
    if (!isValid) {
      return;
    }
  
    console.log(name,email,password,image)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image ?? "");
  
    console.log(formData)
    try {
      await addUser(formData).unwrap();
      AddModal()
      window.location.href = "/admin/dashboard"
      setImage(null);
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  
  const handleImageClick = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };
  
  return (
    <>
      {isAddModalOpen && (
        <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between p-2 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white"> Add User </h3>
                <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={AddModal}>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input hidden type="file" name="image" ref={hiddenInputRef} accept="image/*" id="photo" onChange={handleImageChange} />
                  <div className="flex items-center justify-center">
                    <div>
                      <img onClick={handleImageClick} className="w-24 h-24 rounded-full shadow-lg" src={image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_2K8naWlXYjt_jVlFPSrF6BL9K-cOQhBwtVL7_rcOGQ&s"} alt="User image" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${nameError && 'border-red-500'}`} placeholder="Name" />
                    {nameError && <span className="text-red-500 text-sm">{nameError}</span>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${emailError && 'border-red-500'}`} placeholder="Email" />
                    {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${passwordError && 'border-red-500'}`} placeholder="Password" />
                    {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
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
    </>
  );
}

export default AdminAddUser;
