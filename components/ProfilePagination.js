import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import Pagination from './Pagination';

const ProfilePagination = ({ posts }) => {
  const router = useRouter();
  const currentPage = router.query.page - 1 || 0;
  const pageSetNum = Math.floor(currentPage / 5);
  const length = posts.length;
  const maxPage =
    length % 4 === 0 ? Math.floor(length / 4) : Math.floor(length / 4) + 1;

  const pages = Array(maxPage)
    .fill()
    .map((page, i) => i + 1);

  const slicedPages = (pages) => {
    return pages.slice(pageSetNum * 5, pageSetNum * 5 + 5);
  };

  const onClickPage = useCallback((page) => {
    router.push(`/profile?page=${page}`);
  }, []);

  const onClickNext = useCallback(() => {
    const nextPageNum = (pageSetNum + 1) * 5 + 1;
    if (maxPage >= nextPageNum) {
      router.push(`/profile?page=${nextPageNum}`);
    }
  }, [pageSetNum, maxPage]);

  const onClickPrev = useCallback(() => {
    const prevPageNum = (pageSetNum - 1) * 5 + 1;
    if (prevPageNum >= 1) {
      router.push(`/profile?page=${prevPageNum}`);
    }
  }, [pageSetNum]);

  const onClickNextEnd = useCallback(() => {
    router.push(`/profile?page=${maxPage}`);
  }, [maxPage]);

  const onClickPrevEnd = useCallback(() => {
    router.push(`/profile?page=1`);
  }, []);

  return (
    <Pagination
      pages={slicedPages(pages)}
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
