import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonToolbar, ButtonGroup } from 'reactstrap';
const Pagination = () => {
  const { currentPage, maxPage } = useSelector((state) => state.post.meta);
  const router = useRouter();
  // const currentPage = router.query.page - 1 || 0;
  // const maxPage = 15;

  const page = Array(maxPage)
    .fill()
    .map((page, i) => i + 1);

  const pageSetNum = parseInt(currentPage / 10);
  const currentPageSet = page.slice(10 * pageSetNum, 10 * pageSetNum + 10);

  const { category } = router.query;

  const onClickPage = useCallback(
    (num) => {
      if (category) {
        router.push(`/board/${category}/?page=${num}`);
      } else {
        router.push(`/?page=${num}`);
      }
    },
    [category]
  );

  const onClickNext = useCallback(() => {
    const nextPageNum = (pageSetNum + 1) * 10 + 1;
    if (maxPage >= nextPageNum) {
      router.push(`/?page=${nextPageNum}`);
    }
  }, [pageSetNum, maxPage]);

  const onClickPrev = useCallback(() => {
    const prevPageNum = pageSetNum * 10;
    if (prevPageNum >= 1) {
      router.push(`/?page=${prevPageNum}`);
    }
  }, [pageSetNum]);

  const onClickNextEnd = useCallback(() => {
    router.push(`/?page=${maxPage}`);
  }, [maxPage]);

  const onClickPrevEnd = useCallback(() => {
    router.push(`/?page=1`);
  }, []);

  return (
    <ButtonToolbar
      style={{
        margin: '3% auto 3% auto ',
      }}
    >
      <ButtonGroup>
        <Button outline color="secondary" onClick={onClickPrevEnd}>
          ⟪
        </Button>
        <Button outline color="secondary" onClick={onClickPrev}>
          ⟨
        </Button>
        {currentPageSet.map((i) => {
          if (i - 1 === currentPage) {
            return (
              <Button key={i} color="primary" onClick={() => onClickPage(i)}>
                {i}
              </Button>
            );
          } else {
            return (
              <Button
                outline
                key={i}
                color="secondary"
                onClick={() => onClickPage(i)}
              >
                {i}
              </Button>
            );
          }
        })}
        <Button outline color="secondary" onClick={onClickNext}>
          ⟩
        </Button>
        <Button outline color="secondary" onClick={onClickNextEnd}>
          ⟫
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
};

export default Pagination;
