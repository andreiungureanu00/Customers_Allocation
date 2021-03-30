class Project {
  constructor(body) {
    this.project_name = body.project_name;
    this.start_date = body.start_date;
    this.planned_end_date = body.planned_end_date;
    this.description = body.description;
    this.project_code = body.project_code;
  }

  get Project_Name() {
    return this.project_name;
  }

  get Start_date() {
    return this.start_date;
  }

  set Planned_end_date(planned_end_date) {
    this.planned_end_date = planned_end_date;
  }

  set Start_date(start_date) {
    this.start_date = start_date;
  }
}

module.exports = Project;
