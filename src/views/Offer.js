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
import NotificationAlert from "react-notification-alert";
import pen from "./../assets/img/pen.svg";
import dele from "./../assets/img/trash-can.svg";
import { offer, category } from "api";

const API_URL = process.env.REACT_APP_API_URL
console.log(API_URL)

axios.defaults.baseURL = API_URL
function Offer() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [product_title, setProduct_title] = useState("");
  const [link, setLink] = useState("");
  const [product_text, setProduct_text] = useState("");
  const [id, setId] = useState("");
  const [product_image, setProduct_image] = useState(null);
  const [offers, setOffers] = useState([]);
  const [cat, setCat] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modal_data, setModalData] = useState({
    id: "",
    product_title: "",
    category_id: "",
    link: "",
    product_text: "",
  });
  const notificationAlert = React.useRef();

  const handleShow = (data) => {
    console.log("on modal", data);
    setModalData(data);
    setShow(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`delete-offer-page-content/${id}`)
      .then(() => {
        const updatedOffers = offers.filter((offer) => offer.id !== id);
        setOffers(updatedOffers);
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

  const handleSubmit = (event) => {
    const fd = new FormData();
    fd.append("product_title", product_title);
    fd.append("link", link);
    fd.append("product_text", product_text);
    fd.append("product_image", product_image);
    fd.append("category_id", selectedCategory);
    event.preventDefault();

    axios
      .post("create-offer-page-content", fd)
      .then((res) => {
        notify("tr");
        console.log(res);
        notify("tr", " Offer Created Successfully");
      });
  };

  const handleSubmit1 = (event) => {
    const fd = new FormData();
    fd.append("product_title", modal_data["product_title"]);
    fd.append("product_text", modal_data["product_text"]);
    fd.append("link", modal_data["link"]);
    fd.append("product_image", product_image);
    fd.append("category_id", modal_data["category_id"]);
    fd.append("id", modal_data["id"]);
    console.log(product_title, id);
    event.preventDefault();

    axios
      .post("create-offer-page-content", fd)
      .then((res) => {
        notify("tr", " Offer Updated Successfully");
        console.log(res);
        setShow(false);
      });
  };

  const handleDataChange = (event) => {
    setModalData({ ...modal_data, [event.target.name]: event.target.value });
  };

  function trimImageName(product_image, maxLength) {
    if (product_image.length > maxLength) {
      return product_image.substring(0, maxLength) + '...';
    }
    return product_image;
  }


  useEffect(() => {
    offer()
      .then((result) => {
        console.log(result);
        setOffers(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    category()
      .then((result) => {
        console.log(result);
        setCat(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    return () => {};
  }, []);

  return (
    <>
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
              <h5 className="text-center">Edit Offer</h5>
            </Col>
          </Row>
          <div>
            <Form onSubmit={handleSubmit1}>
              <Row className="ml-1">
                <Col className="" md="6">
                  <FormGroup>
                    <label>Offer Title</label>
                    <Input
                      placeholder="Username"
                      name="product_title"
                      defaultValue={modal_data.product_title} // Set the value from state
                      onChange={handleDataChange}
                      type="text"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <label>Offer Category</label>
                  <select
                    className="form-control"
                    name="category_id"
                    value={modal_data.category_id}
                    onChange={handleDataChange}
                  >
                    <option value="">Select Category</option>
                    {cat.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label>Offer Image</label>
                    <Input
                      className="pt-1 mb-2"
                      placeholder="Username"
                      name="product_image"
                      onChange={(e) => setProduct_image(e.target.files[0])}
                      type="file"
                    />
                    <span>
                      {" "}
                      {modal_data.product_image?.length == 0 ? (
                        "No Image"
                      ) : (
                        <img src={modal_data.product_image} width="100px" />
                      )}{" "}
                    </span>
                  </FormGroup>
                </Col>
                <Col className="" md="6">
                  <FormGroup>
                    <label>Offer Link</label>
                    <Input
                      placeholder="Add Product Link"
                      name="link"
                      defaultValue={modal_data.link} // Set the value from state
                      onChange={handleDataChange}
                      type="text"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col className="px-4" md="12">
                  <FormGroup>
                    <label>Offer Description</label>
                    <textarea
                      className="form-control py-0"
                      rows={3}
                      name="product_text"
                      defaultValue={modal_data.product_text} // Set the value from state
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
                        <strong> Offer </strong>
                      </u>
                    </h3>
                    <Form onSubmit={handleSubmit}>
                      <Row className="ml-1">
                        <Col className=" px-2" md="6">
                          <FormGroup>
                            <label>Offer Title</label>
                            <Input
                              placeholder="Username"
                              name="product_title"
                              onChange={(e) => setProduct_title(e.target.value)}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className=" px-2" md="6">
                          <FormGroup>
                            <label>Offer Cetagory</label>
                            <select
                              className="form-control"
                              name="category_id"
                              value={selectedCategory}
                              onChange={(e) =>
                                setSelectedCategory(e.target.value)
                              }
                            >
                              <option value="">Select Category</option>
                              {cat.map((data, index) => (
                                <option key={index} value={data.id}>
                                  {data.name}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
                        <Col className=" px-2" md="6">
                          <FormGroup>
                            <label>Image</label>
                            <Input
                              className="pt-1"
                              name="product_image"
                              onChange={(e) =>
                                setProduct_image(e.target.files[0])
                              }
                              type="file"
                            />
                          </FormGroup>
                        </Col>
                        <Col className=" px-2" md="6">
                          <FormGroup>
                            <label>Offer Link</label>
                            <Input
                              placeholder="Add Product Link"
                              name="link"
                              onChange={(e) => setLink(e.target.value)}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className=" px-2" md="12">
                          <FormGroup>
                            <label>Offer Description</label>
                            <textarea
                              className="form-control py-0"
                              rows={3}
                              name="product_text"
                              required
                              onChange={(e) => setProduct_text(e.target.value)}
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
                          Add Offer
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            {offers?.length > 0 ? (
              <Card>
                <CardBody>
                  <h3 className="text-center">
                    <u>
                      <strong> All Offer </strong>
                    </u>
                  </h3>
                  <div className="table-responsive">
                    <Table>
                      <thead className="text-primary">
                        <tr>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Link</th>
                          <th>Image</th>
                          <th>Category</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {offers.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td>{data.product_title}</td>
                              <td>{data.product_text}</td>
                              <td>{data.link}</td>
                              <td>{trimImageName(data.product_image, 20)}</td>
                              <td>{data.category_id}</td>
                              <td class="d-flex">
                                <Button
                                  type="button"
                                  className="btn-sm !btn-light p-2 text-white"
                                  onClick={() => {
                                    handleShow(data);
                                  }}
                                >
                                  {" "}
                                  <img src={pen} />{" "}
                                </Button>{" "}
                                <Button
                                  type="button"
                                  className="btn-sm !btn-light p-2 ml-2 text-white"
                                  onClick={() => {
                                    handleDelete(data.id);
                                  }}
                                >
                                  <img src={dele} />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            ) : (
              <p>No offers available.</p>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Offer;
