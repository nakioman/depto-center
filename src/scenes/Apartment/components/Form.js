import React, { Component } from 'react';
import { Typeahead, Menu, MenuItem } from 'react-bootstrap-typeahead';

import states from '../states';

class ApartmentForm extends Component {
  state = {
    address: '',
    postalCode: '',
    state: '',
  };

  componentWillMount() {
    const { apartment } = this.props;
    if (apartment) {
      this.setState({ address: apartment.address, postalCode: apartment.postalCode, state: apartment.state });
    }
  }

  handleFormGroupValidationState = (formGroup, valid) => {
    if (valid) {
      formGroup.classList.remove('has-danger');
      formGroup.classList.add('has-success');
    } else {
      formGroup.classList.add('has-danger');
      formGroup.classList.remove('has-success');
    }
  }

  handleAddressChange = (event) => {
    this.setState({ address: event.target.value });
    this.handleFormGroupValidationState(this.addressFormGroup, event.target.value.trim() !== '');
  }

  handlePostalCodeChange = (event) => {
    this.setState({ postalCode: event.target.value });
    this.handleFormGroupValidationState(this.postalCodeFormGroup, event.target.value.trim() !== '');
  }

  handleStateChange = (items) => {
    const id = items[0].id;
    this.setState({ state: id });
    const index = states.findIndex(x => x.id === id);
    this.handleFormGroupValidationState(this.stateFormGroup, index !== -1);
  }

  renderMenu(results, menuProps) {
    return (
      <Menu {...menuProps}>
        {results.map((tag, i) => {
          return (
            <MenuItem className="dropdown-item" option={tag} position={i} key={i}>
              {tag.name}
            </MenuItem>
          );
        })}
      </Menu>
    );
  }

  submitForm = () => {
    let valid = true;
    let focus = null
    if (this.state.address.trim() === '') {
      this.handleFormGroupValidationState(this.addressFormGroup, false);
      valid = false;
      focus = this.addressInput;
    }
    if (this.state.postalCode.trim() === '') {
      this.handleFormGroupValidationState(this.postalCodeFormGroup, false);
      valid = false;
      focus = !focus ? this.postalCodeInput : focus;
    }
    if (this.state.state.trim() === '') {
      this.handleFormGroupValidationState(this.stateFormGroup, false);
      valid = false;
      focus = !focus ? this.stateInput.instanceRef : focus;
    }
    if (valid) {
      this.props.submitForm(this.state);
    } else {
      focus.focus();
    }
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.submitForm();
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group" ref={input => this.addressFormGroup = input} >
              <input type="text" value={this.state.address}
                autoFocus placeholder="Dirección" className="form-control"
                onChange={this.handleAddressChange}
                ref={input => this.addressInput = input}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group" ref={input => this.postalCodeFormGroup = input}>
              <input type="text" value={this.state.postalCode}
                placeholder="Codigo postal" className="form-control"
                ref={input => this.postalCodeInput = input}
                onChange={this.handlePostalCodeChange} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group" ref={input => this.stateFormGroup = input}>
              <Typeahead
                labelKey="name"
                options={states}
                placeholder="Elija una provincia..."
                renderMenu={this.renderMenu}
                onChange={this.handleStateChange}
                ref={input => this.stateInput = input}
                selected={states.find(x => x.id === this.state.state) ? [states.find(x => x.id === this.state.state)] : []}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary float-right">
          {this.props.apartment && 'Editar'}
          {!this.props.apartment && 'Agregar'}
        </button>
      </form>
    );
  }
}

export default ApartmentForm;
