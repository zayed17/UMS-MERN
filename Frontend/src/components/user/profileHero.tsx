import { useState,useRef } from "react";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ProfileHero() {
  const navigate = useNavigate()

  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: "top-right",
    });
  };

  const fileRef = useRef<HTMLInputElement>(null);
  
  const currentUser = useSelector(
    (state: { user: { currentUser: any } }) => state.user.currentUser
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image,setimage] = useState<any>(null)

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleUpload = (e:any) =>{
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setimage({data:reader.result,filename: file.name});
      };
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit =  async(e:any) =>{
    e.preventDefault()
    
    console.log(image,"image");
    const formdata: { [key: string]: any } = {};
    if(image!=null && image!==currentUser.image){
      formdata.image= image.filename;
    }

    if(name!='' && name!==currentUser.name){
      formdata.name = name
    }

    if(email!='' && email!==currentUser.email){
      formdata.email = email
    }

    if (password !== '' && password.length >= 8) {
      formdata.password = password
    }

    if (Object.keys(formdata).length === 0) {
      return;
  }

  formdata._id = currentUser._id;

    const res = fetch("http://localhost:5000/api/users/updateProfile",{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdata),
    })

    const data = await (await res).json();
    console.log(data);
    
    if(data.success){
      toggleModal()
    }
  }

  return (
    <div style={{ backgroundColor: "#0e387a", height: "100vh" }}>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
          <div className="flex justify-end px-4 pt-4">
            <div
              onClick={toggleModal}
              data-modal-target="authentication-modal"
              data-modal-toggle="authentication-modal"
              className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5 items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_2K8naWlXYjt_jVlFPSrF6BL9K-cOQhBwtVL7_rcOGQ&s"
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {currentUser?.name}
            </h5>
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              {currentUser?.email}
            </h3>
          </div>
        </div>
      </div>

      {/* Modal */}
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
                  onClick={toggleModal}
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
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input hidden type="file" ref={fileRef} name="photo" accept="image/*" onChange={handleUpload} id="photo"  />

                  <div className="flex items-center justify-center">
                    <div>
                      <img
                        className="w-24 h-24 rounded-full shadow-lg"
                        src={image?.data || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_2K8naWlXYjt_jVlFPSrF6BL9K-cOQhBwtVL7_rcOGQ&s"}
                        alt="Bonnie image"
                        onClick={()=>fileRef?.current?.click()}
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
                      defaultValue={currentUser.name}
                      placeholder="name"
                      onChange={(e)=>setName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      defaultValue={currentUser.email}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      onChange={(e)=>setEmail(e.target.value)}
                      
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      onChange={(e)=>setPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      
                    />
                  </div>

                  <button onClick={showToastMessage} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default ProfileHero;
