export class Opinion {
    username: string;
    city_of_restaurant: string;
    name_of_restaurant: string;
    type_of_restaurant: string;
    opinion: string;

  
    constructor(username?: string, city_of_restaurant?: string, name_of_restaurant?: string, type_of_restaurant?: string, opinion?: string, ) {
      this.username = username || '';
      this.city_of_restaurant = city_of_restaurant || '';
      this.name_of_restaurant = name_of_restaurant || '';
      this.type_of_restaurant = type_of_restaurant || '';
      this.opinion = opinion || '';
    }
  }