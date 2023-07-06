import RenderRoutes from '../../routes/RenderRoutes';
import PropTypes from 'prop-types';

export const Layout = ({ routes = []}):JSX.Element => {
    return (
        <RenderRoutes  routes={routes} props={{}}/>
    )
}

Layout.propTypes = {
    className: PropTypes.string,
    routes: PropTypes.array,
  };