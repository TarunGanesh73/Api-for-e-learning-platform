class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    // 1)Filtering

    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'limit'];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.query = this.query.find(queryObj);

    return this;
  }

  pagination() {
    // 2) Pagination

    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    console.log(page, limit);
    const skip = (page - 1) * limit;
    console.log(skip);

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
