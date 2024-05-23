import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React, { memo } from "react";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60px;
  background-color: rgba(111, 211, 203, 0.3);
  position : sticky;
  top: 0;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  outline: none;
  margin-right: -15px;
  padding-left: 4px;
  ${mobile({ width: "120px" })}
`;
const Center = styled.div`
  flex: 1;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({ flex: 1, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="search" />
            <Search style={{ color: "grey", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>FITTED.</Logo>
        </Center>
        <Right>
          <MenuItem>
            <Badge color="primary" badgeContent={4}>
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>

          <MenuItem>LOGOUT</MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default memo(Navbar);
