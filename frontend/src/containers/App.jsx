import { BrowserRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import CustomAppBar from '../components/CustomAppBar.jsx';
import Land from './Land';
import Footer from '../components/Footer';
import Scan from './Scan';

const App = () => {
    const routes = [
        {
            component: Land,
            exact: true,
            path: '/'
        },
        {
            component: Scan,
            path: '/try'
        }
    ];

    return (
        <>
            <CustomAppBar />

            <BrowserRouter>
                <Switch>
                    {routes.map((route, i) => (
                        <Route
                            // eslint-disable-next-line react/no-array-index-key
                            key={i}
                            exact={route.exact}
                            path={route.path}
                            render={(props) => <route.component {...props} routes={route.routes} />}
                        />
                    ))}

                    <Route path='*' render={(props) => <Redirect to={{ pathname: '/' }} />} />
                </Switch>
            </BrowserRouter>

            <Footer />
        </>
    );
};
export default App;
