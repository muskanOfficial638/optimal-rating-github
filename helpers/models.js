export class LoginModel {
  constructor(data = null) {
    this.email = data ? data.email : '';
    this.password = data ? data.password : '';
  };
};

export class RegisterModel {
  constructor(data = null) {
    this.email = data ? data.email : '';
    this.password = data ? data.password : '';
    this.confirm = data ? data.confirm : '';
  };
};

export class ProfileModel {
  constructor(data) {
    this.username = data && data.username || '';
    this.firstname = data &&  data.firstname || '';
    this.middlename = data &&  data.middlename || '';
    this.lastname = data &&  data.lastname || '';
    this.year = data &&  data.user_details?.birthdate ? data.user_details?.birthdate.split('-')[0] : null;
    this.month = data &&  data.user_details?.birthdate ? data.user_details?.birthdate.split('-')[1] : null;
    this.day = data &&  data.user_details?.birthdate ? data.user_details?.birthdate.split('-')[2] : null;
    this.birthdate = data &&  data.user_details?.birthdate || '';
    this.profile_image = data &&  data.user_details?.profile_image || '' ;
    this.gender = data &&  data.user_details?.gender || '' ;
    this.education = data &&  data.user_details?.education || '';
    this.country_id = data &&  data.country_id || '' ;
    this.city_id = data &&  data.city_id || '' ;
    this.phone_number = data &&  data.user_details?.phone_number || '';
    this.email = data &&  data.email || '';
    this.occupation = data &&  data.user_details?.occupation || '';
    this.marital_status = data &&  data.user_details?.marital_status || '' ;
    this.about = data &&  data.user_details?.about || '';
    this.facebook_url = data &&  data.user_details?.facebook_url || '' ;
    this.instagram_url = data &&  data.user_details?.instagram_url || '';
    this.twitter_url = data &&  data.user_details?.twitter_url || '';
    this.skype_url = data &&  data.user_details?.skype_url || '';
    this.web_url =data &&   data.user_details?.web_url || '' ;
    this.another_url = data &&  data.user_details?.another_url || '';
  };
};

export class ProfileSaveModel {
  constructor(data) {
    this.username = data &&  data.username || '';
    this.firstname = data &&  data.firstname || '';
    this.middlename = data &&  data.middlename || '';
    this.lastname = data &&  data.lastname || '';
    this.country_id = data && data.country_id || null;
    this.city_id = data &&  data.city_id || '';
    this.national_image = null;
    this.portrait_image = data &&  data.portrait_image || '' ;
    this.user_details = {
      birthdate: data &&  data.birthdate || '',
      gender: data.gender || '' ,
      education: data &&  data.education || '',
      phone_number: data &&  data.phone_number || '',
      occupation: data &&  data.occupation || '' ,
      marital_status: data &&  data.marital_status || '' ,
      about: data &&  data.about || '',
      facebook_url: data &&  data.facebook_url || '',
      instagram_url: data &&  data.instagram_url || '',
      twitter_url: data &&  data.twitter_url || '' ,
      skype_url: data &&  data.skype_url || '',
      web_url: data &&  data.web_url || '',
      profile_image: data &&  data.profile_image || '',
      another_url: data &&  data.another_url || ''
    };
  };
};

export class ChoiceModel {
  constructor() {
    this.choice_title = '';
    this.choice_description = '';
    this.marking = 0;
    this.image = '';
  };
};