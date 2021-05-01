import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Pagination from './Pagination';

const BoardPagination = () => {
  const { currentPage, maxPage } = useSelector((state) => state.post.meta);
  const router = useRouter();
  // const currentPage = router.query.page - 1 || 0;
  // const maxPage = 15;

  const page = Array(maxPage)
    .fill()
    .map((page, i) => i + 1);

  const pageSetNum = Math.floor(currentPage / 10);
  const currentPageSet = page.slice(10 * pageSetNum, 10 * pageSetNum + 10);

  const { category } = router.query;

  const existCategory = (page) =>
    category
      ? router.push(`/board/${category}?page=${page}`)
      : router.push(`/?page=${page}`);

  const onClickPage = useCallback(
    (num) => {
      existCategory(num);
    },
    [category]
  );

  const onClickNext = useCallback(() => {
    const nextPageNum = (pageSetNum + 1) * 10 + 1;
    if (maxPage >= nextPageNum) {
      existCategory(nextPageNum);
    }
  }, [pageSetNum, maxPage]);

  const onClickPrev = useCallback(() => {
    const prevPageNum = pageSetNum * 10;
    if (prevPageNum >= 1) {
      existCategory(prevPageNum);
    }
  }, [pageSetNum]);

  const onClickNextEnd = useCallback(() => {
    existCategory(maxPage);
  }, [maxPage]);

  const onClickPrevEnd = useCallback(() => {
    existCategory(1);
  }, []);

  return (
    <Pagination
      pages={currentPageSet}
      currentPage={currentPage}
      onClickPage={onClickPage}
      onClickNext={onClickNext}
      onClickPrev={onClickPrev}
      onClickNextEnd={onClickNextEnd}
      onClickPrevEnd={onClickPrevEnd}
    />
  );
};

export default BoardPagination;
