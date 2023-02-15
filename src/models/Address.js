class Address{
    state;
    country;
    city;
    street;
    house_Num;
    zip_code
    constructor(country,state,city,street,house_Num,zip_code){
        this.country = country;
        this.state = state;
        this.city = city;
        this.street = street;
        this.house_Num = house_Num;
        this.zip_code = zip_code;
    }
}

export default Address;