import axios from "axios";
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
  Modal,
  FormGroup,
  Input,
  Button,
  Table,
  Form,
} from "reactstrap";
import pen from "./../assets/img/pen.svg";
import dele from "./../assets/img/trash-can.svg";
import { faqs } from "api";
import NotificationAlert from "react-notification-alert";

function Faq() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [faq_title, setFaq_title] = useState("");
  const [faq_text, setFaq_text] = useState("");
  const [faq, setFaq] = useState([]);
  const notificationAlert = React.useRef();
  const [modal_data, setModalData] = useState({
    id: "",
    faq_title: "",
    faq_text: "",
  });

  const handleShow = (data) => {
    console.log("on modal", data);
    setModalData(data);
    setShow(true);
  };

  const handleSubmit = (event) => {
    const fd = new FormData();
    fd.append("faq_title", faq_title);
    fd.append("faq_text", faq_text);
    event.preventDefault();

    axios
      .post("create-client-page-content", fd)
      .then((res) => {
        console.log(res);
        notify("tr", "Faq Created Successfully");
      });
  };

  const handleSubmit1 = (event) => {
    const fd = new FormData();
    fd.append("faq_title", modal_data["faq_title"]);
    fd.append("faq_text", modal_data["faq_text"]);
    fd.append("id", modal_data["id"]);
    event.preventDefault();

    axios
      .post("create-client-page-content", fd)
      .then((res) => {
        console.log(res);
        notify("tr", "Faq Updated Successfully");
        setShow(false);
      });
  };
  // console.log("get data to api of faq---->>", faq);

  const handleDelete = (id) => {
    axios
      .delete(`delete-client-page-content/${id}`)
      .then(() => {
        const updatedOffers = faq.filter((data) => data.id !== id);
        setFaq(updatedOffers);
        notify("tr", "Faq Deleted Successfully");
      })
      .catch((error) => {
        console.error("Error deleting Faq:", error);
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
    faqs()
      .then((result) => {
        setFaq(result);
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
              <h5 className="text-center">Edit FAQ</h5>
            </Col>
          </Row>
          <div>
            <Form onSubmit={handleSubmit1}>
              <Row className="ml-1">
                <Col className=" pl-4" md="12">
                  <FormGroup>
                    <label>Question</label>
                    <Input
                      placeholder="Title"
                      name="faq_title"
                      onChange={handleDataChange}
                      defaultValue={modal_data.faq_title}
                      type="text"
                    />
                    <label className="mt-3">Ans</label>
                    <textarea
                      className="form-control"
                      name="faq_text"
                      defaultValue={modal_data.faq_text}
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
                <h3 className="text-center">FAQ's</h3>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="px-3" md="12">
                      <FormGroup>
                        <label>Question</label>
                        <Input
                          placeholder="Title"
                          name="faq_title"
                          onChange={(e) => setFaq_title(e.target.value)}
                          type="text"
                        />
                        <label className="mt-3">Ans</label>
                        <textarea
                          className="form-control"
                          name="faq_text"
                          onChange={(e) => setFaq_text(e.target.value)}
                        ></textarea>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Add FAQ
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h3 className="text-center">
                  <u>
                    <strong> All FAQ's </strong>
                  </u>
                </h3>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Question</th>
                      <th>Answer </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faq.map((faq, index) => (
                      <tr key={index}>
                        <td>{faq.faq_title}</td>
                        <td>{faq.faq_text}</td>
                        <td class="d-flex">
                          <Button
                            type="button"
                            className="btn-sm !btn-light p-2 text-white"
                            onClick={() => handleShow(faq)}
                          >
                            {" "}
                            <img src={pen} />
                          </Button>
                          <Button
                            type="button"
                            className="btn-sm !btn-light p-2 ml-2 text-white"
                            onClick={() => handleDelete(faq.id)}
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

export default Faq;
