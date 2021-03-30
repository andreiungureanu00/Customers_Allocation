class EmployeePostBody {
  constructor(body) {
    this.name = body.name;
    this.email = body.email;
    this.hire_date = body.hire_date;
    this.salary = body.salary;
    this.job_title = body.job_title;
    this.project_id = body.project_id;
  }

  get Name() {
    return this.name;
  }

  get Email() {
    return this.lastName;
  }

  get Hire_date() {
    return this.hire_date;
  }

  get Salary() {
    return this.salary;
  }

  get Job_title() {
    return this.job_title;
  }

  get Project_id() {
    return this.project_id;
  }

  set Hire_date(hire_date) {
    this.hire_date = hire_date;
  }
}

module.exports = {
  EmployeePostBody,
};
