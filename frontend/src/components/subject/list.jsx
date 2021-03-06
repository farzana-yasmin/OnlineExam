import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import MasterLayout from "../../layouts/MasterLayout";

class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      subjectList: [],
      query: "",
    };
  }

  componentDidMount() {
    this.fetchSubjects();
  }

  fetchSubjects = () => {
    let url = "http://localhost:8000/api/subject/";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          subjectList: data,
        })
      );
  };

  startDelete = (subject) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: false, //"warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        fetch(`http://localhost:8000/api/subject/${subject.id}/`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(subject),
        })
          .then((response) => {
            if (response.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
            this.fetchSubjects();
          })
          .catch(function (error) {
            console.log("ERROR: ", error);
          });
      }
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    // let id = e.target.id;
    let q = e.target.value;
    this.setState({
      query: q,
    });

    if (q === "") {
      this.fetchSubjects();
      return false;
    }

    let url = `http://localhost:8000/expense/query/?q=${q}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          expenseList: data,
        })
      )
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  };

  render() {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Redirect push to="/sign-in" />;
    }
    let subject = this.state.subjectList;
    let self = this;
    return (
      <div className="Subject">
        <MasterLayout>
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <Link to="/subject-create">
                    <button className="btn btn-info">Create</button>
                  </Link>
                </div>
                <div
                  className="page-title-right d-none d-sm-block col-md-3"
                  style={{ marginRight: "30%" }}
                >
                  <form className="app-search">
                    <div className="app-search-box">
                      <div className="input-group">
                        <input
                          type="text"
                          id="query"
                          name="query"
                          value={this.state.query}
                          onChange={this.handleSearch}
                          className="form-control"
                          placeholder="Search subjects form here"
                        />
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fe-search"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <h4 className="page-title">Subjects</h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="responsive-table-plugin">
                    <div className="table-rep-plugin">
                      <div
                        className="table-responsive"
                        data-pattern="priority-columns"
                      >
                        <table
                          id="tech-companies-1"
                          className="table table-striped "
                        >
                          <thead>
                            <tr>
                              <th>#SL</th>
                              <th>Subject</th>
                              <th data-priority="1">Questions</th>
                              <th data-priority="6">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {subject ? (
                              subject.map(function (item, index) {
                                return (
                                  <tr key={index}>
                                     <th>
                                      {index + 1}
                                    </th>
                                    <th>
                                      {item.name}
                                    </th>
                                    <td> {
                                      item.questions.map((sub,i) => {
                                        return (
                                          <ul key={i}><li>{sub.question}</li></ul>
                                        )
                                      })
                                      } </td>
                                    <td>
                                      <Link to={`/subject/edit/${item.id}`}>
                                        <button className="btn btn-sm btn-info">
                                          <i className="fe-edit"></i>
                                        </button>
                                      </Link>
                                      &nbsp;
                                      <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => {
                                          self.startDelete(item);
                                        }}
                                      >
                                        <i className="fe-delete"></i>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td
                                  colSpan="3"
                                  className="text-center text-info"
                                >
                                  No Records Found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MasterLayout>
      </div>
    );
  }
}

export default Subject;