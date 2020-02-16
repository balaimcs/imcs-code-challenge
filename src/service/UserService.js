import axios from 'axios';

export default class UserService {

    getGuesList(){
        return axios.get('http://localhost:8080/user/lkajwdiauspkmcpwodipldmaspduawodontusethisjustfortestendpoint')
                .then(res => res.data);
    }
}