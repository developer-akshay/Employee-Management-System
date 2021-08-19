import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { Form, Modal, Button } from 'semantic-ui-react'
import axios from 'axios'
import Select from 'react-select'
import TimePicker from 'react-time-picker';
import 'semantic-ui-css/semantic.min.css'
var options = [];
// var emps=[];
class View extends Component {
  state = {
    isOpen: false,
    id: '',
    emps: [],
    form: {
      time: "00:00",
      notess: "",
    },
    empEmail: "",
  }
  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      form: { ...this.state.form, [name]: value },
    })
  }
  componentDidMount() {
    axios.get("http://localhost:9001/emps")
      .then(res => {
        console.log("responce notes:", res)
        // history.push("/login")
        this.setState({ emps: res.data })
        res.data.forEach((user) => {
          options.push({ value: user.emailid, label: user.firstname })
        })
      })
  }
  onClose = () => {
    this.setState({ isOpen: false })
  }

  onOpen = () => {
    this.setState({ isOpen: true, id: this.props.id })
  }

  handleouttime = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    const { time } = this.state.form
    const { notess } = this.state.form

    const { empEmail } = this.state
    console.log(empEmail)
    // const { addRow } = this.props
    const outtime = {
      time,
      notess,
      Email: empEmail.value

    }
    console.log("out time", outtime)
    axios.put("http://localhost:9001/outtime", outtime)
      .then(res => {
        console.log("responce notes:", res)
        // history.push("/login")
      })
  }
  onChange = (value) => {
    console.log("out time value new state", value)
    this.setState({ form: { time: value } });
  }
  handleSelect = (selectedOption) => {
    this.setState({ empEmail: selectedOption });
  }

  render() {
    const { isOpen, id, emps } = this.state
    const { time } = this.state.form
    const { notess } = this.state.form

    const { data, getUserById } = this.props

    return (
      <div>
        {emps.length > 0 ?
          <Table sortable celled fixed style={{ "borderWidth": "1px", 'borderColor': "black", 'borderStyle': 'solid' }} >
            <Table.Header style={{
              borderBottom: 'solid 1px black',
              background: '#6495ED',
              color: 'black',
              fontWeight: 'bold',
            }}>
              <Table.Row >
                <Table.HeaderCell>Employee Name</Table.HeaderCell>
                {/* <Table.HeaderCell>LastName</Table.HeaderCell> */}
                <Table.HeaderCell>Designation</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>CheckIn</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
                <Table.HeaderCell>OutTime</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>

              </Table.Row>
            </Table.Header>
            <Table.Body>

              {emps.map(row => (
                <Table.Row style={{
                  borderBottom: 'solid 1px black',
                  color: 'black',
                }} key={row.name}>
                  <Table.Cell>{row.firstname}&nbsp;{row.lastname}</Table.Cell>
                  {/* <Table.Cell>{row.lastname}</Table.Cell> */}
                  <Table.Cell>{row.selectdesignation}</Table.Cell>
                  <Table.Cell>{row.emailid}</Table.Cell>
                  <Table.Cell>{row.checkin}</Table.Cell>
                  <Table.Cell>{row.notes}</Table.Cell>

                  {row.time ? <Table.Cell>{row.time}</Table.Cell> :


                    <Modal trigger={<Button content="Add" />} closeIcon>
                      <Modal.Header style={{
                        borderBottom: 'solid 1px black',
                        color: 'black',
                        fontWeight: 'bold',
                        'text-align': 'center',
                      }}>Employee CheckOut Time</Modal.Header>

                      <Modal.Content>
                        <Form onSubmit={this.handleouttime}>
                          <Form.Field>
                            <Select options={options} onChange={this.handleSelect} /> <br></br>
                            <TimePicker
                              onChange={this.onChange}
                              value={time}
                            />
                          </Form.Field>
                          <br></br>
                          <Form.Field>

                            <Form.Input
                              label="Notes"
                              name="notess"
                              value={notess}
                              onChange={this.handleChange}
                            />
                          </Form.Field>

                          <Button inverted color='green' type="submit" content="Save" />
                          <Button inverted color='orange' type="reset" content="Cancel" />
                        </Form>
                      </Modal.Content>
                    </Modal>
                  }
                  <Table.Cell>{row.notess}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          : null}
      </div>
    )
  }
}
export default View

