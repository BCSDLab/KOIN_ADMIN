import * as api from "../../api/api";

const defaultState = {

};
  
const actions = {
    getItems: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.getItems(payload.token, payload.page, payload.type).then((res) => {
                console.log(res.data);
                resolve(res);
            }, (error) => {
                console.log(error);
                reject(false);
            })
        })
    },
    getSpecificItem: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.getSpecificItem(payload.token, payload.id).then((res) => {
                console.log(res.data);
                resolve(res);
            }, (error) => {
                console.log(error);
                reject(false);
            })
        })
    },
    createItem: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            let body = {
                type: payload.type,
                title: payload.title,
                content: payload.content,
                state: payload.state,
                price: payload.price,
                phone: payload.phone,
                is_phone_open: payload.is_phone_open,
                thumbnail: payload.thumbnail,
                is_deleted: payload.is_deleted
            }
            api.createItem(payload.token, body).then((res) => {
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
    updateItem: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            let body = {
                type: payload.type,
                title: payload.title,
                content: payload.content,
                state: payload.state,
                price: payload.price,
                phone: payload.phone,
                is_phone_open: payload.is_phone_open,
                thumbnail: payload.thumbnail,
                is_deleted: payload.is_deleted
            }
            console.log(body);
            api.updateItem(payload.token, payload.id, body).then((res) => {
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
    deleteItem: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.deleteItem(payload.token, payload.id).then((res) => {
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
    createItemComment: (context, payload) => {
        return new Promise((resolve, reject) => {
            let body = {
                content: payload.content
            }
            api.createItemComment(payload.token, payload.itemId, body).then((res) => {
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
    updateItemComment: (context, payload) => {
        return new Promise((resolve, reject) => {
            let body = {
                content: payload.content
            }
            api.updateItemComment(payload.token, payload.itemId, payload.id, body).then((res) => {
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
    deleteItemComment: (context, payload) => {
        return new Promise((resolve, reject) => {
            api.deleteItemComment(payload.token, payload.itemId, payload.id).then((res) => {
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