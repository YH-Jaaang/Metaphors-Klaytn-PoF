import axios from 'axios';

const url = `http://169.56.87.186:5500`;

// Common ////////////////////////////////////////////////////////////

export const getUserAssetInfo = async (accessToken: string) => {
  const result = await axios({
    method: 'get',
    url: `${url}/api/user/info`,
    headers: {
      'x-access-token': accessToken,
    },
    data: '',
  });
  return result.data;
};

// Account ///////////////////////////////////////////////////////////
export const postEmailOverlap = async (email: string) => {
  const result = await axios({
    method: 'post',
    url: `${url}/api/auth/emailcheck`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: email,
    },
  });
  return result.data;
};

export const postSignup = async (email: string, password: string) => {
  const result = await axios({
    method: 'post',
    url: `${url}/api/auth/signup`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: email,
      password: password,
    },
  });
  return result.data;
};

export const postSignin = async (email: string, password: string) => {
  const result = await axios({
    method: 'post',
    url: `${url}/api/auth/signin`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: email,
      password: password,
    },
  });
  return result.data;
};

export const postLogout = async (accessToken: string) => {
  const result = await axios({
    method: 'post',
    url: `${url}/api/auth/logout`,
    headers: {
      'x-access-token': accessToken,
    },
    data: '',
  });
  return result.data;
};

export const getUserGenre = async () => {
  const result = await axios({
    method: 'get',
    url: url + '/api/user/genre',
    headers: {},
  });
  return result.data;
};

export const getUserPersonality = async () => {
  const result = await axios({
    method: 'get',
    url: url + '/api/user/personality',
    headers: {},
  });
  return result.data;
};

export const postSigninDetail = async (
  accessToken: string,
  nickname: string,
  personality1: string,
  personality2: string,
  personality3: string,
  genre1: string,
  genre2: string,
  genre3: string
) => {
  const result = await axios({
    method: 'post',
    url: url + '/api/auth/signin/detail',
    headers: {
      'x-access-token': accessToken,
      'Content-Type': 'application/json',
    },
    data: {
      nickname: nickname,
      personality1: personality1,
      personality2: personality2,
      personality3: personality3,
      genre1: genre1,
      genre2: genre2,
      genre3: genre3,
    },
  });
  return result.data;
};

// Novel //////////////////////////////////////////
export const getNovelList = async () => {
  const result = await axios({
    method: 'get',
    url: `${url}/api/nonuser/novel/list`,
    headers: {},
    data: '',
  });
  return result.data;
};

export const getNovelListUser = async (accessToken: string) => {
  const result = await axios({
    method: 'get',
    url: `${url}/api/novel/list`,
    headers: {
      'x-access-token': accessToken,
    },
    data: '',
  });
  return result.data;
};

export const postNovelDetail = async (accessToken: string, id: number) => {
  const result = await axios({
    method: 'post',
    url: `${url}/api/novel/detail`,
    headers: {
      'x-access-token': accessToken,
    },
    data: { novelId: id },
  });
  return result.data;
};

export const postNovelEpisode = async (accessToken: string, id: number) => {
  const result = await axios({
    method: 'post',
    url: `${url}/api/novel/page`,
    headers: {
      'x-access-token': accessToken,
    },
    data: { novelId: id },
  });
  return result.data;
};

export const postRestartNovel = async (accessToken: string, id: number) => {
  const result = await axios({
    method: 'post',
    url: `${url}/api/novel/new`,
    headers: {
      'x-access-token': accessToken,
    },
    data: { novelId: id },
  });
  return result.data;
};

export const postItem = async (accessToken: string, id: number) => {
  const result = await axios({
    method: 'post',
    url: `${url}/api/novel/item`,
    headers: {
      'x-access-token': accessToken,
    },
    data: { novelId: id },
  });
  return result.data;
};

export const postUseItem = async (
  accessToken: string,
  id: number,
  next: string | undefined,
  name: string | undefined
) => {
  const result = await axios({
    method: 'post',
    url: `${url}/api/novel/nextEpisode/useItem`,
    headers: {
      'x-access-token': accessToken,
    },
    data: { novelId: id, next: next, name: name },
  });
  return result.data;
};

export const postUseItemCookie = async (accessToken: string, novelId: string, next: string) => {
  const result = await axios({
    method: 'post',
    url: `${url}/api/novel/nextEpisode/useCookie`,
    headers: {
      'x-access-token': accessToken,
    },
    data: {
      novelId: novelId,
      next: next,
    },
  });
  return result.data;
};

export const postCreateItem = async (accessToken: string, name: undefined | string) => {
  const result = await axios({
    method: 'post',
    url: `${url}/api/item/create`,
    headers: {
      'x-access-token': accessToken,
    },
    data: { name: name },
  });
  return result.data;
};

export const postItemImage = async (accessToken: string, path: string, name: string) => {
  const result = await axios({
    method: 'post',
    url: `${url}/api/item/img/create`,
    headers: {
      'x-access-token': accessToken,
    },
    data: {
      files: path,
      name: name,
    },
  });
  return result.data;
};

export const getImage = async (path: string) => {
  const result = await axios({
    method: 'get',
    url: `${path}`,
  });
  return result.data;
};

////////////
// 내 아이템 보기
export const getMyItemInfo = async (accessToken: string) => {
  const result = await axios({
    method: 'get',
    url: url + '/api/item/info',
    headers: {
      'x-access-token': accessToken,
    },
  });
  return result.data.content;
};

// 아이템 판매 등록
export const sellItems = async (accessToken: string, tokenId: string, price: string) => {
  const result = await axios({
    method: 'post',
    url: url + '/api/nft/items/sell',
    headers: {
      'x-access-token': accessToken,
    },
    data: {
      tokenId: tokenId,
      price: price,
    },
  });
  return result.data;
};
// 아이템 판매 등록 취소
export const sellItemsCancel = async (accessToken: string, tokenId: string) => {
  const result = await axios({
    method: 'post',
    url: url + '/api/nft/items/sell/cancel',
    headers: {
      'x-access-token': accessToken,
    },
    data: {
      tokenId: tokenId,
    },
  });
  return result.data;
};

// 인벤토리거래소
// 판매 중인 아이템 보기(회원,비회원 둘다)
export const getNftForSaleItems = async () => {
  const result = await axios({
    method: 'get',
    url: url + '/api/nft/forSaleItems',
    headers: {
      // 'x-access-token': accessToken,
    },
  });
  return result.data;
};
// 내가 판매 중인 아이템 보기
export const getUserNftForSaleItems = async (accessToken: string) => {
  const result = await axios({
    method: 'get',
    url: url + '/api/nft/forSaleItems/user',
    headers: {
      'x-access-token': accessToken,
    },
  });
  return result.data;
};
// 아이템 구매하기
export const purchaseItem = async (accessToken: string, tokenId: string) => {
  const result = await axios({
    method: 'post',
    url: url + '/api/nft/items/purchase',
    headers: {
      'x-access-token': accessToken,
    },
    data: {
      tokenId: tokenId,
    },
  });
  return result.data;
};
// 쿠키 충전 요청
export const purchaseCookie = async (accessToken: string, cookie: string) => {
  const result = await axios({
    method: 'post',
    url: url + '/api/purchase/cookie',
    headers: {
      'x-access-token': accessToken,
    },
    data: {
      cookie: cookie,
    },
  });
  return result.data;
};
// 토큰 충전 요청
export const purchaseToken = async (accessToken: string, token: string) => {
  const result = await axios({
    method: 'post',
    url: url + '/api/purchase/token',
    headers: {
      'x-access-token': accessToken,
    },
    data: {
      token: token,
    },
  });
  return result.data;
};
// 이름으로 판매 중인 아이템 검색(회원,비회원 둘다)
export const searchNftForSaleItems = async (
  accessToken: string,
  name: string,
  exceptOwnerItem: boolean
) => {
  const result = await axios({
    method: 'post',
    url: url + '/api/nft/search/saleItems',
    headers: {
      'x-access-token': accessToken,
    },
    data: {
      name: name,
      exceptOwnerItem: exceptOwnerItem,
    },
  });
  return result.data;
};
