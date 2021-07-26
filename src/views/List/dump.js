addImageToPost = async(e) => {
  if(e.target.files.length >= 5){
     toast.error("Cannot add more than 5 images")
  }
  else{
    console.log(e.target.files)
    let array = [];
    for( let x = 0; x < e.target.files.length; x++){
      array.push(e.target.files[x])
    }
   await this.setState({
     files : array,
   } , () => console.log(this.state.files) )     
   
   for (var i = 0; i < this.state.files.length; i++) {
     var file = this.state.files[i];
     // if (!file.type.match('image')) continue;

 const reader = new FileReader();
 reader.addEventListener('load' , async (readerEvent) => {
   let copy = this.state.imageToPost
   console.log('reader')

   if(copy.includes( readerEvent.target.result)){
     toast.error('Image has been added earlier')
     console.log(this.state.imageToPost.length)
   }else{
   copy.push ({src : readerEvent.target.result })
    await this.setState({
       imageToPost : copy
     } , () => console.log(this.state.imageToPost))
 }
 })
 reader.readAsDataURL(file)
}}
}
//================================================================================================================================================

onFileChange(e, totalFileArrayLength) {
  this.fileObj.push(e.target.files);
  // this.setState({ })
  // let fileState = values
  let fileLength = e.target.files.length + totalFileArrayLength;
  // console.log(this.fileObj, totalFileArrayLength);
  if (e.target.files.length == 0) {
    e.target.value = null;
    this.fileArray = [];
    this.setState({ ...this.state })
  }else if (fileLength <= 5) {
    if (this.fileObj.length === 1) {
      for (let i = 0; i < this.fileObj[0].length; i++) {
        console.log(this.fileObj[0][i]);
        let fileExtenstion = this.fileObj[0][i].name.split(".").pop();
        if (
          (this.fileObj[0][i].type === "image/png" ||
            this.fileObj[0][i].type === "image/jpeg" ||
            this.fileObj[0][i].type === "application/pdf" ||
            this.fileObj[0][i].type === "text/plain") &&
          this.fileObj[0][i].size <= 5000000
        ) {
          this.fileArray.push({
            url: URL.createObjectURL(this.fileObj[0][i]),
            type: fileExtenstion,
            name: this.fileObj[0][i].name
          });
          this.setState({ imgCollection: e.target.files });
          this.props.parentFunc(e.target.files, this.fileObj);
        } else {
          if (
            (this.fileObj[0][i].type === "image/png" ||
              this.fileObj[0][i].type === "image/jpeg" ||
              this.fileObj[0][i].type === "application/pdf" ||
              this.fileObj[0][i].type === "text/plain") &&
            this.fileObj[0][i].size <= 5000000
          ) {
            Toast.fire({
              type: "error",
              title: "Please upload a Image smaller than 5 mb"
            });
          } else {
            Toast.fire({
              type: "error",
              title: "Please upload a PNG or JPG images only"
            });
          }
          e.target.value = null;
          this.setState({ imgCollection: "" });
        }
      }
      // console.log(values);
    } else {
      this.fileArray.length = 0;
      this.fileObj.length = 0;
      this.fileObj.push(e.target.files);

      for (let i = 0; i < this.fileObj[0].length; i++) {
        let fileExtenstion = this.fileObj[0][i].name.split(".").pop();
        var reader = new FileReader();
        var testUrl = reader.readAsDataURL(this.fileObj[0][i]);
        console.log(this.fileObj[0][i], testUrl);
        if (
          (this.fileObj[0][i].type === "image/png" ||
            this.fileObj[0][i].type === "image/jpeg" ||
            this.fileObj[0][i].type === "application/pdf" ||
            this.fileObj[0][i].type === "text/plain") &&
          this.fileObj[0][i].size <= 5000000
        ) {
          this.fileArray.push({
            url: URL.createObjectURL(this.fileObj[0][i]),
            type: fileExtenstion,
            name: this.fileObj[0][i].name
          });
          this.setState({ imgCollection: e.target.files });
          this.props.parentFunc(e.target.files, this.fileObj);
        } else {
          if (
            (this.fileObj[0][i].type === "image/png" ||
              this.fileObj[0][i].type === "image/jpeg" ||
              this.fileObj[0][i].type === "application/pdf" ||
              this.fileObj[0][i].type === "text/plain") &&
            this.fileObj[0][i].size <= 5000000
          ) {
            Toast.fire({
              type: "error",
              title: "Please upload a Image smaller than 5 mb"
            });
          } else {
            Toast.fire({
              type: "error",
              title: "Please upload a PNG or JPG images only"
            });
          }
          e.target.value = null;
          this.setState({ imgCollection: "" });
        }
      }
    }
  } else {
    this.fileArray.length = 0;
    this.fileObj.length = 0;
    Toast.fire({
      type: "error",
      title: "Cannot upload more than 5 images"
    });
    e.target.value = null;
    this.setState({ imgCollection: "" });
  }
}