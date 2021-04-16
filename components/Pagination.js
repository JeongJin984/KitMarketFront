import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonToolbar, ButtonGroup } from 'reactstrap';
const Pagination = () => {
  const { currentPage, maxPage } = useSelector((state) => state.post.meta);
  const router = useRouter();
  const page = Array(maxPage)
    .fill()
    .map((page, i) => i + 1);
  const { category } = router.query;

  const onClickPage = useCallback(
    (i) => {
      if (category) {
        router.push(`/board/${category}/?page=${i}`);
      } else {
        router.push(`/?page=${i}`);
      }
    },
    [category]
  );

  return (
    <ButtonToolbar
      style={{
        margin: '3% auto 3% auto ',
      }}
    >
      <ButtonGroup>
        <Button outline color="secondary">
          ⟪
        </Button>
        <Button outline color="secondary">
          ⟨
        </Button>
        {page.map((i) => {
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
        <Button outline color="secondary">
          ⟩
        </Button>
        <Button outline color="secondary">
          ⟫
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
};

export default Pagination;
