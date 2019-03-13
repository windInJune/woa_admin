export default{
    userNames: state => {//通过方法访问
        if(!state.username){
            state.username = sessionStorage.getItem('usernameWah')
        }
        return state.username
    },
    userImgs:state => {
        if(!state.userimg){
            state.userimg = sessionStorage.getItem('userimgWah')
        }
        return state.userimg
    }
}