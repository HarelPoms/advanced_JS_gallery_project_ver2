class User{
    id;
    first_name;
    last_name;
    address;
    email;
    phone;
    password;
    isAdmin;
    constructor(id,first_name,last_name,address,email,phone,password,isAdmin){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}

export default User;