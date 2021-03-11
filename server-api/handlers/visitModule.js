const db = require('../models/index');
const functions = require('./functions/index');

exports.logNewVisit = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, process.env.RECEPTIONIST_CODE)
    const { first_name, last_name, who_to_see, image_url, phone_number, identification_type, identification_number } = request.body;
    if (first_name != undefined && who_to_see != undefined && phone_number != undefined && identification_type != undefined && identification_number != undefined) {
      functions.validLogVisit(first_name, phone_number, identification_number, who_to_see)
      db(process.env.VISIT_LOG_DB)
        .insert({ first_name, last_name, who_to_see, phone_number, type_id: identification_type, identification_number, image_url }, '*')
        .then(() => response.status(202).json(`You have sucessfully logged a new visit`))
        .catch(err => {
          if (err.code === "23503") { //error code can change depending on postgres database version
            err.message = `user ${who_to_see} does not exist`;
            err.status = 412;
            next(err)
          } else {
            next(new Error("Database Error Contact Admin"))
          };
        })
    } else {
      response.status(402).json("Invalid Details, please check First Name, Phone Number & Identification Number field");
    };
  } catch (error) {
    next(error)
  }
};
exports.closeVisit = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, process.env.RECEPTIONIST_CODE)
    const { id } = request.params
    db(process.env.VISIT_LOG_DB)
      .where('id', id)
      .first()
      .then(visit => {
        if (!visit) {
          next(new Error("Visit doesn't exist"));
        } else if (!visit.active) {
          next(new Error('Visit has been ended already'))
        } else {
          db(process.env.C_VISIT_LOG_DB)
            .insert({ visit_log_id: visit.id }, '*')
            .then(log => {
              db(process.env.VISIT_LOG_DB)
                .where('id', log[0].visit_log_id)
                .update({ active: false }, '*')
                .then()
                .catch(() => next({ message: "Error updating visit state", status: 500 }))
              response.status(202).json({ message: `Visit to ${visit.who_to_see} has been ended` });
            })
            .catch(() => next(new Error("Error Closing visit")));
        };
      })
  } catch (error) {
    next(error)
  };
};
exports.viewVisits = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, process.env.RECEPTIONIST_CODE);
    const { offset } = request.query
    db.select(
      'VMS.visit_log.id',
      'VMS.visit_log.first_name',
      'VMS.visit_log.last_name',
      'VMS.type_info.type_name AS identification_type',
      'identification_number',
      'VMS.visit_log.phone_number',
      'VMS.account.username AS who_to_see',
      'date AS entry_date',
      'entry_time',
      'exit_time',
      'exit_date')
      .from(process.env.VISIT_LOG_DB)
      .innerJoin(process.env.C_VISIT_LOG_DB, `${process.env.VISIT_LOG_DB}.id`, `${process.env.C_VISIT_LOG_DB}.visit_log_id`)
      .innerJoin(process.env.TYPEDB, `${process.env.VISIT_LOG_DB}.type_id`, `${process.env.TYPEDB}.id`)
      .innerJoin(process.env.ACCOUNTDB, `${process.env.VISIT_LOG_DB}.who_to_see`, `${process.env.ACCOUNTDB}.username`)
      .orderBy('exit_date', 'desc')
      .orderBy('exit_time', 'desc')
      .limit(15)
      .offset(offset)
      .then(data => {
        response.status(202).json(data)
      })
      .catch(err => {
        next(new Error('Query Error'))
      });;
  } catch (error) {
    next(error)
  };
};
exports.viewActiveVisits = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, process.env.RECEPTIONIST_CODE);
    db.select(
      'VMS.visit_log.id',
      'VMS.visit_log.first_name',
      'VMS.visit_log.last_name',
      'VMS.type_info.type_name AS identification_type',
      'identification_number',
      'VMS.visit_log.phone_number',
      'VMS.account.username AS who_to_see',
      'date AS entry_date',
      'entry_time')
      .from(process.env.VISIT_LOG_DB)
      .innerJoin(process.env.ACCOUNTDB, `${process.env.VISIT_LOG_DB}.who_to_see`, `${process.env.ACCOUNTDB}.username`)
      .innerJoin(process.env.TYPEDB, `${process.env.VISIT_LOG_DB}.type_id`, `${process.env.TYPEDB}.id`)
      .where('active', true)
      .orderBy('date', 'desc')
      .then(data => response.status(202).json(data))
      .catch(() => next(new Error("Query Error")))
  } catch (error) {
    next(error)
  };
};
exports.searchForUsers = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, process.env.RECEPTIONIST_CODE);
    const { search } = request.body;
    db(process.env.ACCOUNTDB)
      .select(db.raw("id, first_name || ' ' || last_name AS full_name, username, phone_number"))
      .where(db.raw(`(first_name || ' ' || last_name ILIKE '%${search}%' OR phone_number ILIKE '%${search}%')`))
      .then(users => {
        if (!users.length) {
          next(new Error("No Match for user in database"));
        } else {
          response.status(202).json({
            message: "Users Found",
            data: users
          })
        };
      })
      .catch(error => next(error));

  } catch (error) {
    next(error)
  };
};
exports.getUser = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, process.env.RECEPTIONIST_CODE);
    const { id } = request.params;
    if (!id) {
      next({ message: "No Data Sent To Check", status: 411 })
    }
    db(process.env.ACCOUNTDB)
      .where('id', id)
      .first()
      .then(user => {
        if (!user) {
          next(new Error("User Doesn't Exist"))
        } else {
          response.status(202).json(user.username)
        }
      })
      .catch(error => {
        next(error)
      })
  } catch (error) {
    next(error)
  };
};
exports.findAppointment = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, process.env.RECEPTIONIST_CODE);
    const { id } = request.params;
    db.select(
      `${process.env.APPOINTMENTDB}.id`,
      `${process.env.APPOINTMENTDB}.first_name`,
      `${process.env.APPOINTMENTDB}.last_name`,
      `${process.env.APPOINTMENTDB}.phone_number`,
      `${process.env.APPOINTMENTDB}.appointment_date`,
      `${process.env.APPOINTMENTDB}.appointment_time`,
      `${process.env.ACCOUNTDB}.username AS who_to_see`)
      .from(process.env.APPOINTMENTDB)
      .innerJoin(process.env.ACCOUNTDB, `${process.env.APPOINTMENTDB}.account_id`, `${process.env.ACCOUNTDB}.id`)
      .where(`${process.env.APPOINTMENTDB}.id`, id)
      .first()
      .then(data => {
        if (!data) {
          response.status(404).json("Appointment Doesn't exist, check appointment code again");
        } else {
          response.status(202).json(data);
        };
      })
      .catch(() => next({message:"Appointment Doesn't exist", status: 411}));
  } catch (error) {
    next(error)
  }
};
exports.getLogProfile = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, process.env.RECEPTIONIST_CODE);
    const { id } = request.params;
    db.select(
      'VMS.visit_log.id',
      'VMS.visit_log.first_name',
      'VMS.visit_log.last_name',
      'VMS.visit_log.type_id AS identification_type',
      'identification_number',
      'VMS.visit_log.phone_number',
      'VMS.account.username AS who_to_see')
      .from(process.env.VISIT_LOG_DB)
      .innerJoin(process.env.ACCOUNTDB, `${process.env.VISIT_LOG_DB}.who_to_see`, `${process.env.ACCOUNTDB}.username`)
      .innerJoin(process.env.TYPEDB, `${process.env.VISIT_LOG_DB}.type_id`, `${process.env.TYPEDB}.id`)
      .where("VMS.visit_log.id", id)
      .first()
      .then(data => response.status(200).json(data))
      .catch(error => next(error))
  } catch (error) {
    next(error)
  }
};
exports.updateLogEntry = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, process.env.RECEPTIONIST_CODE);
    const { id, first_name, last_name, who_to_see, image_url, phone_number, identification_type, identification_number } = request.body;
    if (first_name != undefined && who_to_see != undefined && phone_number != undefined && identification_type != undefined && identification_number != undefined) {
      functions.validLogVisit(first_name, phone_number, identification_number, who_to_see);
      db(process.env.VISIT_LOG_DB)
        .where('id', id)
        .update({ first_name, last_name, who_to_see, image_url, phone_number, type_id: identification_type, identification_number }, '*')
        .then(() => response.status(202).json("Log entry updated successfully"))
        .catch((error) => {
          switch (error.code) {
            case "23505":
              response.status(409).json("Plate Number as already been registered");
              break;
            default:
              response.status(409).json("Error updating profile info, please try again later or refresh page");
              break;
          }
        });
    } else {
      next(new Error("Plate Number is either null or undefined"));
    };
  } catch (error) {
    next(error)
  };
};