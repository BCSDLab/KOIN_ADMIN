import * as api from "../../api/api";

const defaultState = {

};

const actions = {
    getCircles: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.getCircles(payload.token, payload.page).then((res) => {
                console.log(res.data);
                resolve(res);
            }, (error) => {
                console.log(error);
                reject(false);
            })
        })
    },
    getSpecificCircle: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.getSpecificCircle(payload.token, payload.id).then((res) => {
                console.log(res.data);
                resolve(res);
            }, (error) => {
                console.log(error);
                reject(false);
            })
        })
    },
    createCircle: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            let body = {
                name: payload.name,
                category: payload.category,
                line_description: payload.line_description,
                logo_url: payload.logo_url,
                description: payload.description,
                link_urls: payload.link_urls,
                background_img_url: payload.background_img_url,
                location: payload.location,
                professor: payload.professor,
                major_business: payload.major_business,
                introduce_url: payload.introduce_url,
                // is_deleted: payload.is_deleted
            }
            api.createCircle(payload.token, body).then((res) => {
                console.log(res);
                resolve(true);
            }, (error) => {
                if (error.message.indexOf('412') !== -1) {
                    alert('데이터 형식을 지켜주세요.');
                }
                if (error.message.indexOf('409') !== -1) {
                    alert('동아리 이름이 중복되었습니다.');
                }
                if (error.message.indexOf('500') !== -1) {
                    alert('서버에 이상이 있습니다.');
                }
                reject(false);
            })
        })
    },
    updateCircle: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            let body = {
                name: payload.name,
                category: payload.category,
                line_description: payload.line_description,
                logo_url: payload.logo_url,
                description: payload.description,
                link_urls: payload.link_urls,
                background_img_url: payload.background_img_url,
                location: payload.location,
                professor: payload.professor,
                major_business: payload.major_business,
                introduce_url: payload.introduce_url,
                // is_deleted: payload.is_deleted
            }
            console.log(body);
            api.updateCircle(payload.token, payload.id, body).then((res) => {
                console.log(res);
                resolve(true);
            }, (error) => {
                if (error.message.indexOf('412') !== -1) {
                    alert('데이터 형식이 잘못되었거나 동아리 이름이 중복되었습니다.');
                }
                if (error.message.indexOf('500') !== -1) {
                    alert('서버에 이상이 있습니다.');
                }
                reject(false);
            })
        })
    },
    deleteCircle: (context, payload) => {
        console.log(payload);
        return new Promise((resolve, reject) => {
            api.deleteCircle(payload.token, payload.id).then((res) => {
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
