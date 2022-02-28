import React from 'react';
import styled from 'styled-components';
import { IPage } from '../../Store/Type/Interfaces';

const PageContainer = ({ title, author, contents, isVisibleOption, isFirstPage }: IPage) => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  return (
    <PageContainer_styled isVisibleOption={isVisibleOption}>
      {isFirstPage ? (
        <>
          <h4 className="title">{title}</h4>
          <span className="author">{author}</span>
        </>
      ) : (
        ''
      )}
      <div className="contentsBox">
        {contents?.split('\\n').map((p, idx) => (
          <p key={idx}>
            {p}
            <br />
            <br />
          </p>
        ))}
      </div>
    </PageContainer_styled>
  );
};

export default PageContainer;

const PageContainer_styled = styled.section<{ isVisibleOption: boolean | undefined }>`
  font-family: 'NanumMyeongjo';
  ${({ theme }) => theme.mixin.textStyle.B_14}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  padding-bottom: ${(props) => (props.isVisibleOption ? '450px' : '0')};
  .title {
    ${({ theme }) => theme.mixin.textStyle.EB_20}
  }
  .author {
    margin-top: 16px;
    margin-bottom: 130px;
  }
  .contentsBox {
    p {
      line-height: 1.6;
      word-break: keep-all;
    }
  }
`;
