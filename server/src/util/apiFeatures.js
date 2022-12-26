class ApiFeatures {
    constructor(model, query,queryStr) {
      this.query = query,
      this.model = model,
      this.queryStr = queryStr;
    }

    search() {
      const keyword = this.queryStr.keyword
        ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          }
        : {};
      this.query = query().find({ ...keyword });
      return this;
    }
  
    filter() {
        
      console.log(this.query())
      const queryCopy = { ...this.queryStr };
      //   Removing some fields for category
      const removeFields = ["keyword", "page", "limit"];
  
      removeFields.forEach((key) => delete queryCopy[key]);
  
      // Filter For Price and Rating
  
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
  
      this.query = query().find(JSON.parse(queryStr));
  
      return this;
    }
  
    pagination(resultPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;
  
      const skip = resultPerPage * (currentPage - 1);
  
      this.query = query().limit(resultPerPage).skip(skip);
  
      return this;
    }
  }
  
  module.exports = ApiFeatures;