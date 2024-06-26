import styled from "styled-components"
import { mobile } from "../responsive"
import { Link } from "react-router-dom"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(190, 192, 192, 0.5),
    rgba(255,255,255,0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: #e4e6e5;
    ${mobile({ width: "75%" })}
    /* border: 5px solid teal; */
    border-radius: 5px;
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 10px;
`
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`
const Register = () => {
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="name" />
                    <Input placeholder="last name" />
                    <Input placeholder="user name" />
                    <Input placeholder="email" />
                    <Input placeholder="password" />
                    <Input placeholder="confirm password" />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                        {/* <Link to='/login' style={{color:'inherit'}}>ALREADY HAVE AN ACCOUNT</Link> */}
                    </Agreement>
                    
                    <Button>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register
