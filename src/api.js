import axios from "axios";

export const upcomingEvents = async () => {
  const response = await axios
    .get(`http://127.0.0.1:8000/api/get-upcoming-event`)
    .then((res) => {
      return res.data;
    });
  return response;
};

export const category = async () => {
  const response = await axios
    .get(`http://127.0.0.1:8000/api/get-category`)
    .then((res) => {
      return res.data;
    });
  return response;
};

export const testimonial = async () => {
  const response = await axios
    .get(`http://127.0.0.1:8000/api/get-testimonial`)
    .then((res) => {
      return res.data;
    });
  return response;
};

export const faqs = async () => {
  const response = await axios
    .get(`http://127.0.0.1:8000/api/get-client-page-content`)
    .then((res) => {
      return res.data;
    });
  return response;
};

export const blogs = async () => {
  const response = await axios
    .get(`http://127.0.0.1:8000/api/get-blog-page-content`)
    .then((res) => {
      return res.data;
    });
  return response;
};

export const events = async () => {
  const response = await axios
    .get(`http://127.0.0.1:8000/api/get-latest_event`)
    .then((res) => {
      return res.data;
    });
  return response;
};

export const offer = async () => {
  const response = await axios
    .get(`http://127.0.0.1:8000/api/get-offer-page-content`)
    .then((res) => {
      return res.data;
    });
  return response;
};

export const homeBanner = async () => {
  const response = await axios
    .get(`http://127.0.0.1:8000/api/get-banner-content`)
    .then((res) => {
      return res.data;
    });
  return response;
};

export const landings = async () => {
  const response = await axios
    .get(`http://127.0.0.1:8000/api/get-home-page-content`)
    .then((res) => {
      return res.data;
    });
  return response;
};
