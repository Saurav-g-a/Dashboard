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
  Modal,
  Row,
  Col,
  Table,
} from "reactstrap";
import pen from "./../assets/img/pen.svg";
import dele from "./../assets/img/trash-can.svg";
import NotificationAlert from "react-notification-alert";
import { events } from "api";
const API_URL = process.env.REACT_APP_API_URL
console.log(API_URL)

axios.defaults.baseURL = API_URL
function Event() {
  
  const [latest_event_title, setLatest_event_title] = useState("");
  const [latest_event_text, setLatest_event_text] = useState("");
  const [latest_event_image, setLatest_event_image] = useState("");
  const [event, setEvent] = useState([]);
  const handleClose = () => setShow(false);
  const notificationAlert = React.useRef();
  const [show, setShow] = useState(false);
  const [modal_data, setModalData] = useState({
    id: "",
    latest_event_title: "",
    latest_event_text: "",
  });

  const handleShow = (data) => {
    console.log("on modal", data);
    setModalData(data);
    setShow(true);
  };

  const handleSubmit = (event) => {
    const fd = new FormData();
    fd.append("latest_event_title", latest_event_title);
    fd.append("latest_event_text", latest_event_text);
    fd.append("latest_event_image", latest_event_image);
    event.preventDefault();
    axios
      .post("create-latest_event", fd)
      .then((res) => {
        console.log(res);
        notify("tr", "Event Created Successfully");
      });
  };

  const handleSubmit1 = (event) => {
    const fd = new FormData();
    fd.append("latest_event_title", modal_data["latest_event_title"]);
    fd.append("latest_event_text", modal_data["latest_event_text"]);
    fd.append("latest_event_image", latest_event_image);
    fd.append("id", modal_data["id"]);
    event.preventDefault();

    axios
      .post("create-latest_event", fd)
      .then((res) => {
        console.log(res);
        notify("tr", "Event Updated Successfully");
        setShow(false);
      });
  };

  // console.log("get data to api of event---->>", event);

  const handleDelete = (id) => {
    axios
      .delete(`delete-latest_event/${id}`)
      .then(() => {
        const updatedEvents = event.filter((data) => data.id !== id);
        setEvent(updatedEvents);
        notify("tr", "Event Deleted Successfully");
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
    events()
      .then((result) => {
        setEvent(result);
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
              <h5 className="text-center">Edit Event</h5>
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
                      name="latest_event_title"
                      defaultValue={modal_data.latest_event_title}
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
                      name="latest_event_image"
                      onChange={(e) => setLatest_event_image(e.target.files[0])}
                      type="file"
                    />
                    <span>
                      {modal_data.latest_event_image?.length == 0 ? (
                        "No Image"
                      ) : (
                        <img
                          src={modal_data.latest_event_image}
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
                      defaultValue={modal_data.latest_event_text}
                      name="latest_event_text"
                      required
                      onChange={handleDataChange}
                    ></textarea>
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="btn-round" color="primary" type="submit">
                  Update Event
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
                        <strong> Event </strong>
                      </u>
                    </h3>
                    <Form onSubmit={handleSubmit}>
                      <Row className="ml-1">
                        <Col className=" px-2" md="6">
                          <FormGroup>
                            <label>Event Title</label>
                            <Input
                              placeholder="Username"
                              name="latest_event_title"
                              onChange={(e) =>
                                setLatest_event_title(e.target.value)
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
                              name="latest_event_image"
                              onChange={(e) =>
                                setLatest_event_image(e.target.files[0])
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
                              name="latest_event_text"
                              required
                              onChange={(e) =>
                                setLatest_event_text(e.target.value)
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
                          Add Event
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
                    <strong> All Events </strong>
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
                    {event.map((item, index) => (
                      <tr key={index}>
                        <td>{item.latest_event_title}</td>
                        <td>{item.latest_event_text}</td>
                        <td>{item.latest_event_image}</td>
                        <td class="d-flex">
                          <Button
                            type="button"
                            className="btn-sm !btn-light p-2 text-white"
                            onClick={() => handleShow(item)}
                          >
                            <img src={pen} />
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

export default Event;
