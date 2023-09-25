import axios from "axios";
import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Modal,
  Table,
} from "reactstrap";
import pen from "./../assets/img/pen.svg";
import dele from "./../assets/img/trash-can.svg";
import { blogs } from "api";
import NotificationAlert from "react-notification-alert";

function Blog() {
  const [blog_post_title, setBlog_post_title] = useState("");
  const [blog_post_text, setBlog_post_text] = useState("");
  const [blog_post_image, setBlog_post_image] = useState("");
  const [blog, setBlog] = useState([]);
  const [show, setShow] = useState(false);
  const notificationAlert = React.useRef();
  const handleClose = () => setShow(false);
  const [modal_data, setModalData] = useState({
    id: "",
    blog_post_text: "",
    blog_post_title: "",
  });

  const handleSubmit = (event) => {
    const fd = new FormData();
    fd.append("blog_post_image", blog_post_image);
    fd.append("blog_post_text", blog_post_text);
    fd.append("blog_post_title", blog_post_title);
    event.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/create-blog-page-content", fd)
      .then((res) => {
        console.log(res);
        notify("tr", "Blog Created Successfully");
      });
  };

  const handleSubmit1 = (event) => {
    const fd = new FormData();
    fd.append("blog_post_image", blog_post_image);
    fd.append("blog_post_text", modal_data["blog_post_text"]);
    fd.append("blog_post_title", modal_data["blog_post_title"]);
    fd.append("id", modal_data["id"]);
    event.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/create-blog-page-content", fd)
      .then((res) => {
        console.log(res);
        notify("tr", "Blog Updated Successfully");
        setShow(false);
      });
  };

  const handleShow = (data) => {
    console.log("on modal", data);
    setModalData(data);
    setShow(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/delete-blog-page-content/${id}`)
      .then(() => {
        // If the deletion is successful, you can update your state or perform any other necessary actions.
        // For example, you can remove the deleted item from the 'offers' state.
        const updatedOffers = blog.filter((blog) => blog.id !== id);
        setBlog(updatedOffers);
        notify("tr", "Blog Deleted Successfully");
      })
      .catch((error) => {
        console.error("Error deleting offer:", error);
      });
  };

  const notify = (place, customMessage) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "success";
        break;
      case 2:
        type = "danger";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      type: type,
      message: customMessage, // Pass the custom message here
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlert.current.notificationAlert(options);
  };

  const handleDataChange = (event) => {
    setModalData({ ...modal_data, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    blogs()
      .then((result) => {
        setBlog(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    return () => {};
  }, []);

  return (
    <>
      <NotificationAlert ref={notificationAlert} />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Row>
                  <Col className="px-3 mb-4" md="12">
                    <h3 className="text-center">
                      <u>
                        <strong> Blogs </strong>
                      </u>
                    </h3>
                    <Form onSubmit={handleSubmit}>
                      <Row className="ml-1">
                        <Col className=" pl-4" md="6">
                          <FormGroup>
                            <label>Blog Title</label>
                            <Input
                              placeholder="Username"
                              name="blog_post_title"
                              onChange={(e) =>
                                setBlog_post_title(e.target.value)
                              }
                              type="text"
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-2 pr-4" md="6">
                          <FormGroup>
                            <label>Image</label>
                            <Input
                              className="pt-1"
                              placeholder="Username"
                              name="blog_post_image"
                              onChange={(e) =>
                                setBlog_post_image(e.target.files[0])
                              }
                              type="file"
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-4" md="12">
                          <FormGroup>
                            <label>Blog Description</label>
                            <textarea
                              className="form-control py-0"
                              rows={3}
                              name="blog_post_text"
                              required
                              onChange={(e) =>
                                setBlog_post_text(e.target.value)
                              }
                            ></textarea>
                          </FormGroup>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Add Blog
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Modal isOpen={show}>
              <div className="p-3">
                <button
                  className="btn-sm btn-light closebutton"
                  onClick={handleClose}
                >
                  X
                </button>
                <Row>
                  <Col md="12">
                    <h5 className="text-center">Edit Blog</h5>
                  </Col>
                </Row>
                <div>
                  <Form onSubmit={handleSubmit1}>
                    <Row className="ml-1">
                      <Col className=" px-2" md="6">
                        <FormGroup>
                          <label>Blog Title</label>
                          <Input
                            placeholder="Username"
                            name="blog_post_title"
                            defaultValue={modal_data.blog_post_title}
                            onChange={handleDataChange}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className=" px-2" md="6">
                        <FormGroup>
                          <label>Image</label>
                          <Input
                            className="pt-1"
                            placeholder="Username"
                            name="blog_post_image"
                            onChange={(e) =>
                              setBlog_post_image(e.target.files[0])
                            }
                            type="file"
                          />
                          <span>
                            {modal_data.blog_post_image?.length == 0 ? (
                              "No Image"
                            ) : (
                              <img
                                src={modal_data.blog_post_image}
                                width="100px"
                              />
                            )}{" "}
                          </span>
                        </FormGroup>
                      </Col>
                      <Col className=" px-2" md="12">
                        <FormGroup>
                          <label>Blog Description</label>
                          <textarea
                            className="form-control py-0"
                            rows={3}
                            name="blog_post_text"
                            defaultValue={modal_data.blog_post_text}
                            onChange={handleDataChange}
                          ></textarea>
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="text-center">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Update Blog
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Modal>

            <Card>
              <CardBody>
                <h3 className="text-center">
                  <u>
                    <strong> All Blogs </strong>
                  </u>
                </h3>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blog.map((data, index) => (
                      <tr key={index}>
                        <td>{data.blog_post_title}</td>
                        <td>{data.blog_post_text}</td>
                        <td>{data.blog_post_image}</td>
                        <td className="d-flex">
                          <Button
                            type="button"
                            className="btn-sm !btn-light p-2 text-white"
                            onClick={() => handleShow(data)}
                          >
                            {" "}
                            <img src={pen} />{" "}
                          </Button>
                          <Button
                            type="button"
                            className="btn-sm !btn-light p-2 ml-2 text-white"
                            onClick={() => handleDelete(data.id)}
                          >
                            <img src={dele} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Blog;
