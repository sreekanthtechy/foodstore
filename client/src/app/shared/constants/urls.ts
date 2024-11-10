import { environtment } from "src/app/environtments/environment";
const BASE_URL=environtment.production?"":"http://localhost:5000";
export const FOODS_URL=BASE_URL+'/api/foods';
export const FOODS_BY_SEARCH_URL=FOODS_URL+'/search/';
export const FOODS_TAGS_URL=FOODS_URL+'/tags';
export const FOODS_BY_TAG_URL=FOODS_URL+'/tag/';

export const USER_LOGIN_URL=`${BASE_URL}/api/user/login`;
export const USER_REGISTRATION_URL=`${BASE_URL}/api/user/registration`;
export const CHECKOUT_URL=`${BASE_URL}/api/payment/checkout`
