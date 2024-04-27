import { useAuthentication } from "../../hook/AuthHook";
import {useNavigate} from "react-router-dom"
function Home() {
  const {isLoading,isLoggedIn} = useAuthentication()
  const navigate = useNavigate()

  if(isLoading){
    return <div>Loading</div>
  }

  if(!isLoggedIn){
    navigate('/login')
    return null
  }
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right, #0e387a, #4a90e2)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "400px",
          textAlign: "center",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1
          style={{
            color: "#0e387a",
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Welcome back to our website!
        </h1>
        <p
          style={{
            color: "#555",
            fontSize: "18px",
            lineHeight: "1.5",
          }}
        >
          set ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Etiam euismod suscipit semper.
        </p>
      </div>
    </div>
  );
}

export default Home;
