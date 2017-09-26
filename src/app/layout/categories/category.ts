
export class Category {

  constructor(
    public name: string,
    public label?: string,
    public searchable?: boolean
    ) {
      searchable = true
    }

    public setAttributes(params = {name:"", searchable:true, label:""}) {
      console.log("the attributes")
      console.log(params)
      this.name = params.name
      this.label = params.label
      this.searchable = params.searchable
    }

    public getAttributesMap() {
      return {
        label:{Action: "PUT", Value:this.label},
        searchable:{Action: "PUT", Value:this.searchable}
      }
    }

    public formErrors() {
        var errors = []
        if(this.name == "" || this.name == null) {
            errors.push("name cannot be empty")
        }
        return errors
    }
}
