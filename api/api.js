import axios from "axios/index";

const API_PATH = process.env.ROOT_API;

// #user auth part
export function refresh(token){
  return axios.get(API_PATH + 'user/refresh', {
    headers: {
      "Authorization": "Bearer "+token
    }
  })
}

export function login(body){
  return axios.post(API_PATH + 'admin/user/login', body)
}

export function logout(token){
  return axios.post(API_PATH + 'user/logout/?token='+token);
}

export function userWithdrawal(token) {
  return axios.delete(API_PATH + 'user/me', {
    headers: {
      "Authorization": "Bearer "+token
    }
  });
}
//user Part
export function getUserList(page, limit) {
    return axios.get(API_PATH + `admin/users?page=${page}&limit=${limit}`,
      {
        headers: {
          "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
          "Accept": "application/json"
        }
      });
}
export function removeUser(userId) {
  return axios.delete(API_PATH + `admin/users/${userId}`, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token
    }
  });
}

export function getUser(userId) {
  return axios.get(API_PATH+`admin/users/${userId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  });
}
export function createUser(body) {
  return axios.post(API_PATH+'admin/users',
    body,
    {
      headers: {
        "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token
      }
    })
}
export function updateUser(userId, body) {
  return axios.put(API_PATH + `admin/users/${userId}`,body, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  });
}
export function checkNickname(nickname) {
  return axios.get(API_PATH + `user/check/nickname/${nickname}`)
}

export function getPermission(userId) {
  return axios.get(API_PATH + `admin/users/${userId}/permission`,
    {
      headers: {
        "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
        "Accept": "application/json"
      }
    });
}
export function createPermission(userId, body) {
  return axios.post(API_PATH + `admin/users/${userId}/permission`,
    body,
    {
      headers: {
        "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token
      }
    })
}
export function updatePermission(userId, body) {
  return axios.put(API_PATH + `admin/users/${userId}/permission`,body, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  });
}
export function removePermission(userId) {
  return axios.delete(API_PATH + `admin/users/${userId}/permission`, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token
    }
  });
}
//admin-callVan-api
export function getCompanyList(){
  return axios.get(API_PATH+`callvan/companies`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function createCompany(body) {
  return axios.post(API_PATH+'admin/callvan/companies', body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}

export function removeCompany(companyId) {
  return axios.delete(API_PATH+`admin/callvan/companies/${companyId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function updateCompany(companyId, body) {
  return axios.put(API_PATH+`admin/callvan/companies/${companyId}`,body, {
    headers:{
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function getCompany(companyId){
  return axios.get(API_PATH+`callvan/companies/${companyId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
//admin-circle-api
export function getCircleList(page, limit) {
  return axios.get(API_PATH + `admin/circles?page=${page}&limit=${limit}`,
    {
      headers: {
        "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
        "Accept": "application/json"
      }
    });
}
export function createCircle(body) {
  return axios.post(API_PATH+'admin/circles', body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function removeCircle(circleId) {
  return axios.delete(API_PATH+`admin/circles/${circleId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function getCircle(circleId){
  return axios.get(API_PATH+`admin/circles/${circleId}`, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function updateCircle(circleId, body){
  return axios.put(API_PATH+`admin/circles/${circleId}`, body, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
//admin-community-api
export function getArticleList(boardId, page, limit) {
  return axios.get(API_PATH + `admin/articles?boardId=${boardId}&page=${page}&limit=${limit}`, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function createArticle(body) {
  return axios.post (API_PATH+`admin/articles`,body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function createComment(articleId, body) {
  return axios.post(API_PATH+`admin/articles/${articleId}/comments`,body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function removeComment(articleId, commentId) {
  return axios.delete(API_PATH+`admin/articles/${articleId}/comments/${commentId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function getComment(articleId, commentId) {
  return axios.get(API_PATH+`admin/articles/${articleId}/comments/${commentId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function updateComment(articleId, commentId, body) {
  return axios.put(API_PATH+`admin/articles/${articleId}/comments/${commentId}`,body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function removeArticle(articleId) {
  return axios.delete(API_PATH+`admin/articles/${articleId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function getArticle(articleId){
  return axios.get(API_PATH+`admin/articles/${articleId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function updateArticle(articleId, body) {
  return axios.put(API_PATH+`admin/articles/${articleId}`, body, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function getBoardList(page,limit) {
  return axios.get(API_PATH+`admin/boards?=${page}&limit=${limit}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
    })
}
export function createBoard(body) {
  return axios.post(API_PATH+`admin/boards`, body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
    })
}
export function removeBoard(boardId) {
  return axios.delete(API_PATH+`admin/boards/${boardId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
    })
}
export function getBoard(boardId) {
  return axios.get(API_PATH+`admin/boards/${boardId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
    })
}
export function updateBoard(boardId, body) {
  return axios.put(API_PATH+`admin/boards/${boardId}`, body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
    })
}
//admin-anonymous-board
export function getAnonymousArticleList(page, limit) {
  return axios.get(API_PATH + `temp/articles?page=${page}&limit=${limit}`, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function createAnonymousArticle(body) {
  return axios.post (API_PATH+`temp/articles`,body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function createAnonymousComment(articleId, body) {
  return axios.post(API_PATH+`temp/articles/${articleId}/comments`,body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function removeAnonymousComment(articleId, commentId) {
  return axios.delete(API_PATH+`temp/articles/${articleId}/comments/${commentId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function getAnonymousComment(articleId, commentId) {
  return axios.get(API_PATH+`temp/articles/${articleId}/comments/${commentId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function updateAnonymousComment(articleId, commentId, body) {
  return axios.put(API_PATH+`temp/articles/${articleId}/comments/${commentId}`,body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function removeAnonymousArticle(articleId) {
  return axios.delete(API_PATH+`temp/articles/${articleId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function getAnonymousArticle(articleId){
  return axios.get(API_PATH+`temp/articles/${articleId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function updateAnonymousArticle(articleId, body) {
  return axios.put(API_PATH+`temp/articles/${articleId}`, body, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
//admin-Faq-api
export function getFaqList(page, limit) {
  return axios.get(API_PATH+`faqs/?page=${page}&limit=${limit}`,{
    headers: {
      "Accept": "application/json"
    }
  })
}
export function createFaq(body) {
  return axios.post(API_PATH+`admin/faqs`,body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
    })
}
export function removeFaq(id) {
  return axios.delete(API_PATH+`admin/faqs/${id}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
    })
}
export function updateFaq(id, body) {
  return axios.put(API_PATH+`admin/faqs/${id}`, body, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
    })
}
//admin-land-controller
export function createLand(body) {
  return axios.post(API_PATH+`admin/lands`,body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function removeLand(Id) {
  return axios.delete(API_PATH+`admin/lands/${Id}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function updateLand(Id, body) {
  return axios.put(API_PATH+`admin/lands/${Id}`, body, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function getLandList() {
  return axios.get(API_PATH+'/lands',{
    headers:{
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function getLand(id) {
  return axios.get(API_PATH+`lands/${id}`,{
    headers:{
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
//admin-lost-and-found
export function getLostItems(type, page, limit) {
  return axios.get(API_PATH+`admin/lost/lostItems?type=${type}&page=${page}&limit=${limit}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function createLostItem(body) {
  return axios.post(API_PATH+`admin/lost/lostItems`, body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function getLostItem(id) {
  return axios.get(API_PATH+`admin/lost/lostItems/${id}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function removeLostItem(id) {
  return axios.delete(API_PATH+`admin/lost/lostItems/${id}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function updateLostItem(id, body) {
  return axios.put(API_PATH+`admin/lost/lostItems/${id}`, body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function createLostItemComment(lostItemId, body) {
  return axios.post(API_PATH+`admin/lost/lostItems/${lostItemId}/comment`,body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
        "Accept": "application/json"
    }
  })
}
export function removeLostItemComment(lostItemId, commentId) {
  return axios.delete(API_PATH+`/admin/lost/lostItems/${lostItemId}/comments/${commentId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
    })
}
export function getLostItemComment(lostItemId, commentId) {
  return axios.get(API_PATH+`/admin/lost/lostItems/${lostItemId}/comments/${commentId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function updateLostItemComment(lostItemId, commentId, body) {
  return axios.put(API_PATH+`/admin/lost/lostItems/${lostItemId}/comments/${commentId}`, body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function uploadLostItemThumbnailImage(formData){
  return axios.post(`${API_PATH}lost/lostItems/image/thumbnail/upload`, formData, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token
    }
  });
}
//admin-market-place-market 중고장터 used 에서 사용
export function getMarketItems(type, page, limit) {
  return axios.get(API_PATH+`admin/market/items?type=${type}&page=${page}&limit=${limit}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function createMarketItem(body) {
  return axios.post(API_PATH+`admin/market/items`, body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function getMarketItem(Id) {
  return axios.get(API_PATH + `admin/market/items/${Id}`, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}

export function removeMarketItem(Id) {
  return axios.delete(API_PATH + `admin/market/items/${Id}`, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function updateMarketItem(Id, body) {
  return axios.put(API_PATH+`admin/market/items/${Id}`,body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function createMarketItemComment(itemId, body) {
  return axios.post(API_PATH+`admin/market/items/${itemId}/comments`,body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function removeMarketItemComment(itemId, commentId) {
  return axios.delete(API_PATH+`/admin/market/items/${itemId}/comments/${commentId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function getMarketItemComment(itemId, commentId) {
  return axios.get(API_PATH+`/admin/market/items/${itemId}/comments/${commentId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function updateMarketItemComment(itemId, commentId) {
  return axios.put(API_PATH+`/admin/market/items/${itemId}/comments/${commentId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
//admin-shop-api 음식점
export function getShopList(page, limit) {
  return axios.get(API_PATH+`admin/shops?page=${page}&limit=${limit}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function createShop(body) {
  return axios.post(API_PATH+`admin/shops`, body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function removeShop(shopId) {
  return axios.delete(API_PATH+`admin/shops/${shopId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function getShop(shopId) {
  return axios.get(API_PATH + `admin/shops/${shopId}`, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function updateShop(shopId, body) {
  return axios.put(API_PATH+`admin/shops/${shopId}`, body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function createMenu(shopId, body) {
  return axios.post(API_PATH+`admin/shops/${shopId}/menus`,body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function removeMenu(shopId, menuId) {
  return axios.delete(API_PATH+`/admin/shops/${shopId}/menus/${menuId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function getMenu(shopId, menuId) {
  return axios.get(API_PATH+`/admin/shops/${shopId}/menus/${menuId}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function updateMenu(shopId, menuId, body) {
  return axios.put(API_PATH+`/admin/shops/${shopId}/menus/${menuId}`, body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
//version-api
export function getVersionList() {
  return axios.get(API_PATH+`admin/versions`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function createVersion(body) {
  return axios.post(API_PATH+`admin/versions`, body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function removeVersion(type) {
  return axios.delete(API_PATH+`admin/versions/${type}`,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function getVersion(type) {
  return axios.get(API_PATH + `versions/${type}`, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}
export function updateVersion(type, body) {
  return axios.put(API_PATH+`admin/versions/${type}`, body,{
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token,
      "Accept": "application/json"
    }
  })
}

export function uploadMarketImage(formData){
  return axios.post(`${API_PATH}market/items/image/upload`, formData, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token
    }
  });
}
export function uploadImage(formData){
  return axios.post(`${API_PATH}upload/image`, formData, {
    headers: {
      "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).token
    }
  });
}
