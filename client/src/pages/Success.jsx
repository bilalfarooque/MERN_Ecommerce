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
                    borderRadius: 5,
                    padding: '20px',
                    backgroundColor: 'green',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer'
                }} onClick={successHandler}>
                    Success
                </button>
        </div>
    )
}

export default Success