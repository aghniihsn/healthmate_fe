import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import AddReminder from './Add_Reminder';
import CheckSchedule from './CheckSchedule'
import NoMatch from './NoMatch';
import AuthRoute from '../components/AuthRoute';
import GuestRoute from '../components/GuestRoute';
import LandingPage from './LandingPage'
import Update from './CheckSchedule/component/Update';
import Admin from './Admin/Admin'
import CheckRecords from './CheckRecords';
import Profile from './Profile';

function App() {

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={
                    <GuestRoute>
                        <React.Suspense fallback={<Loading />}>
                            <LandingPage />
                        </React.Suspense>
                    </GuestRoute>
                } />
                <Route
                    path="/login"
                    element={
                        <GuestRoute>
                            <React.Suspense fallback={<Loading />}>
                                <Login />
                            </React.Suspense>
                        </GuestRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <GuestRoute>
                            <React.Suspense fallback={<Loading />}>
                                <Register />
                            </React.Suspense>
                        </GuestRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <AuthRoute>
                            <React.Suspense fallback={<Loading />}>
                                <Dashboard />
                            </React.Suspense>
                        </AuthRoute>
                    }
                />
                <Route
                    path="/add"
                    element={
                        <AuthRoute>
                            <React.Suspense fallback={<Loading />}>
                                <AddReminder />
                            </React.Suspense>
                        </AuthRoute>
                    }
                />
                <Route
                    path="/check-schedule"
                    element={
                        <AuthRoute>
                            <React.Suspense fallback={<Loading />}>
                                <CheckSchedule />
                            </React.Suspense>
                        </AuthRoute>
                    }
                />
                <Route
                    path="/check-records"
                    element={
                        <AuthRoute>
                            <React.Suspense fallback={<Loading />}>
                                <CheckRecords />
                            </React.Suspense>
                        </AuthRoute>
                    }
                />
                <Route
                    path="/update"
                    element={
                        <AuthRoute>
                            <React.Suspense fallback={<Loading />}>
                                <Update />
                            </React.Suspense>
                        </AuthRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <AuthRoute>
                            <React.Suspense fallback={<Loading />}>
                                <Admin />
                            </React.Suspense>
                        </AuthRoute>
                    }
                />
                <Route path="/*" element={<NoMatch />} />
            </Route>
            <Route
                    path="/profile"
                    element={
                        <AuthRoute>
                            <React.Suspense fallback={<Loading />}>
                                <Profile />
                            </React.Suspense>
                        </AuthRoute>
                    }
                />
        </Routes>
    );
}

export default App
