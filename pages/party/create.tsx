import { NextPage } from "next";
import { useRef, FormEvent } from "react";
import styled from "@emotion/styled";
import Create from "@components/party/create/Create";
import SearchMap from "@components/party/create/SearchMap";
import useSearchPlace from "@hooks/useSearchPlace";

const Wrapper = styled.form`
display: flex;
flex0direction: column;
justify-content: space-between:
height: 100%;`;

const Header = styled.header({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "45px !important",
  boxShadow:
    "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
});

const BackBtn = styled.button({
  position: "absolute",
  top: "50%",
  left: 0,
  transform: "translateY(-50%)",
  padding: "10px 14px",
});

const SubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 1rem;
  background-color: orange;
  color: #fff;
`;

const CreatePage: NextPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    marker,
    setMap,
    keyword,
    resultList,
    reset,
    handleChangeSearchBox,
    handleClickPlace,
  } = useSearchPlace();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // post
    console.log(formRef);
  };

  return (
    <Wrapper ref={formRef} onSubmit={handleSubmit}>
      <Header>
        <BackBtn>뒤로가기</BackBtn>
        <div>파티 생성</div>
      </Header>
      <Create>
        <SearchMap
          marker={marker}
          setMap={setMap}
          resultList={resultList}
          keyword={keyword}
          reset={reset}
          handleChangeSearchBox={handleChangeSearchBox}
          handleClickPlace={handleClickPlace}
        />
      </Create>
      <SubmitBtn type="submit">생성</SubmitBtn>
    </Wrapper>
  );
};

export default CreatePage;
