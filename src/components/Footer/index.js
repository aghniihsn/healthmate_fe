import React from "react";
import { Layout } from "antd";

function Footer(){
    const { Footer } = Layout;
    return(
        <div>
        <Footer style={{ textAlign: "center", backgroundColor:"#FFFFFF" }}>
            ©2024 ReminderApp - Keep Track of Your Medication
        </Footer>
        </div>
    )
}

export default Footer