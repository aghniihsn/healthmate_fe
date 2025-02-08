import React, { useEffect } from "react";
import { Form, Input, Button, Col, Layout, Modal } from "antd";
import { useNavigate } from 'react-router-dom';
import cookie from '../../core/helpers/cookie';
import "./style.css";

const { Content } = Layout;

function Profile() {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        // Ambil data user dari cookie saat pertama kali halaman dibuka
        const userCookie = cookie.get('user');
        if (userCookie) {
            try {
                const user = JSON.parse(userCookie);
                form.setFieldsValue({
                    name: user.name || '',
                    email: user.email || '',
                    phone_number: user.phone_number || ''
                });
            } catch (error) {
                console.error("Error parsing user cookie:", error);
            }
        }
    }, [form]);

    async function onFinish(values) {
        const token = cookie.get("access_token"); // Ambil token dari cookie
        if (!token) {
            Modal.error({
                title: "Token Tidak Ditemukan",
                content: "Silakan login ulang.",
            });
            return;
        }
    
        const payload = {
            name: values.name,
            email: form.getFieldValue('email'),
            phone_number: values.phone_number,
        };
    
        console.log("Payload yang dikirim:", JSON.stringify(payload, null, 2));
    
        try {
            const response = await fetch("http://127.0.0.1:5000/update-profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
    
            const result = await response.json();
            console.log("Response dari server:", result);
    
            if (response.ok) {
                Modal.success({
                    title: "Profil Diperbarui",
                    content: "Profil berhasil diperbarui!",
                    onOk: () => {
                        cookie.set("user", JSON.stringify(result.data), { path: "/", expires: 7 });
                        navigate('/dashboard');
                    },
                });
            } else {
                Modal.error({
                    title: "Gagal Memperbarui",
                    content: result.message || "Gagal memperbarui profil.",
                });
            }
        } catch (error) {
            console.error("Error saat update profile:", error);
            Modal.error({
                title: "Terjadi Kesalahan",
                content: "Terjadi kesalahan saat memperbarui profil.",
            });
        }
    }
    
    function cancelBtn() {
        navigate('/dashboard');
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content style={{ backgroundColor: "#F2F9FF" }}>
                <div className="add-reminder-container">
                    <h1 className="title">Profile</h1>
                    <Form layout="vertical" onFinish={onFinish} form={form} className="form-container">
                        <Col>
                            <Form.Item label="Nama" name="name">
                                <Input placeholder="Nama" />
                            </Form.Item>

                            {/* <Form.Item label="Email" name="email">
                                <Input disabled placeholder="Email" />
                            </Form.Item> */}

                            <Form.Item label="Phone Number" name="phone_number">
                                <Input placeholder="Phone Number" />
                            </Form.Item>
                        </Col>

                        <Form.Item className="button-group">
                            <Button type="primary" htmlType="submit">
                                Simpan
                            </Button>
                            <Button htmlType="button" onClick={cancelBtn}>
                                Batal
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
}

export default Profile;