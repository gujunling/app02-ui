import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import UserPage from './routes/UserPage';
import CoursePage from './routes/CoursePage';
import StudentCoursePage from './routes/StudentCoursePage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/user" exact component={UserPage} />
        <Route path="/course" exact component={CoursePage} />
        <Route path="/studentcourse" exact component={StudentCoursePage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
