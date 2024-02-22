export type SignupUser = {
    fullName:string,
    username:string,
    password:string,
    confirmPassword:string,
    gender:string,
}

export type LoginUser = {
    username:string,
    password:string,
}


export type UserType = {
    _id:string,
    username:string,
    fullName:string,
    profilePic:string,

}