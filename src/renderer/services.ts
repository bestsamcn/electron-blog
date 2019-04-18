import $http from './utils/request';

import request, { MethodType, ResponseBody } from './utils/request';

//权限
export const login = (params: any) => $http(MethodType.POST, '/admin/login', params, true);
export const logout = (params: any) => $http(MethodType.GET, '/admin/logout', params);
export const getPreviewTotal = (params: any) => $http(MethodType.GET, '/admin/getPreviewTotal', params);
export const delAccess = (params: any) => $http(MethodType.GET, '/admin/delAccess', params);
export const getAccessList = (params: any) => $http(MethodType.GET, '/admin/getAccessList', params);

//标签
export const getTagList = (params: any) => $http(MethodType.GET, '/tag/getList', params);
export const addTag = (params: any) => $http(MethodType.POST, '/tag/add', params, true);
export const delTag = (params: any) => $http(MethodType.GET, '/tag/delete', params, true);
export const editTag = (params: any) => $http(MethodType.POST, '/tag/edit', params, true);

//分类
export const getCategoryList = (params: any) => $http(MethodType.GET, '/category/getList', params);
export const addCategory = (params: any) => $http(MethodType.POST, '/category/add', params, true);
export const delCategory = (params: any) => $http(MethodType.GET, '/category/delete', params, true);
export const editCategory = (params: any) => $http(MethodType.POST, '/category/edit', params, true);

//热词
export const getHotWordList = (params: any) => $http(MethodType.GET, '/hot/getList', params);
export const addHotWord = (params: any) => $http(MethodType.POST, '/hot/add', params, true);
export const delHotWord = (params: any) => $http(MethodType.GET, '/hot/delete', params, true);
export const editHotWord = (params: any) => $http(MethodType.POST, '/hot/edit', params, true);

//留言
export const addMessage = (params: any) => $http(MethodType.POST, '/message/add', params, true);
export const delMessage = (params: any) => $http(MethodType.GET, '/message/delete', params, true);
export const getMessageDetail = (params: any) => $http(MethodType.GET, '/message/getDetail', params, true);
export const getMessageList = (params: any) => $http(MethodType.GET, '/message/getList', params);

//文章
export const addArticle = (params: any) => $http(MethodType.POST, '/article/add', params, true);
export const delArticle = (params: any) => $http(MethodType.GET, '/article/delete', params, true);
export const editArticle = (params: any) => $http(MethodType.POST, '/article/edit', params, true);
export const getArticleList = (params: any) => $http(MethodType.GET, '/article/getList', params, true);
export const getArticleDetail = (params: any) => $http(MethodType.GET, '/article/getDetail', params, true);
export const likeArticle = (params: any) => $http(MethodType.POST, '/article/like', params);
export const getDiffArticle = (params: any) => $http(MethodType.GET, '/article/getDiffArticle', params, true);

//评论
export const addComment = (params: any) => $http(MethodType.POST, '/comment/add', params, true);
export const getCommentList = (params: any) => $http(MethodType.GET, '/comment/getList', params, true);
export const setCommentLike = (params: any) => $http(MethodType.POST, '/comment/like', params, true);
export const delComment = (params: any) => $http(MethodType.GET, '/comment/delete', params, true);
