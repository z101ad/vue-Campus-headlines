import axios from "@/utils/request"

//获取联想数据
export async function getSuggest(params){
    return await axios.get("suggestion",{params})
}

//获取搜索结果
export async function getSearchResults(params){
    return await axios.get("search",{params})
}