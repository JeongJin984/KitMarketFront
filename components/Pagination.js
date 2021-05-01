import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonToolbar, ButtonGroup } from 'reactstrap';

const Pagination = ({
  pages,
  currentPage,
  onClickPage,
  onClickNext,
  onClickPrev,
  onClickNextEnd,
  onClickPrevEnd,
}) => {
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
        {pages.map((p) => {
          if (p - 1 === currentPage) {
            return (
              <Button key={p} color="secondary" onClick={() => onClickPage(p)}>
                {p}
              </Button>
            );
          } else {
            return (
              <Button
                outline
                key={p}
                color="secondary"
                onClick={() => onClickPage(p)}
              >
                {p}
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
