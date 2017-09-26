
export class Item {

  constructor(
    public name: string,
    public mainImage: string,
    public description?: string,
    public keyphrases?: string,
    public category?: string,
    public categoryTag?: string,
    public extraImage1?: string,
    public extraImage2?: string,
    public extraImage3?: string
  ) {
      this.category = ""
      this.categoryTag = ""
      this.description = null
      this.keyphrases = null
      this.mainImage = null
      this.extraImage1 = null
      this.extraImage2 = null
      this.extraImage3 = null
   }

  public setAttributes(params) {
    this.name = params.name
    this.description = params.description
    this.keyphrases = params.keyphrases
    this.category = params.category
    this.categoryTag = params.categoryTag
    this.mainImage = params.mainImage
    this.extraImage1 = params.extraImage1
    this.extraImage2 = params.extraImage2
    this.extraImage3 = params.extraImage3
  }

  public getAttributesMap() {
    if(this.description == "") {
      this.description = null
    }
    if(this.keyphrases == "") {
      this.keyphrases = null
    }
    return {
      description:{Action: "PUT", Value:this.description},
      keyphrases:{Action: "PUT", Value:this.keyphrases},
      categoryTag:{Action: "PUT", Value:this.categoryTag},
      // category:{Action: "PUT", Value:this.category},
      mainImage:{Action: "PUT", Value:this.mainImage},
      extraImage1:{Action: "PUT", Value:this.extraImage1},
      extraImage2:{Action: "PUT", Value:this.extraImage2},
      extraImage3:{Action: "PUT", Value:this.extraImage3}
    }
  }

  public formErrors() {
      var errors = []
      if(this.name == "" || this.name == null) {
          errors.push("name cannot be empty")
      }
      if(this.category == "" || this.category == null) {
          errors.push("select a category")
      }
      // else if (this.mainImage == null) {
      //   errors.push("provide a main image")
      // }
      return errors
  }

  public getFileObjects() {
      return [
        {Key: this.name + "/mainImage.jpg"},
        {Key: this.name + "/extraImage1.jpg"},
        {Key: this.name + "/extraImage2.jpg"},
        {Key: this.name + "/extraImage3.jpg"}
      ]
  }

}
