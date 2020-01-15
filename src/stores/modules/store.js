import * as api from "../../api/api";

const defaultState = {

};
  
const actions = {
    getStores: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.getStores(payload.token, payload.page).then((res) => {
                console.log(res.data.shops);
                resolve(res);
            }, (error) => {
                console.log(error);
                reject(false);
            })
        })
    },
    getSpecificStore: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.getSpecificStore(payload.token, payload.id).then((res) => {
                console.log(res.data);
                resolve(res.data);
            }, (error) => {
                console.log(error);
                reject(false);
            })
        })
    },
    createStore: (context, payload) => {
        console.log(payload);
        let body = {
            name: payload.name,
            phone: payload.phone,
            category: payload.category,
            description: payload.description,
            address: payload.address,
            open_time: payload.open_time,
            close_time: payload.close_time,
            delivery: payload.delivery,
            delivery_price: payload.delivery_price,
            pay_card: payload.pay_card,
            pay_bank: payload.pay_bank,
            is_event: payload.is_event,
            remarks: payload.remarks,
            image_urls: payload.image_urls
        }
        return new Promise((resolve, reject) => {
            api.createStore(payload.token, body).then((res) => {
                console.log(res);
                resolve(true);
            }, (error) => {
                if (error.message.indexOf('412') !== -1) {
                    alert('데이터 형식을 지켜주세요.');
                }
                if (error.message.indexOf('409') !== -1) {
                    alert('상점 이름이 중복되었습니다.');
                }
                if (error.message.indexOf('500') !== -1) {
                    alert('서버에 이상이 있습니다.');
                }
                reject(false);
            })
        })
    },
    updateStore: (context, payload) => {
        console.log(payload);
        let body = {
            name: payload.name,
            phone: payload.phone,
            category: payload.category,
            description: payload.description,
            address: payload.address,
            open_time: payload.open_time,
            close_time: payload.close_time,
            delivery: payload.delivery,
            delivery_price: payload.delivery_price,
            pay_card: payload.pay_card,
            pay_bank: payload.pay_bank,
            is_event: payload.is_event,
            is_deleted: payload.is_deleted,
            remarks: payload.remarks,
            image_urls: payload.image_urls
        }
        return new Promise((resolve, reject) => {
            api.updateStore(payload.token, payload.id, body).then((res) => {
                console.log(res);
                resolve(true);
            }, (error) => {
                if (error.message.indexOf('412') !== -1) {
                    alert('데이터 형식을 지켜주세요.');
                }
                if (error.message.indexOf('409') !== -1) {
                    alert('상점 이름이 중복되었습니다.');
                }
                if (error.message.indexOf('500') !== -1) {
                    alert('서버에 이상이 있습니다.');
                }
                reject(false);
            })
        })
    },
    deleteStore: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.deleteStore(payload.token, payload.id).then((res) => {
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
    createMenu: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            let body = {
                name: payload.name,
                price_type: payload.price_type
            }
            api.createMenu(payload.token, payload.shopId, body).then((res) => {
                console.log(res);
                resolve(res);
            }, (error) => {
                if (error.message.indexOf('500') !== -1) {
                    alert('서버에 이상이 있습니다.');
                }
                reject(false);
            })
        })
    },
    updateMenu: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            let body = {
                name: payload.name,
                price_type: payload.price_type
            }
            console.log(body);
            api.updateMenu(payload.token, payload.shopId, payload.menuId, body).then((res) => {
                console.log(res);
                resolve(res);
            }, (error) => {
                if (error.message.indexOf('500') !== -1) {
                    alert('서버에 이상이 있습니다.');
                }
                reject(false);
            })
        })
    },
    deleteMenu: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.deleteMenu(payload.token, payload.shopId, payload.menuId).then((res) => {
                console.log(res);
                resolve(res);
            }, (error) => {
                if (error.message.indexOf('500') !== -1) {
                    alert('서버에 이상이 있습니다.');
                }
                reject(false);
            })
        })
    }
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