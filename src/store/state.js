// 这里是定义数据。
let state={
    start:true,
    msgList:[],
    user:'',
    userList:[],   // 第一步没有运行到actions的时候，通过props传到组件里面的内容直接是state的初始状态，即使是一个空的数组。
}
export default state;