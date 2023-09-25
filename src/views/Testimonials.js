import axios from "axios";
import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Modal,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";
import pen from "./../assets/img/pen.svg";
import NotificationAlert from "react-notification-alert";
import dele from "./../assets/img/trash-can.svg";
import { testimonial } from "api";

function Testimonials() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [modal_data, setModalData] = useState({ id: "", name: "", text: "" });
  const [show, setShow] = useState(false);
  const notificationAlert = React.useRef();
  const [testimonials, setTestimonials] = useState([]);
  const handleClose = () => setShow(false);

  const handleShow = (data) => {
    console.log("on modal", data);
    setModalData(data);
    setShow(true);
  };

  const handleSubmit = (event) => {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("text", text);
    event.preventDefault();

    axios
      .post("http://3.110.30.19/api/create-testimonial", fd)
      .then((res) => {
        notify("tr", "Offer Created Successfully");
        console.log(res);
        setShow(false);
      });
  };

  const handleSubmit1 = (event) => {
    const fd = new FormData();
    fd.append("name", modal_data["name"]);
    fd.append("text", modal_data["text"]);
    fd.append("id", modal_data["id"]);
    event.preventDefault();

    axios
      .post("http://3.110.30.19/api/create-testimonial", fd)
      .then((res) => {
        notify("tr", "Offer Updated Successfully");
      });
  };
  // console.log("get data to api", testimonials);

  const handleDelete = (id) => {
    axios
      .delete(`http://3.110.30.19/api/delete-testimonial/${id}`)
      .then(() => {
        const updatedOffers = testimonials.filter((data) => data.id !== id);
        setTestimonials(updatedOffers);
        notify("tr", "Offer Deleted Successfully");
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
    testimonial()
      .then((result) => {
        setTestimonials(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    return () => {};
  }, []);

  return (
    <>
      <NotificationAlert ref={notificationAlert} />
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
              <h5 className="text-center">Edit Testimonials</h5>
            </Col>
          </Row>
          <div>
            <Form onSubmit={handleSubmit1}>
              <Row className="ml-1">
                <Col className=" pl-4" md="12">
                  <FormGroup>
                    <label>Name</label>
                    <Input
                      placeholder="Username"
                      name="name"
                      defaultValue={modal_data.name}
                      onChange={handleDataChange}
                      type="text"
                      required
                    />
                  </FormGroup>
                </Col>

                <Col className="px-4" md="12">
                  <FormGroup>
                    <label>Testimonials Text</label>
                    <textarea
                      className="form-control py-0"
                      rows={3}
                      defaultValue={modal_data.text}
                      name="text"
                      required
                      onChange={handleDataChange}
                    ></textarea>
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="btn-round" color="primary" type="submit">
                  Update Blog
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Row>
                  <Col className="px-3 mb-4" md="12">
                    <h3 className="text-center">
                      <u>
                        <strong> Testimonials </strong>
                      </u>
                    </h3>
                    <Form onSubmit={handleSubmit}>
                      <Row className="ml-1">
                        <Col className=" px-2" md="12">
                          <FormGroup>
                            <label>Full Name</label>
                            <Input
                              placeholder="Username"
                              name="faq_title"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className=" px-2" md="12">
                          <FormGroup>
                            <label>Review</label>
                            <textarea
                              className="form-control py-0"
                              rows={3}
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              name="testimonials_text"
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
                          Add Testimonials
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h3 className="text-center">
                  <u>
                    <strong> All Testimonials </strong>
                  </u>
                </h3>
                {testimonials?.length > 0 ? (
                  <Table>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Review</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials.map((testimonial, index) => (
                        <tr key={index}>
                          <td>{testimonial.name}</td>
                          <td>{testimonial.text}</td>
                          <td class="d-flex">
                            <Button
                              type="button"
                              className="btn-sm !btn-light p-2 text-white"
                              onClick={() => handleShow(testimonial)}
                            >
                              {" "}
                              <img src={pen} alt="Edit" />{" "}
                            </Button>
                            <Button
                              type="button"
                              className="btn-sm !btn-light p-2 ml-2 text-white"
                              onClick={() => handleDelete(testimonial.id)}
                            >
                              <img src={dele} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  ""
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Testimonials;
