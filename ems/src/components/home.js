// import React from "react"

// const Homepage = ({setLoginUser}) => {
//     return (
//         <div className="homepage">
//             <h1>Hello Homepage</h1>
//             <div className="button" onClick={() => setLoginUser({})} >Logout</div>
//         </div>
//     )
// }
// export default Homepage
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Input, Container } from 'semantic-ui-react'
import Add from './Add'
import View from './View'

class App extends Component {
  initialState = {
    users: [
      { firstname: 'saim', lastname: 'abc', selectdesignation: "dev", emailid: "a@b.com" },
      { firstname: 'merk', lastname: 'def', selectdesignation: "dev", emailid: "a@bb.com" },
      { firstname: 'shay', lastname: 'xyz', selectdesignation: "dev", emailid: "a@bbb.com" },
    ],
    results: [],
    query: '',
  }

  state = this.initialState

  getUserById = id => {
    const { users } = this.state

    const u = users.filter(user => user.firstname === id)

    return u[0]
  }

  addRow = user => {
    const { users } = this.state

    this.setState({ users: [...users, user] })
  }


  render() {
    const { users, results, query } = this.state
    const data = results.length === 0 && !query ? users : results

    return (
      <Container>
        <Add addRow={this.addRow} />

        <View
          data={data}
          getUserById={this.getUserById}
        />
      </Container>
    )
  }
}
export default App;