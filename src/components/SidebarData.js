const SidebarData = [
    {
        title: "Home",
        path: "/",
        className: 'nav-text'
    },
    {
        title: "Crop Recommendation",
        path: "/crop_recommendation",
        className: 'nav-text',
        apiBase: "http://127.0.0.1:7373/api"
    },
    {
        title: "Crop Disease Detection",
        path: "/crop_disease_detection",
        className: 'nav-text',
        apiBase: "http://127.0.0.1:7373/api"
    },
    // {
    //     title: "Weather Forecast",
    //     path: "/weather_forecast",
    //     className: 'nav-text'
    // }
];

export default SidebarData;