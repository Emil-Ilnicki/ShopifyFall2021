import "../styles/Toast.css";
import React, { useState, useEffect } from "react";

interface ToastStyle {
  title: string;
  description: string;
  backgroundColor: string;
  icon: string;
}

interface ToastData {
  toastList: Array<ToastStyle>;
  position: string;
}

const Toast = ({ ...props }: ToastData) => {
  const [list, setList] = useState<Array<ToastStyle>>(props.toastList);

  useEffect(() => {
    setList(props.toastList);
  }, [list, props.toastList]);

  const handleDelete = (i: number) => {
    list.splice(i, 1);
    setList([...list]);
  };

  return (
    <div className={`toastContainer ${props.position}`}>
      {list.map((toastMsg: ToastStyle, i) => {
        return (
          <div
            key={i}
            className={`notification toast ${props.position}`}
            style={{ backgroundColor: toastMsg.backgroundColor }}
          >
            <button
              onClick={() => {
                handleDelete(i);
              }}
            >
              X
            </button>
            <div className="toastImg">
              <img src={toastMsg.icon} alt={toastMsg.title} />
            </div>
            <div>
              <p className="toastTitle">{toastMsg.title}</p>
              <p className="toastContent">{toastMsg.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
