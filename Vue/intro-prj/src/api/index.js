import axios from 'axios';

//1.HTTP Request & Response와 관련된 기본 설정
const config = {
    baseUrl : 'https://api.hnpwa.com/v0/'
}

//2.API 함수들 정리
function fetchNewsList() {
    //return axios.get(config.baseUrl+'news/1.json');
    return axios.get(`${config.baseUrl}news/1.json`);
    //위와 아래 둘 다 가능.
}

export {
    fetchNewsList
}