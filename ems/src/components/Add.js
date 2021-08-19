import axios from "axios"
import Select from 'react-select'
import TimePicker from 'react-time-picker';
import React, { Component } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
var options = [];
class Add extends Component {
  initialState = {
    form: {
      firstname: '',
      lastname: '',
      selectdesignation: '',
      emailid: '',
      notes: '',
      selectemp: '',
      checkin: '',
    },
    empEmail: ''
  }
  state = this.initialState

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      form: { ...this.state.form, [name]: value },
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const { firstname, lastname, selectdesignation, emailid, selectemp, notes,  } = this.state.form
    const { addRow } = this.props
    const newUser = {
      firstname,
      lastname,
      selectdesignation,
      emailid,
      notes,
      selectemp,
    }
    axios.post("http://localhost:9001/addEmployee", newUser)
      .then(res => {
        console.log("responce notes:", res)
        if (res.data.message) {
          alert(res.data.message)
        }
        // history.push("/login")
      })
    addRow(newUser)
    this.setState(this.initialState)
  }
  componentDidMount() {
    axios.get("http://localhost:9001/emps")
      .then(res => {
        console.log("responce notes:", res)
        // history.push("/login")
        res.data.forEach((user) => {
          options.push({ value: user.emailid, label: user.firstname })
        })
      })
  }

  handleSelect = selectedOption => {
    console.log(selectedOption)
    this.setState({ empEmail: selectedOption });

  };

  handleintime = (event) => {
    event.preventDefault()
    const { notes } = this.state.form
    const { checkin } = this.state.form
    const { empEmail } = this.state
    console.log(empEmail)
    const { addRow } = this.props
    const intime = {
      notes,
      checkin,
      Email: empEmail.value

    }
    console.log("intime", intime)
    axios.put("http://localhost:9001/checkIn", intime)
      .then(res => {
        console.log("responce notes:", res)
        // history.push("/login")
      })
  }
  onHandleChange = (value) => {
    // debugger;
    console.log("out time value new state", value)
    this.setState({ form: { checkin: value } });
  }

  render() {
    const { firstname, lastname, selectdesignation,
      emailid, notes, empEmail, checkin } = this.state.form

    return (
      <>
        <Modal trigger={<Button content="+Add Employee" />} closeIcon>
          <Modal.Header style={{
            borderBottom: 'solid 1px black',
            color: 'black',
            fontWeight: 'bold',
            'text-align': 'center',
          }}>Add Employee</Modal.Header>

          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Form.Input
                  label="FirstName"
                  name="firstname"
                  value={firstname}
                  onChange={this.handleChange}
                  autoFocus={true}
                />
              </Form.Field>

              <Form.Field>
                <Form.Input
                  label="Lastname"
                  name="lastname"
                  value={lastname}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Form.Input
                  label="Designation"
                  name="selectdesignation"
                  value={selectdesignation}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Form.Input
                  label="Email"
                  name="emailid"
                  value={emailid}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Button inverted color='green' type="submit" content="Save" disabled={!firstname || !lastname || !selectdesignation || !emailid} />
              <Button inverted color='orange' type="reset" content="Cancel" />
            </Form>
          </Modal.Content>
        </Modal>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <Modal trigger={<Button content="+Add Time" />} closeIcon>
          <Modal.Header style={{
            borderBottom: 'solid 1px black',
            // background: '#8AC7DB',
            color: 'black',
            fontWeight: 'bold',
            'text-align': 'center',
          }}>Employee CheckIn Time</Modal.Header>

          <Modal.Content>
            <Form onSubmit={this.handleintime}>
              <Form.Field>
                <Select options={options} onChange={this.handleSelect} />
                <Form.Input
                  label="Notes"
                  name="notes"
                  value={notes}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <TimePicker
                  value={checkin}
                  onChange={this.onHandleChange}
                />
              </Form.Field>
              <br></br><br></br>
              <Button inverted color='green' type="submit" content="Save" disabled={!notes || !checkin} />
              <Button inverted color='orange' type="reset" content="Cancel" />
            </Form>
          </Modal.Content>
        </Modal>
      </>
    )
  }
}
export default Add;