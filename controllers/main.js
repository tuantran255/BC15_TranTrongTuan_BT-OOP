var validate = new Validation();
var service = new EmployeeServices();

function getEle(id) {
  return document.getElementById(id);
}

function getListEmp() {
  service
    .getListEmployeeApi()
    .then(function (result) {
      renderListEmp(result.data);
      getEle("loading").style.display = "none";
    })
    .catch(function () {
      getEle("loading").style.display = "inline-block";
    });
}
getListEmp();

function getInfo(isAdd) {
  var _account = getEle("tknv").value,
    _name = getEle("name").value,
    _email = getEle("email").value,
    _password = getEle("password").value,
    _workDay = getEle("datepicker").value,
    _salary = getEle("luongCB").value,
    _position = getEle("chucvu").value,
    _workHours = getEle("gioLam").value;

  //----------check validate------------
  var isValid = true;
  if (isAdd) {
    isValid &=
      validate.checkEmpty(
        _account,
        "tbTKNV",
        "(*)Vui lòng nhập vào tên tài khoản!"
      ) &&
      validate.checkInput(
        _account,
        "tbTKNV",
        "(*)Tên tài khoản tối đa 4-6 ký tự số",
        /^(?=.*\d)[\d]{4,6}$/
      );
  }

  isValid &=
    validate.checkEmpty(_name, "tbTen", "(*)Vui lòng nhập vào họ tên!") &&
    validate.checkInput(
      _name,
      "tbTen",
      "(*)Tên nhân viên phải là chữ!",
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
    );

  isValid &=
    validate.checkEmpty(
      _email,
      "tbEmail",
      "(*)Vui lòng nhập vào địa chỉ email!"
    ) &&
    validate.checkInput(
      _email,
      "tbEmail",
      "(*)Email không đúng định dạng!",
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    );

  isValid &=
    validate.checkEmpty(
      _password,
      "tbMatKhau",
      "(*)Vui lòng nhập vào địa chỉ mật khẩu!"
    ) &&
    validate.checkInput(
      _password,
      "tbMatKhau",
      "(*)Mật khẩu có từ 6-10 ký tự, ít nhất một chữ viết hoa, một chữ viết thường, một số và một ký tự đặc biệt!",
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/
    );

  isValid &=
    validate.checkEmpty(
      _workDay,
      "tbNgay",
      "(*)Vui lòng nhập vào ngày làm việc"
    ) &&
    validate.checkInput(
      _workDay,
      "tbNgay",
      "(*)Ngày làm không đúng định dạng!",
      /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/
    );

  isValid &=
    validate.checkEmpty(
      _salary,
      "tbLuongCB",
      "(*)Vui lòng nhập vào lương cơ bản!"
    ) &&
    validate.checkIntegerAndValue(
      _salary,
      "tbLuongCB",
      "(*)Lương cơ bản từ 1,000,000 - 20,000,000",
      1000000,
      20000000
    );

  isValid &=
    validate.checkEmpty(
      _workHours,
      "tbGiolam",
      "(*)Vui lòng nhập vào số giờ làm!"
    ) &&
    validate.checkIntegerAndValue(
      _workHours,
      "tbGiolam",
      "(*)Số giờ làm trong tháng 80 - 200 giờ",
      80,
      200
    );

  isValid &= validate.checkOption(
    "chucvu",
    "tbChucVu",
    "(*)Vui lòng chọn chức vụ!"
  );

  if (isValid) {
    var employee = new Employee(
      _account,
      _name,
      _email,
      _password,
      _workDay,
      _salary,
      _position,
      _workHours
    );
    employee.calcSalary();
    employee.classify();
    return employee;
  }
  return null;
}

//--------- Add Employee ---------
getEle("btnThemNV").addEventListener("click", function () {
  var employee = getInfo(true);
  if (employee) {
    service
      .addEmployeeApi(employee)
      .then(function () {
        alert("Thêm thành công!!!");
        getListEmp();
      })
      .catch(function (error) {
        console.log(error);
      });
    getEle("btnDong").click();
    getEle("loading").style.display = "inline-block"
  }
});

//--------- Print List Employee ------------------
function renderListEmp(listEmp) {
  var content = "";
  listEmp.forEach(function (employee) {
    content += `
    <tr>
    <td>${employee.account}</td>
    <td>${employee.name}</td>
    <td>${employee.email}</td>
    <td>${employee.workDay}</td>
    <td>${employee.position}</td>
    <td>${employee.salary}</td>
    <td>${employee.type}</td>
    <td>
    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="clickUpdateBtn('${employee.id}')">Sửa</button> <br/>
    <button class="btn btn-danger mt-2" onclick="removeEmployee('${employee.id}')">Xóa</button>
    </td>
    </tr>`;
  });
  getEle("tableDanhSach").innerHTML = content;
}

//---------------- Remove Employee ----------------
function removeEmployee(id) {
  if (confirm("Bạn chắc chắn muốn xóa không?")) {
    service
      .removeEmployeeApi(id)
      .then(function () {
        alert("Xóa thành công!!!");
        getListEmp();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

//---------------- Show info when update -----------------
function clickUpdateBtn(id) {
  //disabled input account
  getEle("tknv").disabled = true;
  //show add button and hide update button
  getEle("btnThemNV").style.display = "none";
  getEle("btnCapNhat").style.display = "block";

  service
    .getEmployeeByIdApi(id)
    .then(function (result) {
      getEle("tknv").value = result.data.account;
      getEle("name").value = result.data.name;
      getEle("email").value = result.data.email;
      getEle("password").value = result.data.password;
      getEle("datepicker").value = result.data.workDay;
      getEle("luongCB").value = result.data.basicSalary;
      getEle("chucvu").value = result.data.position;
      getEle("gioLam").value = result.data.workHour;
      getEle("btnCapNhat").setAttribute(
        "onclick",
        `updateEmployee(${result.data.id})`
      );
    })
    .catch(function (error) {
      console.log(error);
    });
}

//---------------- Update Employee -----------------------
function updateEmployee(id) {
  var employee = getInfo(false);
  if (employee) {
    service.updateEmployeeApi(employee, id).then(function () {
      alert("Cập nhật thành công!!!");
      getListEmp();
    });
    getEle("btnDong").click();
  }
}

//------------- Reset all input when add employee ------------------
getEle("btnThem").addEventListener("click", function () {
  getEle("btnThemNV").style.display = "block";
  getEle("btnCapNhat").style.display = "none";
  getEle("tknv").disabled = false;
  getEle("tknv").value = "";
  getEle("name").value = "";
  getEle("email").value = "";
  getEle("password").value = "";
  getEle("luongCB").value = "";
  getEle("chucvu").selectedIndex = 0;
  getEle("gioLam").value = "";
});

//--------------- Search Employee ---------------------
getEle("searchName").addEventListener("keyup", function () {
  service
    .getListEmployeeApi()
    .then(function (result) {
      var listSearch = [];
      result.data.forEach(function (employee) {
        if (
          employee.type.toLowerCase().indexOf(getEle("searchName").value) !== -1
        ) {
          listSearch.push(employee);
          getEle("loading").style.display = "none";
        }
      });
      renderListEmp(listSearch);
    })
    .catch(function () {
      getEle("loading").style.display = "inline-block";
    });
});
