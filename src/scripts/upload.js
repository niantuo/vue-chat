import axios from 'axios'

/**
 * @Author :tuonina
 * @Date : 2018/12/6
 * @Version: 1.0
 * @Last Modified by :
 * @Last Modified Date: 2018/12/6
 *
 **/


/**
 * 上传文件。
 * @param url
 * @param file
 * @param headers
 * @return {AxiosPromise}
 */
export function upload(url, file, headers) {

    let params = new FormData();
    params.append("file", file);
    return axios({
        url: url,
        method: 'post',
        headers: {
            ...headers,
            'Content-type': 'multipart/form-data;charset=UTf-8'
        },
        data: params
    })

}
