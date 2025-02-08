import React, { useEffect, useMemo, useState } from "react";
import { Modal, List, notification, Popover } from 'antd';
import { io } from 'socket.io-client';
import { Link, useNavigate } from "react-router-dom";

import useLocalData from "../../core/hook/useLocalData";
import cookie from "../../core/helpers/cookie";
import "./style.css";

  // outside of your component, initialize the socket variable
  let socket;

function Header() {
  const { store, dispatch } = useLocalData();
  const userData = store.userData;
  const navigate = useNavigate()
  const [notif, setNotif] = useState()
  console.log("header cuy", userData)

  function handleLogout() {
    Modal.confirm({
      title: 'Logout',
      content: 'Apakah Anda yakin ingin logout?',
      okText: 'Ya',
      cancelText: 'Batal',
      onOk: () => {
        cookie.del('user');
        dispatch({ type: 'update', value: null, name: 'userData' });
  
        if (socket) {
          console.log('diskonek');
          socket.disconnect();
          socket = null;
        }
  
        navigate('/login');
      },
    })
  }

  function handleLogin() {
    navigate("/login")
  }

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = () => {
    api.info({
      message: 'Reminder',
      description: store.notification,
    });
  };

  const getNotificationList = async () => {
    const userId = cookie.get("user")?.id;
    if (!userId) return;
    const response = await fetch(`http://localhost:5000/notification/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setNotif(result);
  };


  const cookieUser = cookie.get("user");
  // useEffect(() => {
  //   if (cookieUser && !userData) {
  //     dispatch({
  //       type: "update",
  //       name: "userData",
  //       value: JSON.parse(cookieUser),
  //     });
  //   }
  // }, [cookieUser]);

  useEffect(() => {
    if (cookieUser && userData) {

      if(userData?.user_id != 1 && !socket) {
        // create websocket/connect
        socket = io("http://127.0.0.1:5000");
  
        // listen for chat events
        socket.on("notification", (chat) => {
          dispatch({
            type: "update",
            name: "notification",
            value: chat,
          });
        })
      }
      
    }
  }, [cookieUser]);

  useMemo(() => {
    getNotificationList()
  }, [cookieUser])

  useEffect(() => {
    if (store.notification) openNotificationWithIcon()
  }, [store.notification])
  return (
    <header>
      {contextHolder}
      <nav className="navbar">
        <img src="image/logoapp.jpg" alt="Logo" className="logo" />
        <p>Health Mate</p>
        <div className="nav-links">
          {userData ? (
            <>
              <Popover content={<List
                className="demo-loadmore-list"
                // loading={initLoading}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={notif}
                renderItem={(item) => (
                  <List.Item
                    actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                  >
                    <List.Item.Meta
                      // avatar={<Avatar src={item.picture.large} />}
                      title={<a href="https://ant.design">{item.name?.last}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />} title="Title" trigger="click">
                {/* <Badge
                  className="site-badge-count-109"
                  // count={10}
                  style={{ backgroundColor: '#52c41a' }}
                >
                  <Button size="small" shape="circle" icon={<BellOutlined />} />

                </Badge> */}
              </Popover>

              {
                userData?.user_id != 1 && (
                  <>
                    <Link to="/dashboard">Home</Link>
                    <Link to="/profile">Profile</Link>
                  </>
                )
              }

              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={handleLogin}>Login</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
