const db = require('../models/index');
const functions = require('./functions/index');

exports.registerCar = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, process.env.SECURITYGUARD_CODE);
    const { vehicle_type, plate_number, color, brand, model_number, custom } = request.body;
    if (plate_number != undefined || plate_number != null) {
      functions.validDetails(custom, plate_number);
      db(process.env.CARDB).where('plate_number', plate_number).first().then(data => {
        if (!data) {
          db(process.env.CARDB).insert({
            vehicle_type,
            plate_number,
            color,
            brand,
            model_number,
            custom
          }, '*')
            .then((data) => response.status(201).json({
              message: `You have registered ${data[0].plate_number}`
            }))
            .catch(err => {
              if (err.code === "2P02") {
                next(new Error("Input all fields"))
              } else {
                next(new Error)("Database error")
              };
            });
        } else {
          response.status(409).json("Plate number is already registered")
        };
      });
    } else {
      next(new Error("Plate Number is either null or undefined"))
    };
  } catch (error) {
    next(error);
  };
};
exports.createVehicleEntry = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, process.env.SECURITYGUARD_CODE);
    const { plate_number } = request.body;
    if (plate_number != undefined || plate_number != null) {
      db(process.env.CARDB).where('plate_number', plate_number).first().then(car => {
        if (!car) {
          response.status(406).json("Car doesn't exist in database, please capture car details first");
        } else {
          db(process.env.CAR_LOG_DB).insert({ car_id: car.id }, '*').then((log) => {
            response.status(201).json({
              message: "New Entry for " + car.plate_number + " has been made",
              data: log[0]
            });
          }).catch(err => next(new Error("Database Error")));
        };
      });
    } else {
      next(new Error("Plate Number is either null or undefined"));
    };
  } catch (error) {
    next(error);
  };
};
exports.closeVehicleEntry = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, process.env.SECURITYGUARD_CODE);
    const { id } = request.params;
    if (id != undefined || id != null) {
      db(process.env.CAR_LOG_DB).where('id', id).first().then(car => {
        if (car) {
          db(process.env.C_CAR_LOG_DB).insert({ vehicle_log_id: id, }, '*').then(log => {
            db(process.env.CAR_LOG_DB).where('id', log[0].vehicle_log_id).update({ active: false }, '*').then()
              .catch(error => response.status(409).json("Error updating visit state, please refresh page"));
            response.status(202).json({
              message: `Visit with id ${log[0].vehicle_log_id} has been closed`
            }
            );
          })
            .catch(error => next(new Error("Error closing visit")));
        } else {
          next(new Error("Car Entry doesn't exist"))
        };
      });
    } else {
      next(new Error("id is either null or undefined"))
    };
  } catch (error) {
    next(error)
  };
};
exports.viewCarsOnsite = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, process.env.SECURITYGUARD_CODE);
    db.select('vehicle_log.id', 'plate_number', 'brand', 'model_number', 'color', 'date', 'active', 'entry_time')
      .from(process.env.CARDB)
      .innerJoin('VMS.vehicle_log', 'VMS.vehicle_log.car_id', 'VMS.vehicle_info.id')
      .where('active', true)
      .then(data => { response.status(202).json(data) })
      .catch(err => response.status(500).json("Query Error Contact Administrator"));
  } catch (error) {
    next(error);
  };
};
exports.viewCarLog = async (request, response, next) => {
  functions.validUser(request.user.account_role, process.env.SECURITYGUARD_CODE);
  const { offset } = request.query;
  db.select(`VMS.vehicle_log.id`, 'plate_number', 'brand', 'model_number', 'color', 'date', 'active', 'entry_time', 'exit_time', 'exit_date')
    .from(process.env.CARDB)
    .innerJoin('VMS.vehicle_log', 'VMS.vehicle_log.car_id', 'VMS.vehicle_info.id')
    .innerJoin('VMS.closed_vehicle_log', 'VMS.vehicle_log.id', 'VMS.closed_vehicle_log.vehicle_log_id')
    .orderBy('exit_date', 'desc')
    .orderBy('exit_time', 'desc')
    .limit(15)
    .offset(offset)
    .then(data => {
      response.status(202).json(data);
    })
    .catch(err => response.status(500).json("Query Error Contact Administrator"));
};
exports.viewRegisteredCars = async (request, response, next) => {
  functions.validUser(request.user.account_role, process.env.SECURITYGUARD_CODE);
  db.select('*')
    .from(process.env.CARDB)
    .where(db.raw("created_date > now() - interval '2 week'::interval"))
    .orderBy('created_date', 'desc')
    .orderBy('id', 'desc')
    .then(data => {
      response.status(202).json(data)
    })
    .catch((err) => {
      console.log(err)
      response.status(500).json("Something Went Wrong")
    })
};
exports.getProfileInfo = async (request, response, next) => {
  try {
    const { id } = request.params;
    if (id !== undefined || id !== null) {
      db.select("id", "plate_number", "brand", "custom", "vehicle_type", "color", "model_number", "created_date")
        .from(process.env.CARDB)
        .where("id", id).first()
        .then(data => { response.status(200).json(data) })
        .catch(error => next(error));
    } else {
      next(new Error("Profile id is either null or undefined"));
    }
  } catch (error) {
    next(error);
  };
};
exports.editProfile = async (request, response, next) => {
  try {
    const { id, vehicle_type, plate_number, color, brand, model_number, custom } = request.body;
    if (plate_number != undefined || plate_number != null) {
      functions.validDetails(custom, plate_number);
      db(process.env.CARDB)
        .where('id', id)
        .update({
          vehicle_type,
          plate_number,
          color,
          brand,
          model_number,
          custom
        }, '*')
        .then(() => response.status(200).json("Profile Updated"))
        .catch((error) => {
          switch (error.code) {
            case "23505":
              response.status(409).json("Plate Number as already been registered");
              break;
            default:
              response.status(409).json("Error updating profile info, please try again later or refresh page");
          }
        });
    } else {
      next(new Error("Plate Number is either null or undefined"));
    };
  } catch (error) {
    next(error)
  };
};
