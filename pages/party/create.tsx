import { NextPage } from "next";
import { useRef, FormEvent, useEffect } from "react";
import styled from "@emotion/styled";
import Create from "@components/party/create/Create";
import SearchMap from "@components/party/create/SearchMap";
import useSearchPlace from "@hooks/useSearchPlace";
import { DefaultHeader } from "@components/common/DefaultHeader";
import useSetParty from "src/api/setParty";

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 72px - 45px);
`;

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
  const { mutate: setParty } = useSetParty();
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
      <DefaultHeader centerArea="파티 생성" />
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
