import { BrowserRouter, Route } from 'react-router-dom';
import CustomAppBar from '../components/CustomAppBar';
import Land from './Land';
import Footer from '../components/Footer';

const App = () => {
    const routes = [
        {
            component: Land,
            exact: true,
            path: '/'
        },
        {
            component: Upload,
            path: '/try',
            routes: [
                {
                    component: Bus,
                    path: '/tacos/bus'
                },
                {
                    component: Cart,
                    path: '/tacos/cart'
                }
            ]
        }
    ];
    return (
        <>
            <CustomAppBar />

            <BrowserRouter>
                <Switch>
                    {routes.map((route) => (
                        <Route
                            exact={route.exact}
                            path={route.path}
                            render={(props) => <route.component {...props} routes={route.routes} />}
                        />
                    ))}

                    <Route
                        path='*'
                        render={(props) => (
                            <Redirect
                                to={{
                                    pathname: '/',
                                    state: { from: location }
                                }}
                            />
                        )}
                    />
                </Switch>
            </BrowserRouter>

            <Footer />
        </>
    );
};
export default App;
