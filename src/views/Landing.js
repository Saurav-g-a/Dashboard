import { landings } from "api";
import { homeBanner } from "api";
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
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
function Landing() {
  const [banner_time, setBanner_time] = useState("");
  const [banner_image, setBanner_image] = useState("");
  const [banner_text, setBanner_text] = useState("");
  const [peekapoo_image, setPeekapoo_image] = useState("");
  const [peekapoo_text, setPeekapoo_text] = useState("");
  const [peekapoo_title, setPeekapoo_title] = useState("");
  const [story_image, setStory_image] = useState("");
  const [story_text, setStory_text] = useState("");
  const [story_title, setStory_title] = useState("");
  const [winner_image, setWinner_image] = useState([]);
  const [data, setData] = useState([]);
  const [landing, setLanding] = useState([]);
  const notificationAlert = React.useRef();

  const handleSubmit1 = (event) => {
    const fd = new FormData();
    fd.append("banner_time", banner_time);
    fd.append("banner_image", banner_image);
    fd.append("banner_text", banner_text);
    fd.append("id", 1);
    event.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/create-banner-content", fd)
      .then((res) => {
        console.log(res);
        notify("tr", "Banner Updated Successfully");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    winner_image.forEach((image, index) => {
      fd.append(`winner_image[${index}]`, image);
    });
    fd.append("peekapoo_image", peekapoo_image);
    fd.append("peekapoo_text", peekapoo_text);
    fd.append("peekapoo_title", peekapoo_title);
    fd.append("story_image", story_image);
    fd.append("story_text", story_text);
    fd.append("story_title", story_title);
    fd.append("id", 1);

    axios
      .post("http://127.0.0.1:8000/api/create-home-page-content", fd)
      .then((res) => {
        console.log(res);
        notify("tr", "Landing Page Updated Successfully");
      });
  };

  const handleDatetimeChange = (event) => {
    const { value } = event.target;
    setBanner_time(value);
  };
  const imageData = (e) => {
    let images = [];
    console.log(e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
    }

    console.log(images);
    setWinner_image(images);
  };

  // console.log("get data to api", data);

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

  useEffect(() => {
    homeBanner()
      .then((result) => {
        console.log("Banner===>>>", result);
        setData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    landings()
      .then((result) => {
        console.log("landing", result);
        setLanding(result);
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
            <Row>
              <Col className="px-3 mb-4" md="6">
                <Card>
                  <CardBody>
                    <h3 className="text-center">
                      <u>
                        <strong> Landing Page </strong>
                      </u>
                    </h3>
                    <Form onSubmit={handleSubmit1}>
                      <Row className="ml-1">
                        <Col className="px-2" md="6">
                          <FormGroup>
                            <label>Countdown Clock</label>
                            <Input
                              placeholder="Username"
                              type="datetime-local"
                              name="banner_time"
                              defaultValue={data[0]?.banner_time}
                              onChange={handleDatetimeChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Banner Image
                            </label>
                            <Input
                              placeholder="banner image"
                              type="file"
                              name="banner_image"
                              onChange={(e) =>
                                setBanner_image(e.target.files[0])
                              }
                              className="pt-2"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-2" md="12">
                          <FormGroup>
                            <label>Banner Title</label>
                            <textarea
                              className="form-control py-0"
                              rows={3}
                              name="banner_text"
                              defaultValue={data[0]?.banner_text}
                              onChange={(e) => setBanner_text(e.target.value)}
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
                          Update Banner
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col className="px-3" md="6">
                <Card>
                  <CardBody>
                    <h3 className="text-center">
                      <u>
                        <strong> Our Winner </strong>
                      </u>
                    </h3>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Winner Images
                            </label>
                            <Input
                              placeholder="banner image"
                              type="file"
                              name="winner_image"
                              multiple
                              onChange={(e) => {
                                imageData(e);
                              }}
                              className="pt-2"
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
                            Update Winner
                          </Button>
                        </div>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <hr />
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="px-3 mb-4" md="6">
                      <h3 className="text-center">
                        <u>
                          <strong> Section 1 </strong>
                        </u>
                      </h3>
                      <Row className="ml-1">
                        <Col className=" px-2" md="6">
                          <FormGroup>
                            <label>Title</label>
                            <Input
                              placeholder="Title"
                              name="peekapoo_title"
                              defaultValue={landing[0]?.peekapoo_title}
                              onChange={(e) =>
                                setPeekapoo_title(e.target.value)
                              }
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Section Image
                            </label>
                            <Input
                              placeholder="banner image"
                              type="file"
                              name="peekapoo_image"
                              onChange={(e) =>
                                setPeekapoo_image(e.target.files[0])
                              }
                              className="pt-2"
                            />
                            {/* <p> {landing[0]?.peekapoo_image}</p> */}
                          </FormGroup>
                        </Col>
                        <Col className=" px-2" md="12">
                          <FormGroup>
                            <label>Description</label>
                            <textarea
                              className="form-control py-0"
                              rows={5}
                              name="peekapoo_text"
                              defaultValue={landing[0]?.peekapoo_text}
                              onChange={(e) => setPeekapoo_text(e.target.value)}
                            ></textarea>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col className="px-3" md="6">
                      <h3 className="text-center">
                        <u>
                          <strong> Section 2 </strong>
                        </u>
                      </h3>
                      <Row className="ml-1">
                        <Col className=" px-2" md="6">
                          <FormGroup>
                            <label>Title</label>
                            <Input
                              placeholder="Title"
                              name="story_title"
                              defaultValue={landing[0]?.story_title}
                              onChange={(e) => setStory_title(e.target.value)}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Section Image
                            </label>
                            <Input
                              placeholder="banner image"
                              type="file"
                              name="story_image"
                              onChange={(e) =>
                                setStory_image(e.target.files[0])
                              }
                              className="pt-2"
                            />
                          </FormGroup>
                        </Col>
                        <Col className=" px-2" md="12">
                          <FormGroup>
                            <label>Description</label>
                            <textarea
                              className="form-control py-0"
                              rows={5}
                              name="story_text"
                              defaultValue={landing[0]?.story_text}
                              onChange={(e) => setStory_text(e.target.value)}
                            ></textarea>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Update Section
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Landing;
