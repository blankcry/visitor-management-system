const db = require('../models/index');
const functions = require('./functions/index');
const officeUserCode = process.env.OFFICEUSER_CODE;

exports.createNewAppointment = async (request, responose, next) => {
  try {
    // ValidDetails function validates post request made from user to confirm if they meet the USER REQUIREMENTS
    functions.validUser(request.user.account_role, officeUserCode);
    const account_id = request.user.id;
    const { first_name, last_name, phone_number, appointment_date, appointment_time } = request.body;
    db.insert({ account_id, first_name, last_name, phone_number, appointment_date, appointment_time }, '*')
      .from(process.env.APPOINTMENTDB)
      .then(data => {
        responose.status(202).json({
          message: `You have successfully created an appointment ${data[0].first_name} ${data[0].last_name}`
        })
      })
      .catch(() => next({ message: "Error while creating appointment", status: 500 }))
  } catch (error) {
    next(error)
  };
};
exports.deleteAppointment = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, officeUserCode);
    const { id } = request.params;
    functions.searchDatabase(process.env.APPOINTMENTDB, 'id', id).then(data => {
      if (!data) {
        next(new Error("Appointment Doesn't exist"))
      } else {
        db.select('*')
          .from(process.env.APPOINTMENTDB)
          .where('id', id)
          .del()
          .then(() => {
            response.status(202).json({
              message: `You have deleted your appointment with ${data.first_name} ${data.last_name}`
            })
          })
          .catch(error => next(error))
      }
    }).catch(error => next(error))
  } catch (error) {
    next(error)
  };
};
exports.viewAppointment = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, officeUserCode);
    const id = request.user.id;
    db.select('id', 'first_name', 'last_name', 'phone_number', 'appointment_date', 'appointment_time', 'date')
      .from(process.env.APPOINTMENTDB)
      .where('account_id', id)
      .then(data => {
        if (data.length > 0) {
          response.status(202).json({
            message: "",
            data
          });
        } else {
          response.status(202).json({
            message: "You don't have any Appointments",
            data
          });
        }
      })
      .catch(error => {
        next(error)
      });
  } catch (error) {
    next(error)
  };
};
exports.getAppointment = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, officeUserCode);
    const { id } = request.params;
    db(process.env.APPOINTMENTDB).where('id', id).first()
      .then(data => {
        if (!data) {
          next(new Error("Appointment Doesn't exist"))
        } else {
          response.status(202).json(data)
        };
      })
      .catch(error => next(error));
  } catch (error) {
    next(error)
  };
};
exports.editAppointment = async (request, response, next) => {
  try {
    const { id, account_id, first_name, last_name, phone_number, appointment_date, appointment_time } = request.body;
    if (id !== undefined && account_id !== undefined) {
      db(process.env.APPOINTMENTDB)
        .where('id', id)
        .update({
          first_name,
          last_name,
          phone_number,
          appointment_date,
          appointment_time
        }, '*')
        .then(() => response.status(202).json("Appointment Info Has Been Updated Successfully"))
        .catch(() => next({ message: "Appointment Doesn't Exist", status: 411 }))
    } else {
      next({ message: "You have already updated the appointment", status: 500 })
    };
  } catch (error) {
    next(error)
  };
};
exports.viewVisits = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, officeUserCode);
    const { username } = request.user
    const {offset } = request.query
    db.select('VMS.visit_log.id', 'first_name', 'last_name', 'phone_number', 'VMS.type_info.type_name AS identification_type', 'date AS visit_date', 'entry_time', 'exit_date', 'exit_time')
      .from(process.env.VISIT_LOG_DB)
      .innerJoin(process.env.C_VISIT_LOG_DB, `${process.env.VISIT_LOG_DB}.id`, `${process.env.C_VISIT_LOG_DB}.visit_log_id`)
      .innerJoin(process.env.TYPEDB, `${process.env.VISIT_LOG_DB}.type_id`, `${process.env.TYPEDB}.id`)
      .where('who_to_see', username)
      .orderBy('exit_date', 'desc')
      .orderBy('exit_time', 'desc')
      .limit(15)
      .offset(offset)
      .then(data => {
        if (data.length < 1) {
          response.status(202).json({
            message: "You don't have any visits",
            data
          });
        } else {
          response.status(202).json({
            message: "",
            data
          });
        };
      }).catch(error => {
        next(error)
      });
  } catch (error) {
    next(error)
  };
};