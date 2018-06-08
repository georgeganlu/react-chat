// 设置一个路由跳转的逻辑。

export function redirectUrl(val){
    // 1. 这里跳转的话，有两个点一个是根据type 跳到对应的boss或牛人那里。
    // 2. 一个是根据avatar有没有头像这个字段来判断。
    let url='';
    let {type,avatar}=val;
    if(type==='BOSS'){
        url='/boss';
    }else{
        url='/genius'
    };
    // 这里是头像，如果没有相应的头像就跳转到对应的页面去被全信息。
    if(!avatar){
        url+='info';
    } 
    return url;
}

// 写一个from和to id的合并，与数据库中的chatId来做对比。
export function handleId(from,to){
    return [from,to].sort().join('-');
}
