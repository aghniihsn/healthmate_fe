import React from "react";
import { useNavigate } from 'react-router-dom';
import { Layout, Row, Col } from "antd";
import { PlusCircleOutlined, ScheduleOutlined, FileTextOutlined } from "@ant-design/icons";
import cookie from "../../core/helpers/cookie";

const { Content} = Layout;

function Dashboard() {
  const cookieUser = cookie.get("user");
  const userName = cookieUser ? JSON.parse(cookieUser).name : "Guest";
  const navigate = useNavigate();

  function handleClickAdd(){
    navigate('/add')
  }

  function handleClickCheck(){
    navigate('/check-schedule')
  }

  function handleRecord(){
    navigate('/check-records')
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "50px", backgroundColor: "#F2F9FF" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1 level={2}>Hello, {userName}</h1>
          <p>
            Jangan khawatir soal waktu, cukup atur jadwalmu dan biarkan kami
            mengingatkanmu!
          </p>
        </div>

        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={12} md={8} style={{ textAlign: "center" }}>
            <div onClick={handleClickAdd}>
              <PlusCircleOutlined
                style={{
                  fontSize: "48px",
                  color: "#69b1ff",
                  backgroundColor: "#e6f7ff",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              />
              <h2 >Add Reminder</h2>
              <p>Tambah pengingat baru, biar nggak lupa!</p>
            </div>
          </Col>

          <Col xs={24} sm={12} md={8} style={{ textAlign: "center" }}>
            <div onClick={handleClickCheck}>
              <ScheduleOutlined
                style={{
                  fontSize: "48px",
                  color: "#69b1ff",
                  backgroundColor: "#e6f7ff",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              />
              <h2>Check Schedule</h2>
              <p>Cek jadwal obatmu!</p>
            </div>
          </Col>

          <Col xs={24} sm={12} md={8} style={{ textAlign: "center" }}>
            <div onClick={handleRecord}>
              <FileTextOutlined
                style={{
                  fontSize: "48px",
                  color: "#69b1ff",
                  backgroundColor: "#e6f7ff",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              />
              <h2>Records</h2>
              <p>Lihat history minum obat!</p>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Dashboard