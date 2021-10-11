function Employee(
  _account,
  _name,
  _email,
  _password,
  _workDay,
  _salary,
  _position,
  _workHours
) {
  this.account = _account;
  this.name = _name;
  this.email = _email;
  this.password = _password;
  this.workDay = _workDay;
  this.basicSalary = _salary;
  this.position = _position;
  this.workHour = _workHours;
  this.salary = 0;
  this.type = "";

  this.calcSalary = function () {
    if (this.position === "Sếp") {
      return this.salary = Intl.NumberFormat("vn-VN").format(this.basicSalary * 3);
    } else if (this.position === "Trưởng phòng") {
      return this.salary = Intl.NumberFormat("vn-VN").format(this.basicSalary * 2);
    } else {
      return this.salary = Intl.NumberFormat("vn-VN").format(this.basicSalary);
    }
  };

  this.classify = function () {
    var hours = parseInt(this.workHour);
    if (hours >= 192) {
      return this.type = "Xuất sắc";
    } else if (hours >= 176) {
      return this.type = "Giỏi";
    } else if (hours >= 160) {
      return this.type = "Khá";
    } else {
      return this.type = "Trung bình";
    }
  };
}
