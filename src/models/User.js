class User{
    id;
    name;
    email;
    password;
    isAdmin;
    constructor(id,name,email,password,isAdmin){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}

export default User;