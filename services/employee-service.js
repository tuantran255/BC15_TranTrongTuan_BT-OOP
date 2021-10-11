function EmployeeServices() {
  this.getListEmployeeApi = function () {
    return axios({
      url: "https://6163d8d3b55edc00175c1ba1.mockapi.io/api/Employeee",
      method: "GET",
    });
  };

  this.addEmployeeApi = function (employee) {
    return axios({
      url: "https://6163d8d3b55edc00175c1ba1.mockapi.io/api/Employeee",
      method: "POST",
      data: employee,
    });
  };

  this.removeEmployeeApi = function (id) {
    return axios({
      url: "https://6163d8d3b55edc00175c1ba1.mockapi.io/api/Employeee/" + id,
      method: "DELETE",
    });
  };

  this.getEmployeeByIdApi = function (id) {
    return axios({
      url: "https://6163d8d3b55edc00175c1ba1.mockapi.io/api/Employeee/" + id,
      method: "GET",
    });
  };

  this.updateEmployeeApi = function (employee, id) {
    return axios({
      url: "https://6163d8d3b55edc00175c1ba1.mockapi.io/api/Employeee/" + id,
      method: "PUT",
      data: employee,
    });
  };
}
