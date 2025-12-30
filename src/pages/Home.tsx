import React from 'react';
import Layout from '../layouts/Layout';
import { Dashboard } from './Dashboard';
import TaskBoard from './Tasks';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
    const { user } = useAuth()
    return (
        <Layout>
            {!user ? <Dashboard />
                : <TaskBoard />}
        </Layout>
    );
};

export default Home;