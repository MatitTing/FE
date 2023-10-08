import { useRouter } from "next/router";

const SearchResultPage = () => {
  const router = useRouter();
  const { keyword } = router.query;
  {
    /*todo: 검색 결과 쿼리 파싱 후, 백엔드 api 요청에 따라 필터링 된 결과 노출 예정. */
  }
  return (
    <div>
      서치 결과 페이지
      {keyword}
    </div>
  );
};

export default SearchResultPage;
