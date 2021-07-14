import  { Component } from 'react';

class DateConversion  extends Component{
    constructor(props) {
      super(props);
      this.state = {
        date:this.props.date,
        format:this.props.format,
      };
    }
    componentWillReceiveProps(nextProps){
      if (nextProps.date !== this.props.date) {
        this.setState({ date: nextProps.date })
      }
    }
    render(){
        let date;
        const todayTime = new Date(this.state.date);
        let month = todayTime.getMonth() +1; 
             month =  month > 9 ? "" + month: "0" + month;
        let day = todayTime.getDate();
             day =  day > 9 ? "" + day: "0" + day;
        let year = todayTime.getFullYear();
        let hours = todayTime.getHours();
        let mins = todayTime.getMinutes();
            mins = mins > 9 ? "" + mins: "0" + mins;
        //var time = todayTime.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        if(this.state.format === "indian"){
          date =  day +"-" +month + "-" +year
        }else if(this.state.format === "usa"){
          date = month + "-" + day + "-" + year + "  "+ hours +":" + mins;
        }
        else{
           date =  year + "-" +month+"-" +day
        }
       
      return (
      
          date
      ); 
    }
  }
  export default DateConversion;
