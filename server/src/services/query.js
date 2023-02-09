const DEFAULT_PAGE_LIMIT = 0; //if limit is 0, Mongo will return ALL docs in collection
const DEFAULT_PAGE_NUMBER = 1;

function getPagination(query) {
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT; //will convert string to number as well
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
}

module.exports = {
  getPagination,
};
