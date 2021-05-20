import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import Pagination from './Pagination';

const ProfilePagination = ({ posts }) => {
  const router = useRouter();
  const { tab } = router.query;
  const { currentPage, maxPage } = posts;
  const pageSetNum = Math.floor(currentPage / 5);

  const pages = Array(maxPage)
    .fill()
    .map((page, i) => i + 1);

  const currentPageSet = pages.slice(5 * pageSetNum, 5 * pageSetNum + 5);

  const routeTab = (page) => {
    tab
      ? router.push(`/profile?tab=${tab}&page=${page}`)
      : router.push(`/profile?page=${page}`);
  };
  const onClickPage = useCallback((page) => {
    routeTab(page);
  }, []);

  const onClickNext = useCallback(() => {
    if (currentPage + 1 < maxPage) {
      routeCategory(currentPage + 2);
    }
  }, [currentPage, maxPage]);

  const onClickPrev = useCallback(() => {
    if (currentPage - 1 >= 0) {
      routeCategory(currentPage);
    }
  }, [currentPage]);

  const onClickNextEnd = useCallback(() => {
    routeTab(maxPage);
  }, [maxPage]);

  const onClickPrevEnd = useCallback(() => {
    routeTab(1);
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

export default ProfilePagination;
