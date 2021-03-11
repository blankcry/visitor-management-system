import React from 'react';
import closeButton from '../design/closeButton.png'

export default (props) => {
  const details = () => {
    if (props.for === 'cars' && props.info.length > 0) {
      return props.info.map(car => (
        <tr key={car.id}>
          <td>{car.plate_number}</td>
          <td>{car.brand}</td>
          <td>{car.model_number}</td>
          <td>{car.color}</td>
          <td>{(car.date).slice(0, 10)}</td>
          <td>{(car.entry_time).slice(0, 8)}</td>
          {car.exit_date ?
            <td>{(car.exit_date).slice(0, 10)}</td>
            :
            null
          }
          {car.exit_time ?
            <td>{(car.exit_time).slice(0, 8)}</td>
            :
            <td>
              <button type="button" onClick={() => props.closeLog(car.id)} className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off">
                Close Visit
              </button>
            </td>
          }
        </tr>
      ));
    } else if (props.for === 'visits' && props.type === 'active_logs' && props.info.length > 0) {
      return props.info.map(visit => (
        <tr key={visit.id}>
          <td onClick={() => props.openModal(visit.id, visit.who_to_see)}>Edit</td>
          <td>{visit.first_name}</td>
          <td>{visit.last_name}</td>
          <td>{visit.identification_type}</td>
          <td>{visit.identification_number}</td>
          <td>{visit.phone_number}</td>
          <td>{(visit.entry_date).slice(0, 10)}</td>
          <td>{(visit.entry_time).slice(0, 8)}</td>
          <td>
            <image>
            </image>
            <button type="button" onClick={() => props.closeLog(visit.id)} className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off">
              Close
            </button>
          </td>
        </tr>
      ))
    } else if (props.for === 'visits' && props.type === 'closed_logs' && props.info.length > 0) {
      return props.info.map(visit => (
        <tr key={visit.id}>
          <td>{visit.first_name}</td>
          <td>{visit.last_name}</td>
          <td>{visit.identification_type}</td>
          <td>{visit.identification_number}</td>
          <td>{visit.phone_number}</td>
          <td>{(visit.entry_date).slice(0, 10)}</td>
          <td>{(visit.entry_time).slice(0, 8)}</td>
          <td>{(visit.exit_date).slice(0, 10)}</td>
          <td>{(visit.exit_time).slice(0, 8)}</td>
        </tr>
      ))
    } else if (props.for === 'userVisits' && props.info.length > 0) {
      return props.info.map(visit => (
        <tr key={visit.id}>
          <td>{visit.first_name}</td>
          <td>{visit.last_name}</td>
          <td>{visit.phone_number}</td>
          <td>{visit.identification_type}</td>
          <td>{(visit.visit_date).slice(0, 10)}</td>
          <td>{(visit.entry_time).slice(0, 8)}</td>
          <td>{(visit.exit_date).slice(0, 10)}</td>
          <td>{(visit.exit_time).slice(0, 8)}</td>
        </tr>
      ))
    } else if (props.for === 'userappointments' && props.info.length > 0) {
      return props.info.map(appointment => (
        <tr key={appointment.id}>
          <td onClick={() => props.openModal(appointment.id)}>edit</td>
          <td>{appointment.id}</td>
          <td>{appointment.first_name}</td>
          <td>{appointment.last_name}</td>
          <td>{appointment.phone_number}</td>
          <td>{(appointment.appointment_date).slice(0, 10)}</td>
          <td>{(appointment.appointment_time)}</td>
          <td>{(appointment.date).slice(0, 10)}</td>
          <td>
            <button onClick={() => props.closeLog(appointment.id)} type='button' className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off">Delete</button>
          </td>
        </tr>
      ))
    } else {
      return null
    };
  };
  function resetLogView() {
    props.updateView(0);
  };
  return (
    <div>
      {props.for === 'cars' ?
        <div className='card-body'>
          {props.filtered ? <button className="btn btn-primary" onClick={() => resetLogView()}>View Full Log</button> : null}
          <table className="table table-striped">
            <thead className="black white-text">
              <tr>
                <th scope="col">Plate Number</th>
                <th scope="col">Brand</th>
                <th scope="col">Model Number</th>
                <th scope="col">Color</th>
                <th scope="col">Entry Date</th>
                <th scope="col">Entry Time</th>
                {props.type === 'closed_logs' ?
                  <th scope="col">Exit Date</th>
                  :
                  null
                }
                {props.type === 'closed_logs' ?
                  <th scope="col">Exit Time</th>
                  :
                  <th scope="col">Close</th>
                }
              </tr>
            </thead>
            <tbody>
              {details()}
            </tbody>
          </table>
        </div>
        : props.for === 'visits' ?
          <div className='card-body'>
            {props.filtered ? <button className="btn btn-primary" onClick={() => resetLogView()}>View Full Log</button> : null}
            <table className="table table-striped table-bordered">
              <thead className="black white-text">
                <tr>
                  {props.type !== 'closed_logs' ?
                    <th scope="col"></th>
                    :
                    null
                  }
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Identification Type</th>
                  <th scope="col">Identification Number</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Entry Date</th>
                  <th scope="col">Entry Time</th>

                  {props.type === 'closed_logs' ?
                    <th scope="col">Exit Date</th>
                    :
                    null
                  }
                  {props.type === 'closed_logs' ?
                    <th scope="col">Exit Time</th>
                    :
                    <th scope="col">Close</th>
                  }
                </tr>
              </thead>
              <tbody>
                {details()}
              </tbody>
            </table>
          </div>
          : props.for === 'userVisits' ?
            <div className='card-body'>
              {props.filtered ? <button className="btn btn-primary" onClick={() => resetLogView()}>View Full Log</button> : null}
              <table className="table table-striped">
                <thead className="black white-text">
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Identification Type</th>
                    <th scope="col">Visit Date</th>
                    <th scope="col">Entry Time</th>
                    <th scope="col">Exit Date</th>
                    <th scope="col">Exit Time</th>
                  </tr>
                </thead>
                <tbody>
                  {details()}
                </tbody>
              </table>
            </div>
            : props.for === 'userappointments' ?
              <div className='card-body'>
                <table className="table table-striped">
                  <thead className="black white-text">
                    <tr>
                      <th scope='col'></th>
                      <th scope="col">Appointment Code</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Appointment Date</th>
                      <th scope="col">Appointment Time</th>
                      <th scope="col">Created Date</th>
                      <th scope='col'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {details()}
                  </tbody>
                </table>
              </div>
              :
              null
      }
    </div>
  );
};