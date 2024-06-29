import { useLocation, useNavigate } from "react-router-dom"

const Success = () => {
    const location = useLocation()
    const naviagte = useNavigate()
    const successHandler = () =>{
        naviagte('/')
    }
    console.log(location)
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
                <button style={{
                    border: 'none',
                    width: 120,
                    borderRadius: "5px",
                    padding: '15px',
                    backgroundColor: 'green',
                    color: 'white',
                    fontSize: "25px",
                    fontWeight: '700',
                    cursor: 'pointer',
                    textAlign: "center",
                }} onClick={successHandler}>
                    Success
                </button>
        </div>
    )
}

export default Success