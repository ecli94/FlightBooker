import { Helmet } from 'react-helmet';

const GoogleMapsLoader = () => {
    return (
        <Helmet>
            <script
                src={`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&libraries=places`}
                async
                defer
            ></script>
        </Helmet>
    );
};

export default GoogleMapsLoader;
