<option value="60ed5d963df1053630d3ae24">SUPERUSER</option>
                              <option value="60ed65b6648f122630ad826a">CEO</option>
                              <option value="60ed668d648f122630ad82d9">EMPLOYEE</option>

                              let userId = localStorage.getItem('userId');
    axios.post(process.env.REACT_APP_BACKEND_API_URL+ '/add/members/company/' + userId)
    .then(response => {
     console.log(response)
   })


   componentDidMount () {
    let userId = localStorage.getItem('userId');
    let companyId = localStorage.getItem('companyId');
    axios.get(process.env.REACT_APP_BACKEND_API_URL+ '/company/asset/dropdown/values/' + companyId)
    .then(response => {
      console.log(response.data.data.roles)
     //  this.setState({
     //    Input : { ...this.state.Input , Role : response.data.data.roles }
     //  })
     //  console.log(this.state.Input.Role)     
    })
  }