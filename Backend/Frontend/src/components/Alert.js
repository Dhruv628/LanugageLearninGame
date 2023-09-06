import React from 'react'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = (message, type) => {
    switch (type) {
      case 'success':
        toast.success(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        break;
      case 'info':
        toast.info(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        break;
      case 'warning':
        toast.warning(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        break;
      case 'error':
        toast.error(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        break;
      default:
        break;
    }
};

export default Alert