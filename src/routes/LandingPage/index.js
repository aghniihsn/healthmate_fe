// import React from "react";
// import { Layout, Button } from 'antd';
// import { useNavigate } from 'react-router-dom';
// // import "./style.css";

// function LandingPage() {
//     const { Footer } = Layout;
//     const navigate = useNavigate();
    
//     function handleRegister(){
//         navigate('/register')
//     }

//     return (
//         <>
//         <div className="landing" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh', backgroundColor:'#F2F9FF'}}>
//             <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//                 {/* <h4 style={{ color: '#6c63ff' }}>Let's Begin</h4> */}
//                 <h1 style={{ fontSize: '2.5em', fontWeight: 'bold' }}>Remind Your <span style={{ color: '#6c63ff' }}>Medication Needs</span> For You</h1>
//                 <p style={{ color: '#888', maxWidth: '400px', margin: '0 auto' }}>
//                 Menyederhanakan rutinitas minum obat, satu pengingat dalam satu waktu.
//                 </p>
//                 <div style={{ marginTop: '20px' }}>
//                     <Button type="primary" style={{ marginRight: '10px' }} onClick={handleRegister}>Register</Button>
//                     {/* <Button type="default" icon={<i className="fas fa-play-circle"></i>}>Play Video</Button> */}
//                 </div>
//             </div>
//             {/* <div style={{ position: 'relative', width: '300px', height: '300px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <img src="image/person.jpg" alt="Person" style={{ width: '100%', height: 'auto' }} />
//                 <div style={{ position: 'absolute', top: '10px', right: '10px', width: '20px', height: '20px', backgroundColor: '#6c63ff', borderRadius: '50%' }}></div>
//                 <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '20px', height: '20px', backgroundColor: '#ff5722', borderRadius: '50%' }}></div>
//             </div> */}
//         </div>
//         <Footer style={{ textAlign: "center", backgroundColor:"#FFFFFF" }}>
//             ©2024 ReminderApp - Keep Track of Your Medication
//         </Footer>
//             </>
//     );
// }

// export default LandingPage;
import React from "react";
import { Layout, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style.css';

function LandingPage() {
    const { Footer } = Layout;
    const navigate = useNavigate();
    
    function handleRegister(){
        navigate('/register');
    }

    return (
        <>
        <div className="landing">
            <div className="content">
                <h1>Remind Your <span>Medication Needs</span> For You</h1>
                <p>Menyederhanakan rutinitas minum obat, satu pengingat dalam satu waktu.</p>
                <div className="button-container">
                    <Button type="primary" onClick={handleRegister}>Register</Button>
                </div>
            </div>
        </div>
        <Footer className="footer">
            ©2024 ReminderApp - Keep Track of Your Medication
        </Footer>
        </>
    );
}

export default LandingPage;
