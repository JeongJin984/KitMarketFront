import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Pagination from './Pagination';

const BoardPagination = () => {
  const { currentPage, maxPage } = useSelector((state) => state.post.meta);
  const router = useRouter();
  // const currentPage = router.query.page - 1 || 0;
  // const maxPage = 15;

  const pages = Array(maxPage)
    .fill()
    .map((page, i) => i + 1);

  const pageSetNum = Math.floor(currentPage / 10);
  const currentPageSet = pages.slice(10 * pageSetNum, 10 * pageSetNum + 10);

  const { category, status, select, search } = router.query;
  const route = (page) => {
    if (category && status) {
      router.push(`/board/${category}?status=${status}&page=${page}`);
    } else if (select) {
      router.push(
        `/board/${category}?select=${select}&search=${search}&page=${page}`
      );
    } else if (category) {
      router.push(`/board/${category}?page=${page}`);
    }
  };

  const onClickPage = useCallback(
    (num) => {
      route(num);
    },
    [router.query]
  );

  const onClickNext = useCallback(() => {
    if (currentPage + 1 < maxPage) {
      route(currentPage + 2);
    }
  }, [currentPage, maxPage]);

  const onClickPrev = useCallback(() => {
    if (currentPage - 1 >= 0) {
      route(currentPage);
    }
  }, [currentPage]);

  const onClickNextEnd = useCallback(() => {
    route(maxPage);
  }, [maxPage]);

  const onClickPrevEnd = useCallback(() => {
    route(1);
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
