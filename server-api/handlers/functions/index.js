const db = require('../../models/index');

//Functions that exist here are functions that have been called through different handler Modules
//    i.e SearchDatase Function is an asynchronus func used to search a database for a specific redult and finds the first one the returns the data, its being used in the handlers.carModule, and more.
module.exports = {
  searchDatabase: async (databaseName, searchField, searchFieldData) => {
    return await db(databaseName).where(searchField, searchFieldData).first()
  },
  validUser: (userRole, authorizedUserRole) => {
    if (userRole.toString() !== authorizedUserRole.toString()) {
      throw(new Error(("You are Unauthorized to perform this")));
    };
  },
  validAccount: (first_name, account_role, username, password) => {
    if (!username || !password || !account_role || !first_name) {
      throw new Error("Please fill in all required fields");
    } else if (username.length < 5 || password.length < 8){
      throw(new Error("Username or Password field is too short"));
    };
  },
  validDetails: (custom = false, plate_number) => {
    if (custom && plate_number.length < 3) {
      throw { message: "Invalid Vehicle Details, Custom Plate Numbers must be more than 3 digits", status: 411}
    } else if (!custom && plate_number.length < 10) {
      throw {message: "Invalid Vehicle Details, Plate Numbers must be more than 10 digits", status: 411};
    };
  },
  validLogVisit: (first_name, phone_number, identification_number, who_to_see) => {
    if(first_name.length <= 3 || phone_number.length <= 10 || identification_number.length <= 6 || who_to_see.length <= 3) {
      throw{ message: "Please Check Length of Phone Number or Identification Number", status: 411}
    }
  },
};
