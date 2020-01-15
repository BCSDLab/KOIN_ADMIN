import * as api from "../../api/api";

const defaultState = {

};
  
const actions = {
    getArticles: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.getArticles(payload.token, payload.boardId, payload.page).then((res) => {
                console.log(res.data);
                resolve(res);
            }, (error) => {
                console.log(error);
                reject(false);
            })
        })
    },
    getSpecificArticle: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.getSpecificArticle(payload.token, payload.id).then((res) => {
                console.log(res.data);
                resolve(res);
            }, (error) => {
                console.log(error);
                reject(false);
            })
        })
    },
    createArticle: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            let body = {
                board_id: payload.board_id,
                title: payload.title,
                content: payload.content,
                is_deleted: payload.is_deleted,
                is_solved: payload.is_solved
            }
            api.createArticle(payload.token, body).then((res) => {
                console.log(res);
                resolve(true);
            }, (error) => {
                if (error.message.indexOf('412') !== -1) {
                    alert('데이터 형식을 지켜주세요.');
                }
                if (error.message.indexOf('500') !== -1) {
                    alert('서버에 이상이 있습니다.');
                }
                reject(false);
            })
        })
    },
    updateArticle: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            let body = {
                board_id: payload.board_id,
                title: payload.title,
                content: payload.content,
                is_deleted: payload.is_deleted,
                is_solved: payload.is_solved
            }
            api.updateArticle(payload.token, payload.id, body).then((res) => {
                console.log(res);
                resolve([true, res.data.is_deleted]);
            }, (error) => {
                if (error.message.indexOf('412') !== -1) {
                    alert('데이터 형식을 지켜주세요.');
                }
                if (error.message.indexOf('500') !== -1) {
                    alert('서버에 이상이 있습니다.');
                }
                reject(false);
            })
        })
    },
    deleteArticle: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.deleteArticle(payload.token, payload.id).then((res) => {
                console.log(res);
                resolve(true);
            }, (error) => {
                if (error.message.indexOf('500') !== -1) {
                    alert('서버에 이상이 있습니다.');
                }
                reject(false);
            })
        })
    },
    createComment: (context, payload) => {
        return new Promise((resolve, reject) => {
            let body = {
                content: payload.content
            }
            api.createComment(payload.token, payload.articleId, body).then((res) => {
                console.log(res);
                resolve(true);
            }, (error) => {
                if (error.message.indexOf('500') !== -1) {
                    alert('서버에 이상이 있습니다.');
                }
                reject(false);
            })
        })
    },
    updateComment: (context, payload) => {
        return new Promise((resolve, reject) => {
            let body = {
                content: payload.content
            }
            console.log(body);
            api.updateComment(payload.token, payload.articleId, payload.id, body).then((res) => {
                console.log(res);
                resolve(true);
            }, (error) => {
                if (error.message.indexOf('500') !== -1) {
                    alert('서버에 이상이 있습니다.');
                }
                reject(false);
            })
        })
    },
    deleteComment: (context, payload) => {
        return new Promise((resolve, reject) => {
            api.deleteComment(payload.token, payload.articleId, payload.id).then((res) => {
                console.log(res);
                resolve(true);
            }, (error) => {
                if (error.message.indexOf('500') !== -1) {
                    alert('서버에 이상이 있습니다.');
                }
                reject(false);
            })
        })
    },
};
  
const mutations = {
};
  
const getters = {
};
  
export default {
    state: defaultState,
    getters,
    actions,
    mutations,
};