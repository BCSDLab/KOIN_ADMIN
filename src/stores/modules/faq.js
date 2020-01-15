import * as api from "../../api/api";

const defaultState = {

};
  
const actions = {
    getFaqs: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.getFaqs(payload.page).then((res) => {
                console.log(res.data);
                resolve(res);
            }, (error) => {
                console.log(error);
                reject(false);
            })
        })
    },
    getSpecificFaq: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.getSpecificFaq(payload.id).then((res) => {
                console.log(res.data);
                resolve(res);
            }, (error) => {
                console.log(error);
                reject(false);
            })
        })
    },
    createFaq: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            let body = {
                question: payload.question,
                answer: payload.answer
            }
            api.createFaq(payload.token, body).then((res) => {
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
    updateFaq: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            let body = {
                question: payload.question,
                answer: payload.answer
            }
            api.updateFaq(payload.token, payload.id, body).then((res) => {
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
    deleteFaq: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.deleteFaq(payload.token, payload.id).then((res) => {
                console.log(res);
                resolve(true);
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