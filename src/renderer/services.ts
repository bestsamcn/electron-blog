import $http from './utils/request';

import request, { MethodType, ResponseBody } from './utils/request';
console.log(MethodType)



//权限
export const login = (params)=>$http(MethodType.POST, '/admin/login', params, true);
export const logout = (params)=>$http(MethodType.GET, '/admin/logout', params);
export const getPreviewTotal = (params)=>$http(MethodType.GET, '/admin/getPreviewTotal', params);
export const delAccess = (params)=>$http(MethodType.GET, '/admin/delAccess', params);
export const getAccessList = (params)=>$http(MethodType.GET, '/admin/getAccessList', params);

//标签
export const getTagList = (params)=>$http(MethodType.GET, '/tag/getList', params);
export const addTag = (params)=>$http(MethodType.POST, '/tag/add', params, true);
export const delTag = (params)=>$http(MethodType.GET, '/tag/delete', params, true);
export const editTag = (params)=>$http('poast', '/tag/edit', params, true);

//分类
export const getCategoryList = (params)=>$http(MethodType.GET, '/category/getList', params);
export const addCategory = (params)=>$http(MethodType.POST, '/category/add', params, true);
export const delCategory = (params)=>$http(MethodType.GET, '/category/delete', params, true);
export const editCategory = (params)=>$http(MethodType.POST, '/category/edit', params, true);


//热词
export const getHotWordList = (params)=>$http(MethodType.GET, '/hot/getList', params);
export const addHotWord = (params)=>$http(MethodType.POST, '/hot/add', params, true);
export const delHotWord = (params)=>$http(MethodType.GET, '/hot/delete', params, true);
export const editHotWord = (params)=>$http(MethodType.POST, '/hot/edit', params, true);

//留言
export const addMessage = (params)=>$http(MethodType.POST, '/message/add', params, true);
export const delMessage = (params)=>$http(MethodType.GET, '/message/delete', params, true);
export const getMessageDetail = (params)=>$http(MethodType.GET, '/message/getDetail', params, true);
export const getMessageList = (params)=>$http(MethodType.GET, '/message/getList', params);


//文章
export const addArticle = (params)=>$http(MethodType.POST, '/article/add', params, true);
export const delArticle = (params)=>$http(MethodType.GET, '/article/delete', params, true);
export const editArticle = (params)=>$http(MethodType.POST, '/article/edit', params, true);
export const getArticleList = (params)=>$http(MethodType.GET, '/article/getList', params, true);
export const getArticleDetail = (params)=>$http(MethodType.GET, '/article/getDetail', params, true);
export const likeArticle = (params)=>$http(MethodType.POST, '/article/like', params);
export const getDiffArticle = (params)=>$http(MethodType.GET, '/article/getDiffArticle', params, true);

//评论
export const addComment = (params)=>$http(MethodType.POST, '/comment/add', params, true);
export const getCommentList = (params)=>$http(MethodType.GET, '/comment/getList', params, true);
export const setCommentLike = (params)=>$http(MethodType.POST, '/comment/like', params, true);
export const delComment = (params)=>$http(MethodType.GET, '/comment/delete', params, true);

