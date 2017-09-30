import React from 'react';

import states from '../../states';

const getStateName = (id) => states.find(x => x.id === id).name;

const Detail = ({ apartment, deleteAction, editAction }) => (
  <div>
    <div className="card card-no-shadow" style={{ overflow: 'visible' }}>
      <div className="card-body">
        <h6 className="card-title">Departamento</h6>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group"  >
              <label htmlFor="addressInput">Dirección</label>
              <input type="text" id="addressInput" readOnly value={apartment.address} className="form-control" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="postalCodeInput">Codigo postal</label>
              <input type="text" id="postalCodeInput" value={apartment.postalCode} readOnly className="form-control" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group" >
              <label htmlFor="stateInput">Provincia</label>
              <input type="text" id="stateInput" value={getStateName(apartment.state)} readOnly className="form-control" />
            </div>
          </div>
        </div>
      </div>
      <button type="button" className="btn btn-info" onClick={editAction}>Editar</button>
      <button type="button" className="btn btn-danger float-right" data-toggle="modal" data-target="#deleteApartmentModal">Eliminar</button>
    </div>
    <div className="modal fade" id="deleteApartmentModal" tabIndex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger" id="modalTitle">Eliminar departamento</h5>
          </div>
          <div className="modal-body">
            ¿Está seguro que desea eliminar el departamento? <br />
            Esta operación no se puede deshacer y todo el contenido, incluyendo comprobantes serán eliminados.
                </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default btn-simple" data-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-danger btn-simple" data-dismiss="modal" onClick={deleteAction}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Detail;
