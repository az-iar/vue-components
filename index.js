import FeatherIcon from "./src/Icons/FeatherIcon";
import ResourceEdit from "./src/Resources/ResourceEdit";
import ResourceForm from "./src/Resources/ResourceForm";
import ResourceList from "./src/Resources/ResourceList";
import Pagination from "./src/Pagination/Pagination";
import GoogleMap from "./src/Maps/GoogleMap";
import TextEditor from "./src/Forms/TextEditor";
import Card from "./src/Cards/Card";

module.exports = {
    buttons: {},
    cards: {
        Card
    },
    forms: {
        TextEditor
    },
    icons: {
        FeatherIcon
    },
    maps: {
        GoogleMap
    },
    pagination: {
        Pagination
    },
    resources: {
        ResourceEdit,
        ResourceForm,
        ResourceList
    }
};