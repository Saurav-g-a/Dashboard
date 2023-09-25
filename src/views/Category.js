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
import NotificationAlert from "react-notification-alert";
import { category } from "api";

function Category() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [name, setName] = useState("");
  const [faq, setFaq] = useState([]);
  const notificationAlert = React.useRef();
  const [modal_data, setModalData] = useState({
    id: "",
    name: "",
  });

  const handleShow = (data) => {
    console.log("on modal", data);
    setModalData(data);
    setShow(true);
  };

  const handleSubmit = (event) => {
    const fd = new FormData();
    fd.append("name", name);
    event.preventDefault();

    axios.post("http://127.0.0.1:8000/api/create-category", fd).then((res) => {
      console.log(res);
      notify("tr", "Category Created Successfully");
    });
  };

  const handleSubmit1 = (event) => {
    const fd = new FormData();
    fd.append("name", modal_data["name"]);
    fd.append("id", modal_data["id"]);
    event.preventDefault();

    axios.post("http://127.0.0.1:8000/api/create-category", fd).then((res) => {
      console.log(res);
      notify("tr", "Category Updated Successfully");
      setShow(false);
    });
  };

  // console.log("get data to api of faq---->>", faq);

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/delete-category/${id}`)
      .then(() => {
        const updatedOffers = faq.filter((data) => data.id !== id);
        setFaq(updatedOffers);
        notify("tr", "Category Deleted Successfully");
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
    category()
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
              <h5 className="text-center">Edit Category</h5>
            </Col>
          </Row>
          <div>
            <Form onSubmit={handleSubmit1}>
              <Row className="ml-1">
                <Col className=" pl-4" md="12">
                  <FormGroup>
                    <label>Category Name</label>
                    <Input
                      placeholder="Category Name"
                      name="name"
                      onChange={handleDataChange}
                      defaultValue={modal_data.name}
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="btn-round" color="primary" type="submit">
                  Update Category
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
                <h3 className="text-center">Category</h3>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="px-3" md="12">
                      <FormGroup>
                        <label>Category Name</label>
                        <Input
                          placeholder="Category Name"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                        />
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
                        Add Category
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
                    <strong> All Categories </strong>
                  </u>
                </h3>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>S.No.</th>
                      <th>Category Name </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faq.map((faq, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{faq.name}</td>
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

export default Category;
