import axios from 'axios/index';
const API_PATH = process.env.ROOT_API;

// 로그인 & 로그아웃

export function login (body) {
    return axios.post(`${API_PATH}admin/user/login`, body);
}

export function logout (token) {
    return axios.post(`${API_PATH}user/logout`, { }, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

// 대시보드

// 유저 플랫폼
export function getUsers (token, page) {
    return axios.get(`${API_PATH}admin/users?page=${page}&limit=10`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getSpecificUser(token, id) {
    return axios.get(`${API_PATH}admin/users/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function createUser(token, body) {
    return axios.post(`${API_PATH}admin/users`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function updateUser(token, id, body) {
    return axios.put(`${API_PATH}admin/users/${id}`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function deleteUser(token, id) {
    return axios.delete(`${API_PATH}admin/users/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function nicknameCheck(nickname) {
    return axios.get(`${API_PATH}user/check/nickname/${nickname}`);
}

export function getAdminPermission(userId, token) {
    return axios.get(`${API_PATH}admin/users/${userId}/permission`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getAdminPermissions(token) {
    return axios.get(`${API_PATH}admin/users/permissions`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function setAdminPermission(token, userId, body) {
    return axios.post(`${API_PATH}admin/users/${userId}/permission`, body,  {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function updateAdminPermission(token, userId, body) {
    return axios.put(`${API_PATH}admin/users/${userId}/permission`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function withdrawAdminPermission(token, userId) {
    return axios.delete(`${API_PATH}admin/users/${userId}/permission`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}
// 학교 정보

// 학교정보 - 주변 상점
export function getStores (token, page) {
    return axios.get(`${API_PATH}admin/shops?page=${page}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getSpecificStore (token, id) {
    return axios.get(`${API_PATH}admin/shops/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function createStore(token, body) {
    return axios.post(`${API_PATH}admin/shops`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function updateStore(token, id, body) { // 문제발견
    return axios.put(`${API_PATH}admin/shops/${id}`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function deleteStore(token, id) {
    return axios.delete(`${API_PATH}admin/shops/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function createMenu(token, shopId, body) {
    return axios.post(`${API_PATH}admin/shops/${shopId}/menus`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function updateMenu(token, shopId, menuId, body) { // 문제있음
    return axios.put(`${API_PATH}admin/shops/${shopId}/menus/${menuId}`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function deleteMenu(token, shopId, menuId) {
    return axios.delete(`${API_PATH}admin/shops/${shopId}/menus/${menuId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

// 학교정보 - FAQ

export function getFaqs(page) {
    return axios.get(`${API_PATH}faqs?page=${page}`);
}

export function getSpecificFaq(id) {
    return axios.get(`${API_PATH}faqs/${id}`);
}

export function createFaq(token, body) {
    return axios.post(`${API_PATH}admin/faqs`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function updateFaq(token, id, body) {
    return axios.put(`${API_PATH}admin/faqs/${id}`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function deleteFaq(token, id) {
    return axios.delete(`${API_PATH}admin/faqs/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

// 커뮤니티

// 커뮤니티 공지사항

// 커뮤니티 - 게시판

export function getArticles(token, boardId, page) {
    return axios.get(`${API_PATH}admin/articles?boardId=${boardId}&page=${page}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getSpecificArticle(token, id) {
    return axios.get(`${API_PATH}admin/articles/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function createArticle(token, body) {
    return axios.post(`${API_PATH}admin/articles`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function updateArticle(token, id, body) {
    return axios.put(`${API_PATH}admin/articles/${id}`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function deleteArticle(token, id) {
    return axios.delete(`${API_PATH}admin/articles/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function createComment(token, articleId, body) {
    return axios.post(`${API_PATH}admin/articles/${articleId}/comments`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function updateComment(token, articleId, id, body) {
    return axios.put(`${API_PATH}admin/articles/${articleId}/comments/${id}`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function deleteComment(token, articleId, id) {
    return axios.delete(`${API_PATH}admin/articles/${articleId}/comments/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}
// 중고장터

// 중고장터 - 팝니다&삽니다

export function getItems(token, page, type) {
    return axios.get(`${API_PATH}admin/market/items?type=${type}&page=${page}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getSpecificItem(token, id) {
    return axios.get(`${API_PATH}admin/market/items/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function createItem(token, body) {
    return axios.post(`${API_PATH}admin/market/items`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function updateItem(token, id, body) {
    return axios.put(`${API_PATH}admin/market/items/${id}`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function deleteItem(token, id) {
    return axios.delete(`${API_PATH}admin/market/items/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function createItemComment(token, itemId, body) {
    return axios.post(`${API_PATH}admin/market/items/${itemId}/comments`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function updateItemComment(token, itemId, id, body) {
    return axios.put(`${API_PATH}admin/market/items/${itemId}/comments/${id}`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function deleteItemComment(token, itemId, id) {
    return axios.delete(`${API_PATH}admin/market/items/${itemId}/comments/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

// 동아리

export function getCircles(token, page) {
    return axios.get(`${API_PATH}admin/circles?page=${page}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getSpecificCircle(token, id) {
    return axios.get(`${API_PATH}admin/circles/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function createCircle(token, body) {
    return axios.post(`${API_PATH}admin/circles`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function updateCircle(token, id, body) {
    return axios.put(`${API_PATH}admin/circles/${id}`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function deleteCircle(token, id) {
    return axios.delete(`${API_PATH}admin/circles/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

// 이미지 업로드

export function uploadThumbnailImage(token, formdata) {
    return axios.post(`${API_PATH}market/items/image/thumbnail/upload`, formdata, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}
export function uploadImage(token, formdata){
    return axios.post(`${API_PATH}market/items/image/upload`, formdata, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
}

export function getLandList(){
  return axios.get(API_PATH + 'lands')
}

export function getSpecificLand(id){
  return axios.get(API_PATH + 'lands/'+id)
}

export function postLand(token, body){
  return axios.post(API_PATH + 'admin/lands',body , {
    headers: {
      "Authorization": "Bearer "+token,
    }
  })
}

export function putSpecificLand(token, id, body){
  return axios.put(API_PATH + 'admin/lands/' + id, body, {
    headers: {
      "Authorization": "Bearer "+token,
    }
  })
}

export function deleteSpecificLand(token, id){
  return axios.delete(API_PATH + 'admin/lands/' + id, {
    headers: {
      "Authorization": "Bearer "+token,
    }
  })
}
