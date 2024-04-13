import styled from "styled-components";

function DeleteButton() {
  const Button = styled.button`
    width: 100px;
    height: 35px;
    padding: 0 24px;
    justify-content: center;
    align-items: center;
    border-radius: 200px;
    border: none;
    background: var(--brown40);
    color: var(--grayScale10);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  `;

  return <Button>삭제하기</Button>;
}

export default DeleteButton;
