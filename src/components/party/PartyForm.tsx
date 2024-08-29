import PartyPlaceSearch from './form/place/PartyPlaceSearch';
import PartyMap from './form/place/PartyMap';
import { Container } from './FormStyle';
import PartyText from './form/PartyText';
import PartyTextArea from './form/PartyTextArea';
import PartyThumbnail from './form/PartyThumbnail';
import PartyDate from './form/PartyDate';
import PartyOption from './form/option/PartyOption';

const PartyForm = Object.assign(Container, {
    Option: PartyOption,
    Search: PartyPlaceSearch,
    Map: PartyMap,
    Text: PartyText,
    TextArea: PartyTextArea,
    Thumbnail: PartyThumbnail,
    Date: PartyDate,
});

export default PartyForm;
