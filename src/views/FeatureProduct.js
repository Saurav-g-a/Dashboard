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
import { featureProduct } from "api";

const API_URL = process.env.REACT_APP_API_URL
console.log(API_URL)

axios.defaults.baseURL = API_URL
function FeatureProduct() {
  const [feature_title, setFeature_title] = useState("");
  const [feature_info, setFeature_info] = useState("");
  const [feature_image, setFeature_image] = useState(null);
  const [offers, setOffers] = useState([]);
  const notificationAlert = React.useRef();

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
    fd.append("feature_title", feature_title);
    fd.append("feature_info", feature_info);
    fd.append("feature_image", feature_image);
    event.preventDefault();

    axios
      .post("create-feature", fd)
      .then((res) => {
        notify("tr");
        console.log(res);
        notify("tr", " Feature Product Created Successfully");
      });
  };


  useEffect(() => {
     featureProduct()
      .then((result) => {
        console.log('offer', result);
        setOffers(result.data);
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
                        <strong> Feature Product </strong>
                      </u>
                    </h3>
                    <Form onSubmit={handleSubmit}>
                      <Row className="ml-1">
                        <Col className=" px-2" md="6">
                          <FormGroup>
                            <label>Product Title</label>
                            <Input
                              placeholder="Username"
                              name="feature_title"
                              defaultValue={offers[0]?.feature_title}
                              onChange={(e) => setFeature_title(e.target.value)}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className=" px-2" md="6">
                          <FormGroup>
                            <label>Product Image</label>
                            <Input
                              className="pt-1"
                              name="feature_image"
                              onChange={(e) =>
                                setFeature_image(e.target.files[0])
                              }
                              type="file"
                            />
                          </FormGroup>
                        </Col>
                        <Col className=" px-2" md="12">
                          <FormGroup>
                            <label>Product Description</label>
                            <textarea
                              className="form-control py-0"
                              rows={3}
                              defaultValue={offers[0]?.feature_info}
                              name="feature_info"
                              required
                              onChange={(e) => setFeature_info(e.target.value)}
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
                          Add Feature Product
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
           
          </Col>
        </Row>
      </div>
    </>
  );
}

export default FeatureProduct;
