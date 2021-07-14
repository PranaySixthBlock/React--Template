
import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API_URL,
    timeout: 15000,
});
// var token = localStorage.getItem("Rjstoken");
// const loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;
instance.defaults.headers.common['Authorization'] = localStorage.getItem('Rjstoken');
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


instance.interceptors.request.use(function (config) {
  
    if(config.timeout===300000){
      document.body.classList.add('rss-loading-indicator');
    }else{
        document.body.classList.add('loading-indicator');
    }
  
    return config;
  }, function (error) {
    return Promise.reject(error);
  });  
instance.interceptors.response.use(function (config) {
  if(config.config.timeout===300000){
    document.body.classList.remove('rss-loading-indicator');
  }else{
      document.body.classList.remove('loading-indicator');
  }
   
    return config;
  }, function (error) {
    document.body.classList.remove('loading-indicator');
    document.body.classList.remove('rss-loading-indicator');
   
    if(error.response){
        if(error.response.status === 401||error.response.status === 403 ){
            localStorage.clear()
            window.location = process.env.REACT_APP_PORTAL_URL;
            //alert(error.response.data.message)
        }else if(error.response.status === 500){
          console.log(error.response.data.message);
          // console.log(error.config.url);
        //  sendEmail(error.response.data.message,error.config.url);
          //window.location = '/#/500';
          //alert(error.response.data.message)
      } 
    }
    if(!error.response){
    //  sendEmail(error.toString(),error.config.url);
      //localStorage.clear()
      window.location = '/#/500';
    }
    return Promise.reject(error);
  });

  
  function sendEmail(errorMessage,urlEndpoint){ 
    axios.post( process.env.REACT_APP_BACKEND_API_URL+'customer/skill/imrovement',{"suggestion":"500 Error ,  "+ errorMessage+", And error was at" +(localStorage.getItem('templateType'))+ ":" +urlEndpoint})
    .then(response => {
        if(!response.status === 200 ){
          console.error(response.data.error.message)
        }
    })
    .catch(function (error) {
      console.error(error)
    });
  }
export default instance;