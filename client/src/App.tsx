import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/GoalList';
import CreateGoal from './components/Goals/CreateGoal';
import EditGoal from './components/Goals/EditGoal';
import AuthProvider from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/create-goal" component={CreateGoal} />
          <Route path="/edit-goal/:id" component={EditGoal} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;