export class UserInfo {
    exp = 0;
    iat = 0;
    user_id = '';
    user_point = '';
    user_name = '';
    user_level = '';
    user_start = '';
    user_end = '';
    user_location = '';
    user_keyword = '';

    setInfo(dataObj) {
        // tslint:disable-next-line:forin
        for (const val in dataObj) {
            this[val] = dataObj.val + '';
        }
    }
}