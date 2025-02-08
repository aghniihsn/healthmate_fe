import React, { useEffect } from "react";  
import { Form, Input, Button, DatePicker, TimePicker, Row, Col, message } from "antd";  
import moment from "moment";  

const { TextArea } = Input;  

function Update({ reminder, onUpdate }) {  
    const [form] = Form.useForm();  

    useEffect(() => {    
        if (reminder) {    
            form.setFieldsValue({    
                medicine_name: reminder.medicine_name,    
                dosage: reminder.dosage,    
                description: reminder.description,    
                frequency: reminder.frequency,    
                reminder_time: moment(reminder.reminder_time, "HH:mm:ss"),    
                start_date: [    
                    moment(reminder.start_date, "YYYY-MM-DD"),    
                    moment(reminder.end_date, "YYYY-MM-DD"),    
                ],    
            });    
        }    
    }, [reminder, form]);    

    async function onFinish(values) {    
        try {    
            const payload = {    
                medicine_name: values.medicine_name,    
                dosage: values.dosage,  
                frequency: values.frequency,  
                start_date: values.start_date[0].format("YYYY-MM-DD"),    
                end_date: values.start_date[1].format("YYYY-MM-DD"),    
                reminder_time: values.reminder_time.format("HH:mm:ss"),    
                description: values.description,    
            };    

            const response = await fetch(`http://127.0.0.1:5000/reminder/${reminder.key}`, {  
                method: "PUT",  
                headers: {  
                    "Content-Type": "application/json",  
                },  
                body: JSON.stringify(payload),  
            });           

            if (!response.ok) {    
                throw new Error("Failed to update reminder");    
            }    

            message.success("Reminder updated successfully!");    
            onUpdate({ ...reminder, ...values });    
        } catch (error) {    
            console.error("Error updating reminder:", error);    
            message.error("Failed to update reminder.");    
        }    
    }        

    return (  
        <Form layout="vertical" onFinish={onFinish} form={form}>  
        <h1> Update Reminder</h1>
            <Row gutter={[16, 16]}>  
                <Col xs={24} md={12}>  
                    <Form.Item  
                        label="Drug Name"  
                        name="medicine_name"  
                        rules={[{ required: true, message: "Please enter the drug name" }]}  
                    >  
                        <Input placeholder="Drug Name" />  
                    </Form.Item>  

                    <Form.Item  
                        label="Dosage"  
                        name="dosage"  
                        rules={[{ required: true, message: "Please enter the dosage" }]}  
                    >  
                        <Input placeholder="Dosage" />  
                    </Form.Item>  

                    <Form.Item  
                        label="Description of Use"  
                        name="description"  
                        rules={[{ required: true, message: "Please enter the description" }]}  
                    >  
                        <TextArea placeholder="Description of Use" rows={4} />  
                    </Form.Item>  
                </Col>  

                <Col xs={24} md={12}>  
                    <Form.Item  
                        label="Frequency"  
                        name="frequency"  
                        rules={[{ required: true, message: "Please enter the frequency" }]}  
                    >  
                        <Input placeholder="3 times a day" />  
                    </Form.Item>  

                    <Form.Item  
                        label="Time"  
                        name="reminder_time"  
                        rules={[{ required: true, message: "Please select time" }]}  
                    >  
                        <TimePicker  
                            format={"HH:mm"}  
                            style={{ width: "100%" }}  
                        />  
                    </Form.Item>  

                    <Form.Item  
                        label="Date Range"  
                        name="start_date"  
                        rules={[{ required: true, message: "Please select date range" }]}  
                    >  
                        <DatePicker.RangePicker  
                            style={{ width: "100%" }}  
                            format={"YYYY-MM-DD"}  
                        />  
                    </Form.Item>  
                </Col>  
            </Row>  

            <Form.Item style={{ textAlign: "right" }}>  
                <Button type="primary" htmlType="submit">  
                    Save  
                </Button>  
            </Form.Item>  
        </Form>  
    );  
}  

export default Update;
