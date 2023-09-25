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
  Modal,
  Col,
  Table,
} from "reactstrap";
import pen from "./../assets/img/pen.svg";
import dele from "./../assets/img/trash-can.svg";
import NotificationAlert from "react-notification-alert";
import { upcomingEvents } from "api";

function UpcomingEvent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const [upcoming_event_title, setUpcoming_event_title] = useState("");
  const [upcoming_event_text, setUpcoming_event_text] = useState("");
  const [upcoming_event_image, setUpcoming_event_image] = useState("");
  const [upcoming, setUpcoming] = useState([]);
  const notificationAlert = React.useRef();
  const [modal_data, setModalData] = useState({
    id: "",
    upcoming_event_title: "",
    upcoming_event_text: "",
  });

  const handleSubmit = (event) => {
    const fd = new FormData();
    fd.append("upcoming_event_title", upcoming_event_title);
    fd.append("upcoming_event_text", upcoming_event_text);
    fd.append("upcoming_event_image", upcoming_event_image);
    event.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/create-upcoming-event", fd)
      .then((res) => {
        console.log(res);
        notify("tr", "Upcoming Created Successfully");
      });
  };

  const handleShow = (data) => {
    console.log("on modal", data);
    setModalData(data);
    setShow(true);
  };

  const handleSubmit1 = (event) => {
    const fd = new FormData();
    fd.append("upcoming_event_title", modal_data["upcoming_event_title"]);
    fd.append("upcoming_event_text", modal_data["upcoming_event_text"]);
    fd.append("upcoming_event_image", upcoming_event_image);
    fd.append("id", modal_data["id"]);
    event.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/create-upcoming-event", fd)
      .then((res) => {
        console.log(res);
        notify("tr", "Upcoming Updated Successfully");
        setShow(false);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/delete-upcoming-event/${id}`)
      .then(() => {
        // If the deletion is successful, you can update your state or perform any other necessary actions.
        // For example, you can remove the deleted item from the 'offers' state.
        const updatedOffers = upcoming.filter((upcoming) => upcoming.id !== id);
        setUpcoming(updatedOffers);
        notify("tr", "Upcoming Deleted Successfully");
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
    upcomingEvents()
      .then((result) => {
        setUpcoming(result);
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
              <h5 className="text-center">Edit Upcoming Event</h5>
            </Col>
          </Row>
          <div>
            <Form onSubmit={handleSubmit1}>
              <Row className="ml-1">
                <Col className=" px-2" md="6">
                  <FormGroup>
                    <label>Event Title</label>
                    <Input
                      placeholder="Username"
                      name="upcoming_event_title"
                      defaultValue={modal_data.upcoming_event_title}
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
                      name="upcoming_event_image"
                      // defaultValue={modal_data.upcoming_event_image}
                      onChange={(e) =>
                        setUpcoming_event_image(e.target.files[0])
                      }
                      type="file"
                    />
                    <span>
                      {modal_data.upcoming_event_image?.length == 0 ? (
                        "No Image"
                      ) : (
                        <img
                          src={modal_data.upcoming_event_image}
                          width="100px"
                        />
                      )}{" "}
                    </span>
                  </FormGroup>
                </Col>
                <Col className=" px-2" md="12">
                  <FormGroup>
                    <label>Event Description</label>
                    <textarea
                      className="form-control py-0"
                      rows={3}
                      name="upcoming_event_text"
                      required
                      defaultValue={modal_data.upcoming_event_text}
                      onChange={handleDataChange}
                    ></textarea>
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="btn-round" color="primary" type="submit">
                  Update FAQ
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
                        <strong> Upcoming Event </strong>
                      </u>
                    </h3>
                    <Form onSubmit={handleSubmit}>
                      <Row className="ml-1">
                        <Col className=" px-2" md="6">
                          <FormGroup>
                            <label>Event Title</label>
                            <Input
                              placeholder="Username"
                              name="upcoming_event_title"
                              onChange={(e) =>
                                setUpcoming_event_title(e.target.value)
                              }
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className=" px-2" md="6">
                          <FormGroup>
                            <label>Image</label>
                            <Input
                              className="pt-1"
                              name="upcoming_event_image"
                              onChange={(e) =>
                                setUpcoming_event_image(e.target.files[0])
                              }
                              type="file"
                            />
                          </FormGroup>
                        </Col>
                        <Col className=" px-2" md="12">
                          <FormGroup>
                            <label>Event Description</label>
                            <textarea
                              className="form-control py-0"
                              rows={3}
                              name="upcoming_event_text"
                              required
                              onChange={(e) =>
                                setUpcoming_event_text(e.target.value)
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
                          Add Upcoming Event
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
                    <strong> All Upcoming Events </strong>
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
                    {upcoming.map((item, index) => (
                      <tr key={index}>
                        <td>{item.upcoming_event_title}</td>
                        <td>{item.upcoming_event_text}</td>
                        <td>{item.upcoming_event_image}</td>
                        <td class="d-flex">
                          <Button
                            type="button"
                            className="btn-sm !btn-light p-2 text-white"
                            onClick={() => handleShow(item)}
                          >
                            {" "}
                            <img src={pen} />{" "}
                          </Button>
                          <Button
                            type="button"
                            className="btn-sm !btn-light p-2 ml-2 text-white"
                            onClick={() => handleDelete(item.id)}
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

export default UpcomingEvent;
